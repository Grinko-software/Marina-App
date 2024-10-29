'use client'
import { useEffect, useState } from 'react'
import { getTasksByEmployee, parseTaskByEmployee } from './service'
import EvidenceTask from './components/EvidenceTask/evidenceTask'

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
        <div className="flex flex-col items-center p-4 sm:p-6 w-full lg:max-w-[900px] mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">Actividades por hacer</h2>
            <ul className="w-full bg-white rounded-lg shadow-md p-4 space-y-3">
                {tasksUser.map((task, index) => (
                    <li
                        key={task.id}
                        className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 space-y-2 sm:space-y-0 sm:space-x-3 w-full ${
                            tasksUser.length - 1 === index ? '' : 'border-b border-gray-200'
                        }`}
                    >
                        <label className="flex-1 text-gray-800 capitalize font-bold text-sm sm:text-base">
                            {task.name}
                        </label>
                        <span
                            className={`text-xs sm:text-sm font-semibold ${
                                task.taskState === 'COMPLETED' ? 'text-green-500' : 'text-yellow-500'
                            }`}
                        >
                            {task.taskState}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-black flex-1">
                            {task.description}
                        </span>
                        <div className="w-full sm:w-auto">
                            <EvidenceTask employeeId={idUser} taskId={task.id} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
