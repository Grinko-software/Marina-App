'use client'
import { useState } from 'react'
import { DndContext } from '@dnd-kit/core'
import Draggable from './Draggable'
import Droppable from './Droppable'

export default function Board () {
    const [todoItems, setTodoItems] = useState([])
    const [inProgressItems, setInProgressItems] = useState([])
    const [readyToEvaluateItems, setReadyToEvaluateItems] = useState([])
    const [unassignedItems, setUnassignedItems] = useState([
        'draggable-1',
        'draggable-2',
        'draggable-3',
        'draggable-4',
        'draggable-5'
    ])

    const handleDragEnd = ({ active, over }) => {
        const { id } = active

        if (over) {
            const { id: overId } = over

            // Primero eliminamos el item de todas las columnas para evitar duplicados
            removeFromAllColumns(id)

            // Movemos el item a la casilla correspondiente
            if (overId === 'todo') {
                setTodoItems((prev) => [...prev, id])
            } else if (overId === 'in-progress') {
                setInProgressItems((prev) => [...prev, id])
            } else if (overId === 'ready-to-evaluate') {
                setReadyToEvaluateItems((prev) => [...prev, id])
            }
        } else {
            // Si no se suelta sobre ninguna columna, vuelve a las tarjetas sin asignar
            removeFromAllColumns(id)
            setUnassignedItems((prev) => [...prev, id])
        }
    }

    const removeFromAllColumns = (id) => {
        setTodoItems((prev) => prev.filter((item) => item !== id))
        setInProgressItems((prev) => prev.filter((item) => item !== id))
        setReadyToEvaluateItems((prev) => prev.filter((item) => item !== id))
        setUnassignedItems((prev) => prev.filter((item) => item !== id))
    }

    const renderItems = (items) => {
        return items.map((id) => (
            <Draggable
                key={id}
                id={id}
                taskTitle={`Tarea ${id}`}
                taskPriority="Prioridad: Media"
                taskDescription="Descripción de la tarea"
                imageUrl="https://empleosurgentes.com/wp-content/uploads/2021/05/empleo-de-limpieza-personal-de-limpieza-cleaning-staff-trabajador-de-limpieza-cleaning-employee-cleaning-operators-industrial-cleaning-auxiliar-de-bodega.jpg"
            />
        ))
    }
    return (
        <DndContext onDragEnd={handleDragEnd}>
            <section className='flex flex-row text-white rounded-xl p-4'>
                {/* Zona fija de tarjetas sin asignar */}
                <div className="bg-gray-50 border border-primary-200 rounded-lg p-4 w-64 min-h-[42rem] flex flex-col space-y-2 z-auto">
                    <p className="text-gray-500">Tarjetas sin asignar</p>
                    {renderItems(unassignedItems)}
                </div>

                {/* Droppable column for "Por hacer" */}
                <Droppable id="todo">
                    <div className="bg-gray-50 border border-primary-200 rounded-lg p-4 w-64 min-h-[42rem] max-h-[42rem] overflow-y-scroll flex flex-col space-y-2">
                        <p className="text-gray-500">Por hacer</p>
                        {renderItems(todoItems)}
                    </div>
                </Droppable>

                {/* Droppable column for "Realizando" */}
                <Droppable id="in-progress">
                    <div className="bg-gray-50 border border-primary-200 rounded-lg p-4 w-64 min-h-[42rem] max-h-[42rem] overflow-y-scroll flex flex-col space-y-2">
                        <p className="text-gray-500">Realizando</p>
                        {renderItems(inProgressItems)}
                    </div>
                </Droppable>

                {/* Droppable column for "Lista para evaluar" */}
                <Droppable id="ready-to-evaluate">
                    <div className="bg-orange-50 border border-primary-200 rounded-lg p-4 w-64 min-h-[42rem] max-h-[42rem] overflow-y-scroll flex flex-col space-y-2">
                        <p className="text-gray-500">Lista para evaluar</p>
                        {renderItems(readyToEvaluateItems)}
                    </div>
                </Droppable>
            </section>
        </DndContext>
    )
}
