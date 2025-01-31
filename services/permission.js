import { USERS_API_URL, MODULES_API_URL } from '@/settings/constants';
import { DELETE, GET, POST, getData } from './http';
import { notify } from './notify';
import { getModuleNameByKey } from '@/app/(layout-app)/modules/modules';

export const getAllModules = async () => {
	try {
		const response = await getData(`${MODULES_API_URL}`, GET, undefined, true);

		if (response?.data?.length) {
			// Usamos map para transformar la data
			return response.data.map((item) => ({
				moduleId: item?.ID,
				moduleKey: item?.name,
				moduleName: getModuleNameByKey({ key: item?.name })
				// ...  other permission data
			}));
		}
		return [];
	} catch (error) {
		console.error(error); // Para loguear posibles errores
		return [];
	}
};

export const getUserPermission = async ({ id }) => {
	try {
		const queryParams = new URLSearchParams({ user_id: id });
		const response = await getData(
			`${USERS_API_URL}/permission?${queryParams}`,
			GET,
			undefined,
			true
		);

		if (response?.data?.length) {
			// Usamos map para transformar la data
			return response.data.map((item) => ({
				moduleId: item?.module_id,
				moduleKey: item?.module?.name,
				moduleName: getModuleNameByKey({ key: item?.module?.name })
				// ...  other permission data
			}));
		}
		return [];
	} catch (error) {
		console.error(error); // Para loguear posibles errores
		return [];
	}
};

export const getUserPermissionByModuleKey = async ({ id, moduleKey }) => {
	try {
		const modules = await getUserPermission({ id });
		const exists = modules.some((module) => module.moduleKey === moduleKey);

		return exists;
	} catch (error) {
		console.error('Error checking module key:', error);
		return false;
	}
};

export const addUserPermission = async ({ userId, moduleId, moduleName }) => {
	const queryParams = new URLSearchParams({
		user_id: userId,
		module_id: moduleId
	});
	await getData(
		`${USERS_API_URL}/modules?${queryParams}`,
		POST,
		{
			create_permission: true,
			read_permission: true,
			update_permission: true,
			delete_permission: true
		},
		true
	).then((result) => {
		if (result?.code === 200) {
			notify(`ℹ️ Permiso añadido con éxito: ${moduleName}`);
		} else {
			notify(`❌ Problemas al añadir permisos:  ${moduleName}`);
		}
	});
};
export const deleteUserPermission = async ({
	userId,
	moduleId,
	moduleName
}) => {
	const queryParams = new URLSearchParams({
		user_id: userId,
		module_id: moduleId
	});
	await getData(
		`${USERS_API_URL}/modules?${queryParams}`,
		DELETE,
		undefined,
		true
	).then((result) => {
		if (result?.code === 200) {
			notify(`ℹ️ Permiso eliminado con éxito: ${moduleName}`);
		} else {
			notify(`❌ Problemas al eliminar permisos: ${moduleName}`);
		}
	});
};
