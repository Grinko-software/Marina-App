'use client'
import { useEffect, useState } from 'react'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { getTasksByEmployee, parseTaskByEmployee } from './service'
import EvidenceTask from './components/EvidenceTask/evidenceTask'
import { getMoment } from '@/utils/date'

export default function EmployeePerformance ({ idUser, taskDifficulties, taskStates }) {
    const [tasksUser, setTasksUser] = useState([])

    useEffect(() => {
        if (taskDifficulties?.length > 0) {
            getTasksByEmployee({ employeeID: idUser }).then((result) => {
                const tasks = parseTaskByEmployee({ data: result.data, taskDifficulties, taskStates })
                setTasksUser(tasks)
            })
        }
    }, [taskDifficulties])

    return (
        <div className="flex flex-col items-center p-4 sm:p-6 w-full xl:max-w-[1200px] mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">Actividades por hacer</h2>
            <Accordion className="w-full bg-white rounded-lg shadow-md">
                {tasksUser.map(({ id, name, taskState, description, rating, dateLimit }) => (
                    <AccordionItem
                        key={id}
                        title={
                            <div className="flex justify-between items-center w-full p-2">
                                <span className="uppercase font-bold text-gray-800">{name}</span>
                                <span className={`text-xs sm:text-sm font-semibold ${
                                    taskState === 'COMPLETED' ? 'text-green-500' : 'text-yellow-500'
                                }`}>
                                    {taskState}
                                </span>
                            </div>
                        }
                    >
                        <div className="text-gray-600 px-2 flex flex-col gap-2">
                            <p><strong>Descripción:</strong> {description}</p>
                            <p><strong>Fecha límite:</strong> {getMoment(dateLimit).calendar() || '-'}</p>
                            {taskState === 'COMPLETED' && (
                                <p><strong>Puntuación:</strong> {rating} ★</p>
                            )}
                            {taskState !== 'COMPLETED' && (
                                <EvidenceTask employeeId={idUser} taskId={id} />
                            )}
                        </div>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}
