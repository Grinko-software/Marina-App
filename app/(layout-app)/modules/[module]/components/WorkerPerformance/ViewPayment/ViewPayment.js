/* eslint-disable no-unused-vars */
'use client';
import { useEffect, useState, useCallback } from 'react';
import { getDataModelUsers, requestUserList } from '../service';
import { isMobileDevice } from '@/utils/agent';
import useFilterStorePayment from '../components/Filters/storePayment';
import FilterPayment from '../components/Filters/FilterPayment';
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Spinner
} from '@nextui-org/react';
const ViewPayment = () => {
	const [isMobile, setIsMobile] = useState(true);
	const [users, setUsers] = useState([]);
	const { data, loading } = useFilterStorePayment();
	const columns = [
		{
			key: 'name',
			label: 'Nombre'
			// center: true
		},
		{
			key: 'rating',
			label: 'Estrellas'
			// center: true
		}
	];
	const renderCell = useCallback(
		(data, columnKey) => {
			const cellValue = data[columnKey];
			switch (columnKey) {
				case 'name':
					return (
						<div className="flex flex-col">
							<p className="text-bold text-sm capitalize dark:text-white">{`${cellValue}`}</p>
						</div>
					);
				case 'rating':
					return (
						<div className="flex flex-col">
							<p className="text-bold text-sm capitalize dark:text-white">{`${cellValue}`}</p>
						</div>
					);
				default:
					return (
						<div className="flex flex-col">
							<p className="text-bold text-sm capitalize dark:text-white">{`${cellValue}`}</p>
						</div>
					);
			}
		},
		[data]
	);
	useEffect(() => {
		requestUserList().then((data) => {
			if (data) {
				const items = getDataModelUsers({ data: data?.data });
				setUsers(items || []);
			}
		});
		const view = isMobileDevice();
		setIsMobile(view);
	}, []);

	return (
		<div className="h-full w-full  md:mt-2">
			<FilterPayment isMobile={isMobile} users={users} />
			<div className="mt-[15rem] md:mt-7">
				<Table isHeaderSticky>
					<TableHeader columns={columns}>
						{(column) => (
							<TableColumn
								key={column.key}
								className={column.center ? 'text-center' : ''}
							>
								{column.label}
							</TableColumn>
						)}
					</TableHeader>
					<TableBody
						isLoading={loading}
						items={data || []}
						emptyContent={'No hay tareas asociadas'}
						loadingContent={<Spinner></Spinner>}
					>
						{(item) => (
							<TableRow key={item.key}>
								{(columnKey) => (
									<TableCell>{renderCell(item, columnKey)}</TableCell>
								)}
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};
export default ViewPayment;
