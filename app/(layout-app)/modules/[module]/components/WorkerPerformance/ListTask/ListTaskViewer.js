/* eslint-disable no-unused-vars */
'use client'
import { useState, useCallback, useEffect } from 'react'
import { Accordion, AccordionItem, Divider } from '@nextui-org/react'
import TaskItem from './TaskItem'
import { NAMES_TASK, TASK_STATES } from '@/services/task'
import { getMoment } from '@/utils/date'
import { FaRegClock } from 'react-icons/fa' // Importamos un icono para la fecha límite
// Define constants for repeated class names
const CONTAINER_CLASSES = 'bg-gray-100 dark:bg-secondary-500 text-black dark:text-white'
const WRAPPER_CLASSES = 'rounded-lg w-full min-h-[63vh] max-h-[63vh]'

export default function ListTaskViewer ({ items = [], tabSelected, isAdmin, taskState, idUser, handleRequestGetTask }) {
    return (
        <section>
            <div className={`${CONTAINER_CLASSES} ${WRAPPER_CLASSES} p-2  overflow-auto`}>
                {items.length > 0
                    ? <div className={`overflow-y-auto ${WRAPPER_CLASSES} my-2 ${CONTAINER_CLASSES}`}>
                        <Accordion variant="splitted">
                            {items?.map((task) => {
                                console.log('Verificando item:', task) // 🔍 Verifica que el objeto tenga los datos correctos

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
                                            dateLimit={task.dateLimit}
                                            state={task.stateKey} // Asegura que el estado es accesible
                                            taskInitation={task?.taskInitation ?? null} // ✅ Evita error si es undefined
                                            taskCompletion={task?.taskCompletion ?? null} // ✅ Evita error si es undefined
                                            tabSelected={tabSelected}
                                            images={task?.taskInitation?.images ?? []} // ✅ Evita error si no hay imágenes
                                            taskState ={taskState}
                                            idUser ={idUser}
                                            handleRequestGetTask={handleRequestGetTask}
                                        />
                                    </AccordionItem>
                                )
                            })}
                        </Accordion>
                    </div>
                    : <div></div>
                }
            </div>
        </section>
    )
}
