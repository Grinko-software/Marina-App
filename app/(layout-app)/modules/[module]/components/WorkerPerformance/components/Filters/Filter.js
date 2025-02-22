'use client'
import { useDisclosure, Autocomplete, AutocompleteItem, Button } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import CreateTaskType from '../../NewTaskType/newTaskType'
import CreateTask from '../../NewTask/newTask'
import useFilterStore from '../../store'
import PayButton from '../../PayButton/PayButton'
import CustomDatePicker from '@/components/DatePicker/DatePicker'
import FilterMobileDashboard from './FilterMobileDashboard'
import { TAB_TITLES } from '@/services/task'
import useFilterStorePayment from './storePayment'

export default function Filter ({
    isMobile,
    isAdmin = true,
    users,
    taskTypes,
    taskStates,
    taskDifficulties,
    filterData,
    setFilterData,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    totalPaidCash
}) {
    const [selectionTaskType, setSelectionTaskType] = useState(null)
    const [selectionTaskState, setSelectionTaskState] = useState(null)
    const [selectionUser, setSelectionUser] = useState(null)
    const { loading, requestData } = useFilterStore()
    const { isOpen, onClose, onOpen } = useDisclosure()
    useEffect(() => {
        //
    }, [selectionTaskType])

    useEffect(() => {
        requestTaskList()
    }, [])

    useEffect(() => {
        setFilterData({
            taskTypeId: selectionTaskType || undefined,
            taskStateId: selectionTaskState || undefined,
            userId: selectionUser || undefined,
            fromDate,
            toDate
        })
    }, [selectionTaskType, selectionTaskState, selectionUser, fromDate, toDate])

    const requestTaskList = () => {
        onClose()
        return requestData(filterData)
    }
    const {
        focusTab
    } = useFilterStorePayment()

    return isMobile
        ? (
            <div className="w-full flex flex-col flex-1 items-center justify-center gap-[10px]">
                <FilterMobileDashboard
                    content={
                        <div className='flex flex-col gap-[20px] h-full'>
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
                            {/* Calendarios */}
                            <div className="w-full md:max-w-xs">
                                <CustomDatePicker
                                    label="Desde"
                                    value={fromDate}
                                    onChange={setFromDate}
                                    height={'max-h-[86px] h-full'}
                                />
                            </div>
                            <div className="w-full md:max-w-xs">
                                <CustomDatePicker label="Hasta" value={toDate} onChange={setToDate} height={'max-h-[86px] h-full'} />
                            </div>

                            <Button

                                className="bg-emerald-600 dark:bg-emerald-600 font-semibold uppercase w-full h-[48px]"
                                color="primary"
                                onClick={requestTaskList}
                                isLoading={loading}
                            >
                                {'Buscar'}
                            </Button>

                        </div>
                    }
                    isOpen={isOpen}
                    onClose={onClose}
                    onOpen={onOpen}
                />
                <div className="w-full flex items-center justify-center gap-[10px]">
                    <PayButton />
                    <CreateTask
                        isAdmin={isAdmin}
                        users={users}
                        taskTypes={taskTypes}
                        difficultTypes={taskDifficulties}
                    />
                    {(totalPaidCash > 0 && focusTab === TAB_TITLES.PAID) && (
                        <Button
                            className="bg-green-700 hover:bg-green-800 dark:bg-green-700 dark:hover:bg-green-800
               font-semibold uppercase w-full text-white flex items-center justify-center gap-2 py-3 px-5 rounded-lg"
                            color="primary"
                        >
        💰 {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' })
                                .format(totalPaidCash)
                            }
                        </Button>
                    )}
                </div>
            </div>
        )
        : (
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
                        {/* Calendarios */}
                        <div className="w-full md:max-w-[157px]">
                            <CustomDatePicker
                                label="Desde"
                                value={fromDate}
                                onChange={setFromDate}
                                height={'max-h-[86px] h-full'}
                            />
                        </div>
                        <div className="w-full  md:max-w-[157px]">
                            <CustomDatePicker label="Hasta" value={toDate} onChange={setToDate} height={'max-h-[86px] h-full'} />
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
                                requestTaskList={requestTaskList}
                            />
                        </div>
                    </div>
                </div>
            </section>
        )
}
