'use client';
import { useRouter } from 'next/navigation';
import { modules } from '../modules';
import { useEffect, useState } from 'react';
import useAuthStore from '@/stores/user';
import RequireAdminComponent from './components/Auth';
import { getUserPermissionByModuleKey } from '@/services/permission';
import { FaLock, FaSpinner } from 'react-icons/fa';

const NoPermissions = ({ loading }) => {
	return (
		<div className="flex justify-center items-center p-4 mx-auto">
			<div className="text-center bg-white p-8 rounded-lg shadow-lg">
				{loading ? (
					<FaSpinner className="text-blue-500 text-6xl mb-6 animate-spin mx-auto" />
				) : (
					<FaLock className="text-red-500 text-6xl mb-6 mx-auto" />
				)}

				<div className="text-2xl font-bold text-gray-800">
					{loading
						? 'Cargando permisos...'
						: 'No tienes permisos para ingresar a éste módulo.'}
				</div>

				{!loading && (
					<div className="text-lg font-bold text-gray-600">
						Contacta a tu administrador para solicitar permisos.
					</div>
				)}
			</div>
		</div>
	);
};

export default function Page({ params }) {
	const { module } = params;
	const [isAdmin, setIsAdmin] = useState(null);
	const [moduleSelected, setModuleSelected] = useState(null);
	const [contentModule, setContentModule] = useState(null);
	const [isAuthRequered, setIsAuthRequered] = useState(false);
	const [hasModule, setHasModule] = useState(false);
	const [loadingPermission, setLoadingPermission] = useState(false);
	const router = useRouter();
	const { isAdmin: isUserAdmin, idUser } = useAuthStore();

	useEffect(() => {
		if (module) {
			const selected = modules.find((item) => item.path === module);
			if (selected) {
				setModuleSelected(selected);
			} else {
				setModuleSelected(null);
				router.push('/modules');
			}
		}
	}, [module]);

	const getModulePermission = async (moduleKey) => {
		setLoadingPermission(true);
		const permission = await getUserPermissionByModuleKey({
			id: idUser,
			moduleKey
		});
		setHasModule(permission);
		setLoadingPermission(false);
	};

	useEffect(() => {
		setIsAdmin(isUserAdmin);
	}, [isUserAdmin]);

	useEffect(() => {
		if (moduleSelected) {
			const { key } = moduleSelected;
			getModulePermission(key);
		}
	}, [moduleSelected]);

	useEffect(() => {
		if (moduleSelected) {
			const { requireAdmin, content } = moduleSelected;

			if (!requireAdmin || (requireAdmin && isAdmin)) {
				setContentModule(content);
				setIsAuthRequered(false);
			} else {
				setIsAuthRequered(true);
			}
		} else {
			setContentModule(null);
			setIsAuthRequered(false);
		}
	}, [moduleSelected, hasModule, isAdmin]);

	return (
		<section className="">
			{!hasModule && !isAdmin ? (
				<NoPermissions loading={loadingPermission} />
			) : isAuthRequered ? (
				<RequireAdminComponent
					moduleName={moduleSelected?.name}
					isAdmin={isAdmin}
					setIsAdmin={setIsAdmin}
				/>
			) : (
				contentModule
			)}
		</section>
	);
}
