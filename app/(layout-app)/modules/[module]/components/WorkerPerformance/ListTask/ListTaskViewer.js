/* eslint-disable no-unused-vars */
'use client'
import { Accordion, AccordionItem, Divider } from '@nextui-org/react'
import TaskItem from './TaskItem'
import { getMoment } from '@/utils/date'
import { FaRegClock } from 'react-icons/fa'

const CONTAINER_CLASSES = 'bg-gray-100 dark:bg-secondary-500 text-black dark:text-white'
const WRAPPER_CLASSES = 'rounded-lg w-full min-h-[67vh] max-h-[67vh]'

export default function ListTaskViewer ({ items = [], tabSelected, isAdmin, taskState, idUser, handleRequestGetTask, feedback }) {
    return (
        <section>
            <div className={`${CONTAINER_CLASSES} ${WRAPPER_CLASSES} p-2 overflow-auto`}>
                {items.length > 0
                    ? <div className={`overflow-y-auto min-h-[63vh] max-h-[63vh] ${CONTAINER_CLASSES}`}>
                        <Accordion variant="splitted">
                            {items?.map((task) => {
                                return (
                                    <AccordionItem
                                        className={`rounded-xl border border-gray-300 dark:border-gray-600 shadow-md px-6 ${CONTAINER_CLASSES}`}
                                        key={task.id}
                                        title={
                                            <div className={`flex flex-row sm:flex-row justify-between items-center w-full gap-y-1 space-x-1 ${CONTAINER_CLASSES}`}>
                                                {/* Nombre de la Tarea */}
                                                <span className="uppercase font-bold text-xs justify-center items-center tracking-wide text-gray-800 dark:text-gray-100 min-w-[14vh] max-w-[14vh]">
                                                    {task.name}
                                                </span>

                                                {/* Divider entre el nombre y la fecha */}
                                                <Divider orientation="vertical" className="h-8 mx-2 bg-gray-400 dark:bg-gray-500" />

                                                {/* Contenedor de la Fecha */}
                                                <div className='flex justify-between items-start flex-col'>
                                                    <span className="flex items-center space-x-2">
                                                        <FaRegClock className="text-primary-500 text-xs" />
                                                        <span className="font-mono text-xs font-semibold">
                                                            Fecha límite:
                                                        </span>
                                                    </span>
                                                    <span className="font-mono text-xs text-gray-900 dark:text-white capitalize">
                                                        {getMoment(task.dateLimit)?.format('DD/MM/YY') || '-'}
                                                    </span>
                                                </div>
                                            </div>
                                        }
                                    >
                                        <TaskItem
                                            isAdmin={isAdmin}
                                            user={task.user}
                                            description={task.description}
                                            dateLimit={getMoment(task.createdAt)?.format('DD/MM/YY')}
                                            state={task?.taskState}
                                            taskInitation={task?.taskInitation ?? null}
                                            taskCompletion={task?.taskCompletion ?? null}
                                            tabSelected={tabSelected}
                                            images={task?.taskInitation?.images ?? []}c
                                            taskState ={taskState}
                                            idUser ={idUser}
                                            handleRequestGetTask={handleRequestGetTask}
                                            id={task?.id}
                                            feedback={task?.feedback}
                                        />
                                    </AccordionItem>
                                )
                            })}
                        </Accordion>
                    </div>
                    : (
                        <div className="flex flex-col items-center justify-center h-full text-center text-gray-600 dark:text-gray-300 py-10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 9l9-6 9 6-9 6-9-6z" />
                                <path d="M3 9v6l9 6 9-6V9" />
                            </svg>
                            <p className="text-lg font-semibold">No hay tareas disponibles</p>
                            <p className="text-sm">Cuando se asignen nuevas tareas, aparecerán aquí.</p>
                        </div>
                    )
                }
            </div>
        </section>
    )
}
