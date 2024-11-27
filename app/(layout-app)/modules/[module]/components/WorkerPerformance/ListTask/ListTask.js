/* eslint-disable no-unused-vars */
'use client'
import { useState, useCallback, useEffect } from 'react'
import { Accordion, AccordionItem, Spinner } from '@nextui-org/react'
import { getGeneralTasks, parseTaskByEmployee, getIdTask } from './service'
import { getMoment } from '@/utils/date'
import { NAMES_TASK } from '@/services/task'

export default function ListTask ({ taskDifficulties, taskStates }) {
    const [tasksToDo, setTasksToDo] = useState([])
    const [loading, setLoading] = useState(false)
    const hasGeneralTasks = tasksToDo?.length > 0
    const handleRequestGetTask = useCallback(() => {
        if (taskStates?.length > 0) {
            setLoading(true)
            const idStateToDo = getIdTask({ tasks: taskStates, stateNames: 'TO DO' })
            getGeneralTasks({ stateId: idStateToDo }).then((result) => {
                console.log(result)
                const tasks = parseTaskByEmployee({ data: result.data, taskDifficulties, taskStates })
                setTasksToDo(tasks)
                setLoading(false)
            })
        }
    }, [taskStates])
    useEffect(() => {
        handleRequestGetTask()
    }, [taskStates, taskDifficulties])

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
                                        </div>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                        : null}
                </div>
            }
        </div>
    )
}
