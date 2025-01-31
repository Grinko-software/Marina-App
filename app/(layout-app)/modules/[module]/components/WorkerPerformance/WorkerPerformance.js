'use client'
import { useEffect, useState } from 'react'
import Filter from './components/Filters/Filter'
import FilterEmployee from './components/Filters/FilterEmployee'
import Widgets from './Widgets'
import { getDataModelTaskDifficulties, getDataModelTaskStates, getDataModelTaskTypes, getDataModelUsers, requestTaskDifficultList, requestTaskStatesList, requestTaskTypesList, requestUserList } from './service'
import { isMobileDevice } from '@/utils/agent'
import useFilterStore from './store'
import useAuthStore from '@/stores/user'
import EmployeePerformance from './EmployeePerformance/EmployeePerformance'
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
            <div className="flex flex-col flex-grow overflow-hidden h-full gap-y-4">
                {/* Filtro */}
                <div className="flex-shrink-0">
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
                <div className="flex-grow flex flex-col overflow-hidden">
                    {isAdmin
                        ? (
                            <>
                                {isMobile
                                    ? (
                                        <div className="flex-grow overflow-auto">
                                            <ListTask taskDifficulties={taskDifficulties} taskStates={taskStates} />
                                        </div>
                                    )
                                    : (
                                        <div className="flex-grow flex flex-col overflow-hidden">
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
                        : (
                            <div className="flex-grow overflow-y-auto">
                                <EmployeePerformance
                                    taskStates={taskStates}
                                    idUser={idUser}
                                    taskDifficulties={taskDifficulties}
                                />
                            </div>
                        )}
                </div>
            </div>
        </section>
    )
}
