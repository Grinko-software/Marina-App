'use client';
import { useEffect, useState } from 'react';
import useUsersStore from './store';
import TableUsers from './TableUsers';
import UserInfo from './UserInfo';
import CreateUser from './NewUser/newUser';
import { getAllModules } from '@/services/permission';

export default function Users({ params }) {
	const { requestData, loading, data } = useUsersStore();
	const [target, setTarget] = useState(null);
	const [allModules, setAllModules] = useState(null);

	useEffect(() => {
		requestData();
		getAllModules().then((modules) => {
			setAllModules(modules || []);
		});
	}, []);

	return (
		<section className="w-full">
			<CreateUser handleRefresh={requestData} />
			<section className="flex flex-row">
				<TableUsers
					data={data}
					loading={loading}
					setTarget={setTarget}
					handleRefresh={requestData}
				/>
				<UserInfo
					target={target}
					setTarget={setTarget}
					handleRefresh={requestData}
					allModules={allModules}
				/>
			</section>
		</section>
	);
}
