'use client'
import { useEffect, useState } from 'react'
import CardTask from './Card'
import TaskDetail from './TaskDetail'
import { useDisclosure } from '@nextui-org/react'

export default function TasksBoard ({
    todoTasks = [],
    inProgressTasks = [],
    readyToEvaluateTasks = [],
    unassignedTasks = [],
    completedTasks = [],
    paidTasks = [],
    filterData = {}
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
        const dataItems = [
            { title: 'Tarjetas sin asignar', items: unassignedItems },
            { title: 'TODO', items: todoItems },
            { title: 'Realizando', items: inProgressItems },
            { title: 'Lista para evaluar', items: readyToEvaluateItems }
        ]
        if (completedTasks?.length) {
            dataItems.push({ title: 'Completadas', items: completedTasks })
        }
        if (paidTasks?.length) {
            dataItems.push({ title: 'Pagadas', items: paidTasks })
        }
        setItemsData(dataItems)
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
                    description={item.description}
                    user={item.user?.name}
                    userId={item.user?.id}
                    openDetail={() => openTaskDetail(item)}
                    imageUrl="https://empleosurgentes.com/wp-content/uploads/2021/05/empleo-de-limpieza-personal-de-limpieza-cleaning-staff-trabajador-de-limpieza-cleaning-employee-cleaning-operators-industrial-cleaning-auxiliar-de-bodega.jpg"
                />
            )
        })
    }

    return (
        <section className="flex flex-1 flex-grow w-full  h-[calc(100vh-27rem)] flex-row justify-around p-4 rounded-xl bg-gray-100 dark:bg-secondary-500 text-black dark:text-white gap-2 ">
            {itemsData.map((item) => {
                return (
                    <div
                        key={item.title}
                        className="bg-grey-50 dark:bg-secondary-500 border border-gray-400 dark:border-gray-700 rounded-lg p-4 flex-grow  w-full flex flex-col space-y-2 h-full"
                    >
                        {/* Título fijo (no se moverá con el scroll) */}
                        <p className="text-gray-500 dark:text-white flex-shrink-0">{`${
                            item.title
                        } (${item?.items?.length || 0})`}</p>

                        {/* Contenido con scroll */}
                        <div className="overflow-y-auto flex-grow space-y-2 scroll-smooth snap-y snap-mandatory">
                            {renderItems(item.items)}
                        </div>
                    </div>
                )
            })}

            <TaskDetail
                data={targetTaskDetail}
                isOpen={isOpen}
                filterData={filterData}
                onClose={() => {
                    setTargetTaskDetail(null)
                }}
            />
        </section>
    )
}
/*
flex flex-grow w-full flex-row justify-around p-4 rounded-xl bg-gray-100 dark:bg-secondary-500 text-black dark:text-white gap-2 overflow-hidden
*/
