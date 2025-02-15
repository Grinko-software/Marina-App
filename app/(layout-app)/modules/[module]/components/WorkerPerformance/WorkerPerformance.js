'use client'
import { useEffect, useState } from 'react'
import Filter from './components/Filters/Filter'
import FilterEmployee from './components/Filters/FilterEmployee'
import Widgets from './Widgets'
import {
    getDataModelTaskDifficulties,
    getDataModelTaskStates,
    getDataModelTaskTypes,
    getDataModelUsers,
    requestTaskDifficultList,
    requestTaskStatesList,
    requestTaskTypesList,
    requestUserList
} from './service'
import { isMobileDevice } from '@/utils/agent'
import useFilterStore from './store'
import useAuthStore from '@/stores/user'
import TasksBoard from './components/TasksBoard'
import { TASK_STATES } from '@/services/task'
import ListTask from './ListTask/ListTask'

export default function WorkerPerformance () {
    const [isMobile, setIsMobile] = useState(true)
    const { isAdmin, idUser } = useAuthStore()
    const [users, setUsers] = useState([])
    const [taskTypes, setTaskTypes] = useState([])
    const [taskStates, setTaskStates] = useState([])
    const [taskDifficulties, setTaskDifficulties] = useState([])
    const { data: tasks = [], loading } = useFilterStore()

    const [todoTasks, setTodoTasks] = useState([])
    const [inProgressTasks, setInProgressTasks] = useState([])
    const [readyToEvaluateTasks, setReadyToEvaluateTasks] = useState([])
    const [unassignedTasks, setUnassignedTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])
    const [paidTasks, setPaidTasks] = useState([])
    const [filterData, setFilterData] = useState({})

    useEffect(() => {
        const view = isMobileDevice()
        setIsMobile(view)
    }, [])

    useEffect(() => {
        const todoItems = []
        const inProgressItems = []
        const readyToEvaluateItems = []
        const unassignedItems = []
        const completedItems = []
        const paidTasks = []
        if (tasks?.length) {
            for (const task of tasks) {
                const taskState = task.stateKey
                switch (taskState) {
                case TASK_STATES.UNASSIGNED:
                    unassignedItems.push(task)
                    break
                case TASK_STATES.TODO:
                    todoItems.push(task)
                    break
                case TASK_STATES.IN_PROGRESS:
                    inProgressItems.push(task)
                    break
                case TASK_STATES.READY_TO_EVALUATE:
                    readyToEvaluateItems.push(task)
                    break
                case TASK_STATES.COMPLETED:
                    completedItems.push(task)
                    break
                case TASK_STATES.PAID:
                    paidTasks.push(task)
                    break
                default:
					// code block
                }
            }
        }

        setTodoTasks(todoItems)
        setInProgressTasks(inProgressItems)
        setReadyToEvaluateTasks(readyToEvaluateItems)
        setUnassignedTasks(unassignedItems)
        setCompletedTasks(completedItems)
        setPaidTasks(paidTasks)
    }, [tasks])

    useEffect(() => {
        requestUserList().then((data) => {
            if (data) {
                const items = getDataModelUsers({ data: data?.data })
                setUsers(items || [])
            }
        })

        requestTaskTypesList().then((data) => {
            if (data) {
                const items = getDataModelTaskTypes({ data: data?.data })
                setTaskTypes(items || [])
            }
        })

        requestTaskStatesList().then((data) => {
            if (data) {
                const items = getDataModelTaskStates({ data: data?.data })
                setTaskStates(items || [])
            }
        })

        requestTaskDifficultList().then((data) => {
            if (data) {
                const items = getDataModelTaskDifficulties({ data: data?.data })
                setTaskDifficulties(items || [])
            }
        })
    }, [])

    return (
        <section className="w-full h-screen flex flex-col overflow-hidden">
            <div className="flex flex-col flex-grow overflow-hidden h-full space-y-2">
                {/* Filtro */}
                <div className="flex-shrink-0 ">
                    {isAdmin
                        ? (
                            <Filter
                                isMobile={isMobile}
                                isAdmin={isAdmin}
                                users={users}
                                taskTypes={taskTypes}
                                taskStates={taskStates}
                                taskDifficulties={taskDifficulties}
                                filterData={filterData}
                                setFilterData={setFilterData}
                            />
                        )
                        : (
                            <FilterEmployee
                                isMobile={isMobile}
                                isAdmin={isAdmin}
                                users={users}
                                taskTypes={taskTypes}
                                taskStates={taskStates}
                                taskDifficulties={taskDifficulties}
                                filterData={filterData}
                                setFilterData={setFilterData}
                            />
                        )}
                </div>

                {/* Contenido Principal */}
                <div className="flex-grow flex flex-col overflow-hidden rounded-lg">
                    {isAdmin
                        ? (
                            <>
                                {isMobile
                                    ? (
                                        <ListTask
                                            loading={loading}
                                            taskDifficulties={taskDifficulties}
                                            taskStates={taskStates}
                                            isAdmin={true}
                                            idUser ={idUser}
                                            //
                                            filters={filterData}
                                            unassigned={unassignedTasks}
                                            pending={todoTasks}
                                            inProgress={inProgressTasks}
                                            review={readyToEvaluateTasks}
                                            completed={completedTasks}
                                            paid={paidTasks}
                                        />
                                    )
                                    : (
                                        <div className="flex-grow flex flex-col overflow-hidden space-y-4">
                                            <Widgets
                                                loading={loading}
                                                countTotalTasks={tasks?.length}
                                                countTodoTasks={todoTasks?.length}
                                                countInProgressTasks={inProgressTasks?.length}
                                                countReadyToEvaluateTasks={readyToEvaluateTasks?.length}
                                                countUnassignedTasks={unassignedTasks?.length}
                                                className="flex-shrink-0"
                                            />

                                            <div className="flex-grow overflow-y-auto">
                                                <TasksBoard
                                                    filterData={filterData}
                                                    todoTasks={todoTasks}
                                                    inProgressTasks={inProgressTasks}
                                                    readyToEvaluateTasks={readyToEvaluateTasks}
                                                    unassignedTasks={unassignedTasks}
                                                    completedTasks={completedTasks}
                                                    paidTasks={paidTasks}
                                                    className="h-full"
                                                />
                                            </div>
                                        </div>
                                    )}
                            </>
                        )
                        : (<>
                            {isMobile
                                ? <ListTask
                                    loading={loading}
                                    taskDifficulties={taskDifficulties}
                                    taskStates={taskStates}
                                    isAdmin={false}
                                    idUser ={idUser}
                                    //
                                    filters={filterData}
                                    unassigned={unassignedTasks}
                                    pending={todoTasks}
                                    inProgress={inProgressTasks}
                                    review={readyToEvaluateTasks}
                                    finished={completedTasks}
                                    paid={paidTasks}
                                />
                                : (

                                    <div className="min-h-[62vh] max-h-[62vh] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn rounded-2xl">
                                        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm text-center">
                                            <span className="text-4xl">📱</span>
                                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-2">
                                                    Accede desde tu celular
                                            </h2>
                                            <p className="text-gray-600 dark:text-gray-300 mt-2">
                                                    Este módulo solo está disponible en dispositivos móviles.
                                            </p>
                                        </div>
                                    </div>
                                )
                            }
                        </>)

                    }
                </div>
            </div>
        </section>
    )
}
