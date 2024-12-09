/* eslint-disable no-unused-vars */
'use client'
import { useEffect, useState } from 'react'
import { getDataModelTaskDifficulties, getDataModelTaskStates, getDataModelTaskTypes, getDataModelUsers, requestTaskDifficultList, requestTaskStatesList, requestTaskTypesList, requestUserList } from '../service'
import { isMobileDevice } from '@/utils/agent'
import useFilterStore from '../store'
import useAuthStore from '@/stores/user'
import { TASK_STATES } from '@/services/task'
import FilterPayment from '../components/Filters/FilterPayment'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'
const ViewPayment = () => {
    const [isMobile, setIsMobile] = useState(true)
    const { isAdmin } = useAuthStore()
    const [users, setUsers] = useState([])
    const [taskTypes, setTaskTypes] = useState([])
    const [taskStates, setTaskStates] = useState([])
    const [taskDifficulties, setTaskDifficulties] = useState([])
    const { data: tasks = [] } = useFilterStore()

    const [todoTasks, setTodoTasks] = useState([])
    const [inProgressTasks, setInProgressTasks] = useState([])
    const [readyToEvaluateTasks, setReadyToEvaluateTasks] = useState([])
    const [unassignedTasks, setUnassignedTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])
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
        <div className='h-full w-full'>
            <FilterPayment isMobile={isMobile} isAdmin={isAdmin} users={users} taskTypes={taskTypes} taskStates={taskStates} taskDifficulties={taskDifficulties} filterData={filterData} setFilterData={setFilterData}/>
            <div>
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>ROLE</TableColumn>
                        <TableColumn>STATUS</TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell>Tony Reichert</TableCell>
                            <TableCell>CEO</TableCell>
                            <TableCell>Active</TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell>Zoey Lang</TableCell>
                            <TableCell>Technical Lead</TableCell>
                            <TableCell>Paused</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell>Jane Fisher</TableCell>
                            <TableCell>Senior Developer</TableCell>
                            <TableCell>Active</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell>William Howard</TableCell>
                            <TableCell>Community Manager</TableCell>
                            <TableCell>Vacation</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
export default ViewPayment
