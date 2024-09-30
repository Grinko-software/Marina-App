import React, { useEffect, useState } from 'react'
import { useDroppable } from '@dnd-kit/core'

export default function Droppable ({ id, children }) {
    const { isOver, setNodeRef } = useDroppable({
        id
    })
    const [style, setStyle] = useState({ opacity: 1 })

    // Hook para actualizar el estilo cuando cambia el estado `isOver`
    useEffect(() => {
        setStyle({
            opacity: isOver ? 1 : 1
        })
    }, [isOver])

    return (
        <div ref={setNodeRef} style={style} >
            {children}
        </div>
    )
}
