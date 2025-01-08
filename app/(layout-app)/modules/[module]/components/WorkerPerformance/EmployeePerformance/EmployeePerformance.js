/* eslint-disable no-unused-vars */
'use client'
import { useEffect, useState, useCallback } from 'react'
import { Accordion, AccordionItem, Spinner } from '@nextui-org/react'
import { getTasksByEmployee, getGeneralTasks, parseTaskByEmployee, getStateTask, getIdTask } from './service'
import EvidenceTask from './components/EvidenceTask/evidenceTask'
import { getMoment } from '@/utils/date'
import { NAMES_TASK } from '@/services/task'
import { TaskScore } from '../components/TaskDetailScore'

export default function EmployeePerformance ({ idUser, taskDifficulties, taskStates }) {
    const [tasksToDo, setTasksToDo] = useState([])
    const [tasksUser, setTasksUser] = useState([])
    const [loading, setLoading] = useState(false)
    const hasTask = tasksUser?.length > 0
    const hasGeneralTasks = tasksToDo?.length > 0
    const handleRequestGetTask = useCallback(() => {
        if (taskStates?.length > 0) {
            setLoading(true)
            const idStateToDo = getIdTask({ tasks: taskStates, stateNames: 'TO DO' })
            getTasksByEmployee({ employeeID: idUser }).then((result) => {
                const tasks = parseTaskByEmployee({ data: result.data, taskDifficulties, taskStates })
                setTasksUser(tasks)
                setLoading(false)
            })
            getGeneralTasks({ stateId: idStateToDo }).then((result) => {
                const tasks = parseTaskByEmployee({ data: result.data, taskDifficulties, taskStates })
                setTasksToDo(tasks.filter(t => t.userId === null))
                setLoading(false)
            })
        }
    }, [taskStates])
    useEffect(() => {
        if (taskDifficulties?.length > 0 && taskStates?.length > 0) {
            handleRequestGetTask()
        }
    }, [taskDifficulties, taskStates])
    console.log(tasksUser)
    return (
        <div className="flex flex-col items-center  sm:p-6 w-full xl:max-w-[1200px] mx-auto">
            { loading
                ? <div className='h-[50vh] w-full flex flex-col justify-center items-center'>
                    <Spinner color='success' size="lg" className='' label='Cargando tareas ...'/>
                </div>
                : <div className='w-full flex flex-col gap-10'>
                    { hasGeneralTasks
                        ? <div className='w-full'>
                            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">Actividades por hacer</h2>
                            <Accordion className="w-full bg-white rounded-lg shadow-md">
                                {tasksToDo?.map(({ id, name, taskState, description, rating, dateLimit }) => (
                                    <AccordionItem
                                        key={id}
                                        title={
                                            <div className="flex justify-between items-center w-full p-2">
                                                <span className="uppercase font-bold text-gray-800">{name}</span>
                                                <span className={`text-xs sm:text-sm font-semibold ${
                                                    taskState === 'COMPLETED' ? 'text-green-500' : 'text-yellow-500'
                                                }`}>
                                                    { NAMES_TASK[taskState]}
                                                </span>
                                            </div>
                                        }
                                    >
                                        <div className="text-gray-600 px-2 flex flex-col gap-2">
                                            <p><strong>Descripción:</strong> {description}</p>
                                            <p><strong>Fecha límite:</strong> {getMoment(dateLimit).calendar() || '-'}</p>
                                            {taskState !== 'COMPLETED' && (
                                                <EvidenceTask taskState={taskState} employeeId={idUser} taskId={id} handleRequestGetTask={handleRequestGetTask}/>
                                            )}
                                        </div>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                        : null}
                    {hasTask
                        ? <div className='w-full'>
                            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">Actividades asignadas</h2>
                            <Accordion className="w-full bg-white rounded-lg shadow-md">
                                {tasksUser?.map(({ id, name, taskState, description, rating, dateLimit }) => (
                                    <AccordionItem
                                        key={id}
                                        title={
                                            <div className="flex justify-between items-center w-full p-2">
                                                <span className="uppercase font-bold text-gray-800">{name}</span>
                                                <span className={`text-xs sm:text-sm font-semibold ${
                                                    taskState === 'COMPLETED' ? 'text-green-500' : 'text-yellow-500'
                                                }`}>
                                                    { NAMES_TASK[taskState]}
                                                </span>
                                            </div>
                                        }
                                    >
                                        <div className="text-gray-600 px-2 flex flex-col gap-2">
                                            <p><strong>Descripción:</strong> {description}</p>
                                            <p><strong>Fecha límite:</strong> {getMoment(dateLimit).calendar() || '-'}</p>
                                            {taskState === 'COMPLETED' && (
                                                <div className='flex flex-row items-center justify-start gap-2'>
                                                    <strong>Puntuación:</strong>
                                                    <TaskScore score={rating}/>
                                                </div>
                                            )}
                                            {taskState !== 'COMPLETED' && (
                                                <EvidenceTask taskState={taskState} employeeId={idUser} taskId={id} handleRequestGetTask={handleRequestGetTask}/>
                                            )}
                                        </div>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                        : null }
                </div>
            }
        </div>
    )
}
