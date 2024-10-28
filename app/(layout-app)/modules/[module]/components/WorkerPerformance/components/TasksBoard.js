'use client'
import { useEffect, useState } from 'react'
import CardTask from './Card'
import TaskDetail from './TaskDetail'
import { useDisclosure } from '@nextui-org/react'

export default function TasksBoard ({
    todoTasks = [],
    inProgressTasks = [],
    readyToEvaluateTasks = [],
    unassignedTasks = []
}) {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [targetTaskDetail, setTargetTaskDetail] = useState()

    const [itemsData, setItemsData] = useState([])

    const [todoItems, setTodoItems] = useState([])
    const [inProgressItems, setInProgressItems] = useState([])
    const [readyToEvaluateItems, setReadyToEvaluateItems] = useState([])
    const [unassignedItems, setUnassignedItems] = useState([])

    useEffect(() => {
        setTodoItems(todoTasks)
        setInProgressItems(inProgressTasks)
        setReadyToEvaluateItems(readyToEvaluateTasks)
        setUnassignedItems(unassignedTasks)
    }, [todoTasks, inProgressTasks, readyToEvaluateTasks, unassignedTasks])

    useEffect(() => {
        setItemsData(
            [
                { title: 'Tarjetas sin asignar', items: unassignedItems, droppable: false },
                { title: 'Por hacer', items: todoItems, droppable: true },
                { title: 'Realizando', items: inProgressItems, droppable: true },
                { title: 'Lista para evaluar', items: readyToEvaluateItems, droppable: true }
            ]
        )
    }, [unassignedItems, todoItems, inProgressItems, readyToEvaluateItems])

    useEffect(() => {
        if (targetTaskDetail) {
            onOpen()
        } else {
            onClose()
        }
    }, [targetTaskDetail])

    const openTaskDetail = (task) => {
        setTargetTaskDetail(task)
    }

    const renderItems = (items) => {
        return items.map((item) => {
            return (
                <CardTask
                    key={item.id}
                    id={item.id}
                    title={`${item.name}`}
                    dateLimit={item.dateLimit}
                    description={`Tarea ${item.id}: ${item.description}`}
                    user={item.user?.name}
                    userId={item.user?.id}
                    openDetail={() => openTaskDetail(item)}

                    imageUrl="https://empleosurgentes.com/wp-content/uploads/2021/05/empleo-de-limpieza-personal-de-limpieza-cleaning-staff-trabajador-de-limpieza-cleaning-employee-cleaning-operators-industrial-cleaning-auxiliar-de-bodega.jpg"
                />
            )
        })
    }

    return (
        <section className='flex flex-1 flex-row justify-around p-4 rounded-xl bg-gray-100 dark:bg-secondary-500 text-black dark:text-white m-auto gap-2'>
            {itemsData.map((item) => {
                return (
                    <div key={item.title} className="bg-gray-50 dark:bg-secondary-500 border border-gray-300 dark:border-gray-700 rounded-lg p-4 flex-1 min-h-[42rem] max-h-[42rem] overflow-y-auto flex flex-col space-y-2">
                        <p className="text-gray-500 dark:text-white">{item.title}</p>
                        {renderItems(item.items)}
                    </div>
                )
            })}
            <TaskDetail
                data={targetTaskDetail}
                isOpen={isOpen}
                onClose={() => {
                    setTargetTaskDetail(null)
                }}
            />
        </section>
    )
}
