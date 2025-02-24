/* eslint-disable no-unused-vars */
'use client'
import { motion } from 'framer-motion'
import { useEffect, useState, useCallback } from 'react'
import ListTaskViewer from './ListTaskViewer'
import { Spinner, Tabs, Tab } from '@nextui-org/react'
import { getTasksByEmployee, getGeneralTasks, parseTaskByEmployee, getIdTask } from './service'
import { TAB_TITLES, TASK_STATES, NAMES_TASK } from '@/services/task'
import useFilterStore from '@/app/(layout-app)/reports/components/Filter/store'
import useFilterStorePayment from '../components/Filters/storePayment'

export default function ListTask (
    {
        unassigned,
        pending,
        inProgress,
        review,
        completed,
        paid,
        loading,
        isAdmin,
        idUser,
        taskDifficulties,
        taskStates,
        tasks
    }) {
    const {
        focusTab,
        setFocusTab
    } = useFilterStorePayment()

    const [selected, setSelected] = useState([])
    const [selectedTab, setSelectedTab] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
    const [tabList, setTabList] = useState([])
    const [tasksUser, setTasksUser] = useState([])

    const [unassignedTasks, setUnassignedTasks] = useState([])
    const [tasksTodoUser, setTasksTodoUser] = useState([])
    const [tasksInProgressUser, setInProgressTasksUser] = useState([])
    const [tasksReadyToEvaluateUser, setTasksReadyToEvaluateUser] = useState([])
    const [tasksCompletedUser, setTasksCompletedUser] = useState([])
    const [tasksPaidUser, setTasksPaidUser] = useState([])
    const [fetching, setFetching] = useState(false)
    /** Fetch tasks for employees (Non-Admin) */
    const handleRequestGetTask = () => {
        if (taskStates?.length > 0) {
            setFetching(true)
            const idStateToDo = getIdTask({ tasks: taskStates, stateNames: 'POR HACER' })

            getTasksByEmployee({ employeeID: idUser }).then((result) => {
                const tasks = parseTaskByEmployee({
                    data: result.data,
                    taskDifficulties,
                    taskStates
                })
                setTasksUser(tasks)

                const todoFilteredTask = tasks.filter((t) => t.taskState === TASK_STATES.TODO)
                setTasksTodoUser(todoFilteredTask)

                const inProgessFilteredTask = tasks.filter((t) => t.taskState === TASK_STATES.IN_PROGRESS)
                setInProgressTasksUser(inProgessFilteredTask)

                const readyToEvaluateTask = tasks.filter((t) => t.taskState === TASK_STATES.READY_TO_EVALUATE)
                setTasksReadyToEvaluateUser(readyToEvaluateTask)

                const tasksCompletedUser = tasks.filter((t) => t.taskState === TASK_STATES.COMPLETED)
                setTasksCompletedUser(tasksCompletedUser)

                const paidTask = tasks.filter((t) => t.taskState === TASK_STATES.PAID)
                setTasksPaidUser(paidTask)

                setFetching(false)
            })

            getGeneralTasks({ stateId: idStateToDo }).then((result) => {
                const tasks = parseTaskByEmployee({
                    data: result.data,
                    taskDifficulties,
                    taskStates
                })

                const filteredTasks = tasks.filter((t) => t.userId === undefined)
                setUnassignedTasks(filteredTasks)
                setFetching(false)
            })
        }
    }

    useEffect(() => {
        if (isAdmin) {
            setTabList([TAB_TITLES.UNASSIGNED, TAB_TITLES.TODO, TAB_TITLES.READY_TO_EVALUATE, TAB_TITLES.COMPLETED, TAB_TITLES.PAID])
            handleRequestGetTask()
        } else {
            setTabList([TAB_TITLES.UNASSIGNED, TAB_TITLES.TODO, TAB_TITLES.IN_PROGRESS, TAB_TITLES.READY_TO_EVALUATE, TAB_TITLES.COMPLETED, TAB_TITLES.PAID])
            handleRequestGetTask()
        }
    }, [tasks])

    useEffect(() => {
        if (isAdmin) {
            switch (selected) {
            case TAB_TITLES.UNASSIGNED:
                setSelectedItems(unassigned.length > 0 ? unassigned : [])
                setSelectedTab(TASK_STATES.UNASSIGNED)
                break
            case TAB_TITLES.TODO:
                setSelectedItems(pending.length > 0 ? pending : [])
                setSelectedTab(TASK_STATES.TODO)
                break
            case TAB_TITLES.IN_PROGRESS:
                setSelectedItems(inProgress.length > 0 ? inProgress : [])
                setSelectedTab(TASK_STATES.IN_PROGRESS)
                break
            case TAB_TITLES.READY_TO_EVALUATE:
                setSelectedItems(review.length > 0 ? review : [])
                setSelectedTab(TASK_STATES.READY_TO_EVALUATE)
                break
            case TAB_TITLES.COMPLETED:
                setSelectedItems(completed.length > 0 ? completed : [])
                setSelectedTab(TASK_STATES.COMPLETED)
                break
            case TAB_TITLES.PAID:
                setSelectedItems(paid.length > 0 ? paid : [])
                setSelectedTab(TASK_STATES.PAID)
                break
            default:
                setSelectedItems([])
                break
            }
        } else {
            switch (selected) {
            case TAB_TITLES.UNASSIGNED:
                setSelectedItems(unassignedTasks.length > 0 ? unassignedTasks : [])
                setSelectedTab(TASK_STATES.UNASSIGNED)
                break
            case TAB_TITLES.TODO:
                setSelectedItems(tasksTodoUser.length > 0 ? tasksTodoUser : [])
                setSelectedTab(TASK_STATES.TODO)
                break
            case TAB_TITLES.IN_PROGRESS:
                setSelectedItems(tasksInProgressUser.length > 0 ? tasksInProgressUser : [])
                setSelectedTab(TASK_STATES.IN_PROGRESS)
                break
            case TAB_TITLES.READY_TO_EVALUATE:
                setSelectedItems(tasksReadyToEvaluateUser.length > 0 ? tasksReadyToEvaluateUser : [])
                setSelectedTab(TASK_STATES.READY_TO_EVALUATE)
                break
            case TAB_TITLES.COMPLETED:
                setSelectedItems(tasksCompletedUser.length > 0 ? tasksCompletedUser : [])
                setSelectedTab(TASK_STATES.COMPLETED)
                break
            case TAB_TITLES.PAID:
                setSelectedItems(tasksPaidUser.length > 0 ? tasksPaidUser : [])
                setSelectedTab(TASK_STATES.PAID)
                break
            }
        }
        setFocusTab(selected)
    }, [tasks, selected, fetching])

    useEffect(() => {
        setSelected(focusTab)
    }, [])

    return (
        <div className="flex-1 dark:bg-secondary-500 text-black dark:text-white rounded-lg h-full">
            {loading || fetching
                ? (
                    <div className="h-[50vh] w-full flex flex-col justify-center items-center">
                        <Spinner color="success" size="lg" label="Cargando tareas ..." />
                    </div>
                )
                : (
                    <div className="flex flex-col gap-y-2">

                        <Tabs
                            className="justify-center items-center w-full"
                            aria-label="Tabs colors"
                            selectedKey={selected}
                            color={'default'}
                            onSelectionChange={setSelected}
                        >
                            {tabList.map((tab) => (
                                <Tab key={tab} title={tab} />
                            ))}
                        </Tabs>
                        <motion.div
                            key={selectedTab} // 🔄 Clave única para animar al cambiar de pestaña
                            initial={{ opacity: 0, y: 10 }} // Estado inicial (transparente y desplazado)
                            animate={{ opacity: 1, y: 0 }} // Animación cuando cambia de tab
                            exit={{ opacity: 0, y: -10 }} // Animación al salir
                            transition={{ duration: 0.3, ease: 'easeOut' }} // Duración y efecto
                        >
                            <ListTaskViewer
                                items={selectedItems}
                                tabSelected={selectedTab}
                                isAdmin={isAdmin}
                                taskState={taskStates}
                                idUser={idUser}
                                handleRequestGetTask={handleRequestGetTask}
                            />
                        </motion.div>
                    </div>
                )}
        </div>)
}
