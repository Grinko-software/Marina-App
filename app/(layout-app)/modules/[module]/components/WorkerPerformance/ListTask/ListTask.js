/* eslint-disable no-unused-vars */
'use client'
import { useEffect, useState, useCallback } from 'react'
import ListTaskViewer from './ListTaskViewer'
import { Spinner, Tabs, Tab, Accordion, AccordionItem } from '@nextui-org/react'
import { completeTask, getTasksByEmployee, getGeneralTasks, parseTaskByEmployee, getIdTask } from './service'
import { TAB_TITLES, TASK_STATES, NAMES_TASK } from '@/services/task'
import { getMoment } from '@/utils/date'
import EvidenceTask from '../EmployeePerformance/components/EvidenceTask/evidenceTask'
import { TaskScore } from '../components/TaskDetailScore'

export default function ListTask ({ unassigned, pending, inProgress, review, finished, paid, loading, isAdmin, idUser, taskDifficulties, taskStates }) {
    const [selected, setSelected] = useState(TASK_STATES.UNASSIGNED)
    const [selectedTab, setSelectedTab] = useState(TASK_STATES.UNASSIGNED)
    const [selectedItems, setSelectedItems] = useState([])
    const [tabList, setTabList] = useState([])
    const [tasksUser, setTasksUser] = useState([])
    const [tasksToDo, setTasksToDo] = useState([])
    const [fetching, setFetching] = useState(false)

    console.log('🔍 isAdmin:', isAdmin)
    console.log('🔍 idUser:', idUser)

    /** Fetch tasks for employees (Non-Admin) */
    const handleRequestGetTask = useCallback(() => {
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
                console.log('USER EMPLOYEE TASK: ', tasks)
                setFetching(false)
            })

            getGeneralTasks({ stateId: idStateToDo }).then((result) => {
                const tasks = parseTaskByEmployee({
                    data: result.data,
                    taskDifficulties,
                    taskStates
                })

                console.log('🔍 Raw tasks before filtering:', tasks) // ✅ Debugging the full task list

                // ✅ Correct filter: Only keep tasks where userId === 0
                const filteredTasks = tasks.filter((t) => t.userId === undefined)

                console.log('✅ Filtered tasks (Unassigned userId === 0):', filteredTasks) // ✅ Debug filtered tasks

                setTasksToDo([...filteredTasks]) // ✅ Ensure React updates state correctly
                setFetching(false)
            })
        }
    }, [taskStates, idUser])

    useEffect(() => {
        if (isAdmin) {
            setTabList([TAB_TITLES.TODO, TAB_TITLES.READY_TO_EVALUATE, TAB_TITLES.PAID])
        } else {
            setTabList([TAB_TITLES.UNASSIGNED, TAB_TITLES.TODO])
            handleRequestGetTask() // Fetch tasks for employees
        }
    }, [handleRequestGetTask])

    /** Select Tab Logic */
    useEffect(() => {
        console.log('🛠 Changing Selected Tab to:', selected)
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
                setSelectedItems(finished.length > 0 ? finished : [])
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
                setSelectedItems(tasksToDo.length > 0 ? tasksToDo : [])
                setSelectedTab(TASK_STATES.UNASSIGNED)
                console.log('EMPLOYEE UNASSIGNE TASK: ', tasksToDo)
                break
            case TAB_TITLES.TODO:
                setSelectedItems(tasksUser.length > 0 ? tasksUser : [])
                setSelectedTab(TASK_STATES.TODO)
                console.log('EMPLOYEE TODO TASK: ', tasksUser)
                break
            }
        }
    }, [selected, fetching])

    return (
        <div className="flex-1 dark:bg-secondary-500 text-black dark:text-white rounded-lg h-full">
            {loading || fetching
                ? (
                    <div className="h-[50vh] w-full flex flex-col justify-center items-center">
                        <Spinner color="success" size="lg" label="Cargando tareas ..." />
                    </div>
                )
                : (
                    <div className="flex flex-col gap-y-1">

                        <Tabs
                            className="justify-center items-center"
                            aria-label="Options"
                            selectedKey={selected}
                            onSelectionChange={setSelected}
                        >
                            {tabList.map((tab) => (
                                <Tab key={tab} title={tab} />
                            ))}
                        </Tabs>
                        <ListTaskViewer
                            items={selectedItems}
                            tabSelected={selectedTab}
                            isAdmin={isAdmin}
                            taskState ={taskStates}
                            idUser ={idUser}
                            handleRequestGetTask={handleRequestGetTask} />
                    </div>
                )}
        </div>)
}
/* <div className="w-full flex flex-col gap-6 sm:gap-10">
                                    {tasksToDo.length > 0 && (
                                        <div className="w-full">
                                            <h2 className="text-lg sm:text-xl font-bold mb-3 text-center">
                                        Actividades por hacer
                                            </h2>
                                            <Accordion className="w-full bg-white rounded-lg shadow-md">
                                                {tasksToDo.map(({ id, name, taskState, description, dateLimit }) => (
                                                    <AccordionItem
                                                        key={id}
                                                        title={
                                                            <div className="flex flex-wrap justify-between items-center w-full p-2">
                                                                <span className="uppercase font-bold text-sm sm:text-base text-gray-800">
                                                                    {name}
                                                                </span>
                                                                <span className={`text-xs sm:text-sm font-semibold ${taskState === 'COMPLETED' ? 'text-green-500' : 'text-yellow-500'}`}>
                                                                    {NAMES_TASK[taskState]}
                                                                </span>
                                                            </div>
                                                        }
                                                    >
                                                        <div className="text-gray-600 px-2 flex flex-col gap-2">
                                                            <p><strong>Descripción:</strong> {description}</p>
                                                            <p><strong>Fecha límite:</strong> {getMoment(dateLimit).calendar() || '-'}</p>
                                                            {taskState !== 'COMPLETED' && (
                                                                <EvidenceTask taskState={taskState} employeeId={idUser} taskId={id} handleRequestGetTask={handleRequestGetTask} />
                                                            )}
                                                        </div>
                                                    </AccordionItem>
                                                ))}
                                            </Accordion>
                                        </div>
                                    )}

                                    {tasksUser.length > 0 && (
                                        <div className="w-full">
                                            <h2 className="text-lg sm:text-xl font-bold mb-3 text-center">
                                        Actividades asignadas
                                            </h2>
                                            <Accordion className="w-full bg-white rounded-lg shadow-md">
                                                {tasksUser.map(({ id, name, taskState, description, dateLimit }) => (
                                                    <AccordionItem key={id} title={<span className="uppercase font-bold">{name}</span>}>
                                                        <div className="text-gray-600 px-2 flex flex-col gap-2">
                                                            <p><strong>Descripción:</strong> {description}</p>
                                                            <p><strong>Fecha límite:</strong> {getMoment(dateLimit).calendar() || '-'}</p>
                                                        </div>
                                                    </AccordionItem>
                                                ))}
                                            </Accordion>
                                        </div>
                                    )}
                                </div>
                    </div> */
