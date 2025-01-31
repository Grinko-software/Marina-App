'use client';

import { Autocomplete, AutocompleteItem, Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import CreateTaskType from '../../NewTaskType/newTaskType';
import CreateTask from '../../NewTask/newTask';
import useFilterStore from '../../store';
import PayButton from '../../PayButton/PayButton';

export default function Filter({
	isMobile,
	isAdmin = true,
	users,
	taskTypes,
	taskStates,
	taskDifficulties,
	filterData,
	setFilterData
}) {
	const [selectionTaskType, setSelectionTaskType] = useState(null);
	const [selectionTaskState, setSelectionTaskState] = useState(null);
	const [selectionUser, setSelectionUser] = useState(null);
	const { loading, requestData } = useFilterStore();

	useEffect(() => {
		//
	}, [selectionTaskType]);

	useEffect(() => {
		requestTaskList();
	}, []);

	useEffect(() => {
		setFilterData({
			taskTypeId: selectionTaskType || undefined,
			taskStateId: selectionTaskState || undefined,
			userId: selectionUser || undefined
		});
	}, [selectionTaskType, selectionTaskState, selectionUser]);

	const requestTaskList = () => {
		return requestData(filterData);
	};

	return isMobile ? (
		<section className="w-full flex items-end space-x-2 justify-end">
			<PayButton />
			<CreateTask
				isAdmin={isAdmin}
				users={users}
				taskTypes={taskTypes}
				difficultTypes={taskDifficulties}
			/>
		</section>
	) : (
		<section className="w-full flex">
			<div className="w-full flex flex-row justify-between">
				<div className="flex flex-row gap-5">
					<div>
						<Autocomplete
							label="Empleados"
							placeholder="Busca un empleado"
							defaultItems={users}
							selectedKey={selectionUser}
							onSelectionChange={(value) => setSelectionUser(value)}
							allowsEmptyCollection={false}
							isClearable={true}
							size="sm"
							className="max-w-xs"
						>
							{(item) => (
								<AutocompleteItem key={item.value}>
									{`${item.label}`}
								</AutocompleteItem>
							)}
						</Autocomplete>
					</div>
					<div>
						<Autocomplete
							label="Tipo de tarea"
							placeholder="Busca un tipo"
							defaultItems={taskTypes}
							selectedKey={selectionTaskType}
							onSelectionChange={(value) => setSelectionTaskType(value)}
							allowsEmptyCollection={false}
							isClearable={true}
							size="sm"
							className="max-w-xs"
						>
							{(item) => (
								<AutocompleteItem key={item.value}>
									{`${item.label}`}
								</AutocompleteItem>
							)}
						</Autocomplete>
					</div>
					<div>
						<Autocomplete
							label="Estado de tarea"
							placeholder="Busca un estado"
							defaultItems={taskStates}
							selectedKey={selectionTaskState}
							onSelectionChange={(value) => setSelectionTaskState(value)}
							allowsEmptyCollection={false}
							isClearable={true}
							size="sm"
							className="max-w-xl"
						>
							{(item) => (
								<AutocompleteItem key={item.value}>
									{`${item.label}`}
								</AutocompleteItem>
							)}
						</Autocomplete>
					</div>
				</div>
				<div className="flex flex-row gap-5">
					<div>
						<Button
							className="mr-auto h-full"
							onClick={requestTaskList}
							isLoading={loading}
						>
							{'Buscar'}
						</Button>
					</div>
					<div>
						<PayButton />
					</div>
					<div>
						<CreateTaskType />
					</div>
					<div>
						<CreateTask
							isAdmin={isAdmin}
							users={users}
							taskTypes={taskTypes}
							difficultTypes={taskDifficulties}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
