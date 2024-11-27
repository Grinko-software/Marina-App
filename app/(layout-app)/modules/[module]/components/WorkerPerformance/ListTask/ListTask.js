/* eslint-disable no-unused-vars */
'use client'
import { useState, useCallback, useEffect } from 'react'
import { Accordion, AccordionItem, Spinner, Tab, Tabs } from '@nextui-org/react'
import { getGeneralTasks, parseTaskByEmployee, getIdTask } from './service'
import { getMoment } from '@/utils/date'
import { NAMES_TASK, TASK_STATES } from '@/services/task'
import { Image } from 'antd'
import { TaskScoreInputMobile } from '../components/TaskDetailScore'

export default function ListTask ({ taskDifficulties, taskStates }) {
    const [tasksToDo, setTasksToDo] = useState([])
    const [tasksReadyToEvaluate, setTasksReadyToEvaluate] = useState([])
    const [loading, setLoading] = useState(false)
    const hasGeneralTasks = (tasksToDo?.length || tasksReadyToEvaluate?.length) > 0

    const handleRequestGetTask = useCallback(() => {
        if (taskStates?.length > 0) {
            setLoading(true)
            const idStateToDo = getIdTask({ tasks: taskStates, stateNames: 'TO DO' })
            const idStateReadyToEvaluate = getIdTask({ tasks: taskStates, stateNames: 'IN REVIEW' })
            getGeneralTasks({ stateId: idStateToDo }).then((result) => {
                const tasks = parseTaskByEmployee({ data: result.data, taskDifficulties, taskStates })
                setTasksToDo(tasks)
                setLoading(false)
            })
            getGeneralTasks({ stateId: idStateReadyToEvaluate }).then((result) => {
                const tasks = parseTaskByEmployee({ data: result.data, taskDifficulties, taskStates })
                setTasksReadyToEvaluate(tasks)
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
                        ? <div className='w-full flex flex-col gap-3 divide-y'>
                            {
                                [
                                    { title: 'Actividades por hacer', tasks: tasksToDo || [], state: TASK_STATES.TODO },
                                    { title: 'Actividades a evaluar', tasks: tasksReadyToEvaluate || [], state: TASK_STATES.READY_TO_EVALUATE }
                                ].map((item) => {
                                    return (
                                        <div className='w-full' key={item.title}>
                                            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">{item.title}</h2>
                                            {item?.tasks?.length
                                                ? <>
                                                    <Accordion className="w-full bg-white rounded-lg shadow-md">
                                                        {item.tasks?.map(({ id, name, taskState, description, username, dateLimit, imagesInit, imagesFinish }) => (
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
                                                                    <p><strong>Usuario asignado:</strong> {username ?? 'No asignado'}</p>
                                                                    <p><strong>Descripción:</strong> {description}</p>
                                                                    <p><strong>Fecha límite:</strong> {getMoment(dateLimit).calendar() || '-'}</p>

                                                                    {
                                                                        (taskState === TASK_STATES.READY_TO_EVALUATE)
                                                                            ? <div className='flex flex-col items-center mx-auto'>
                                                                                <Tabs
                                                                                    aria-label="Images"
                                                                                    size="md"
                                                                                    className='mx-auto py-2'
                                                                                    // selectedKey={imagesTab}
                                                                                    // onSelectionChange={setImagesTab}
                                                                                    classNames={{
                                                                                        cursor: 'bg-green-400 dark:bg-green-400',
                                                                                        tabContent: 'group-data-[selected=true]:text-primary-50'
                                                                                    }}
                                                                                    items={[
                                                                                        {
                                                                                            id: 1,
                                                                                            label: 'Antes',
                                                                                            images: imagesInit
                                                                                        },
                                                                                        {
                                                                                            id: 2,
                                                                                            label: 'Después',
                                                                                            images: imagesFinish
                                                                                        }
                                                                                    ]}
                                                                                >
                                                                                    {(item) => (
                                                                                        <Tab key={item.id} title={item.label}>
                                                                                            <div className='flex flex-row flex-wrap justify-center gap-5 overflow-y-auto max-h-[25rem]'>
                                                                                                {item.images.map((item, index) => (
                                                                                                    <Image
                                                                                                        key={index}
                                                                                                        shadow="none"
                                                                                                        radius="lg"
                                                                                                        width="50"
                                                                                                        height="50"
                                                                                                        alt={name}
                                                                                                        className="object-cover max-h-[10rem] border w-full min-w-[10rem] rounded-lg bg-slate-100 dark:bg-white"
                                                                                                        src={item}
                                                                                                    />
                                                                                                ))}
                                                                                                {
                                                                                                    !item.images.length &&
                                                                                            <p className="text-base uppercase font-semibold m-3">No hay imágenes para mostrar</p>
                                                                                                }
                                                                                            </div>
                                                                                        </Tab>
                                                                                    )}
                                                                                </Tabs>
                                                                                <TaskScoreInputMobile taskId={id} handleReaload={handleRequestGetTask}/>
                                                                            </div>
                                                                            : <></>
                                                                    }
                                                                </div>
                                                            </AccordionItem>
                                                        ))}
                                                    </Accordion>
                                                </>
                                                : <p className="text-base text-center uppercase font-semibold mx-auto m-3">No hay tareas para mostrar</p>
                                            }
                                        </div>
                                    )
                                })
                            }

                        </div>
                        : null}
                </div>
            }
        </div>
    )
}
