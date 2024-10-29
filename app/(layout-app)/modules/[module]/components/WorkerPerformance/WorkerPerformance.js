'use client'
import { useEffect, useState } from 'react'
import Filter from './Filter'
import Widgets from './Widgets'
import { getDataModelTaskDifficulties, getDataModelTaskStates, getDataModelTaskTypes, getDataModelUsers, requestTaskDifficultList, requestTaskStatesList, requestTaskTypesList, requestUserList } from './service'

import useFilterStore from './store'
import TasksBoard from './components/TasksBoard'
import { TASK_STATES } from '@/services/task'

export default function WorkerPerformance () {
    // const { requestData } = useAccountingEventsStore()
    const [users, setUsers] = useState([])
    const [taskTypes, setTaskTypes] = useState([])
    const [taskStates, setTaskStates] = useState([])
    const [taskDifficulties, setTaskDifficulties] = useState([])
    const { data: tasks = [], loading } = useFilterStore()

    const [todoTasks, setTodoTasks] = useState([])
    const [inProgressTasks, setInProgressTasks] = useState([])
    const [readyToEvaluateTasks, setReadyToEvaluateTasks] = useState([])
    const [unassignedTasks, setUnassignedTasks] = useState([])
    const [filterData, setFilterData] = useState({})

    useEffect(() => {
        if (tasks) {
            // console.log(tasks)
        }
    }, [tasks])

    useEffect(() => {
        const todoItems = []
        const inProgressItems = []
        const readyToEvaluateItems = []
        const unassignedItems = []

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
                default:
                    // code block
                }
            }
        }

        setTodoTasks(todoItems)
        setInProgressTasks(inProgressItems)
        setReadyToEvaluateTasks(readyToEvaluateItems)
        setUnassignedTasks(unassignedItems)
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

    return <section className='w-full h-full'>
        <section className='flex w-full h-full' >
            <div className='w-full h-full flex flex-col gap-3'>
                <Filter users={users} taskTypes={taskTypes} taskStates={taskStates} taskDifficulties={taskDifficulties} filterData={filterData} setFilterData={setFilterData}/>
                <Widgets
                    loading={loading}
                    countTotalTasks={tasks?.length}
                    countTodoTasks={todoTasks?.length}
                    countInProgressTasks={inProgressTasks?.length}
                    countReadyToEvaluateTasks={readyToEvaluateTasks?.length}
                    countUnassignedTasks={unassignedTasks?.length}
                />
                <div className='flex flex-1 items-center'>
                    <TasksBoard
                        todoTasks={todoTasks}
                        inProgressTasks={inProgressTasks}
                        readyToEvaluateTasks={readyToEvaluateTasks}
                        unassignedTasks={unassignedTasks}
                    ></TasksBoard>
                </div>
            </div>
        </section>
    </section>
}
