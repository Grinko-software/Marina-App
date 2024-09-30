'use client';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useState, useEffect } from 'react';
import CardTask from './Card';

export default function Draggable({ id, taskTitle, taskPriority, taskDescription, imageAlt, imageUrl, children }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
  });
  
  const [style, setStyle] = useState({
    transform: 'translate3d(0, 0, 0)',
  });

  useEffect(() => {
    setStyle({
      transform: CSS.Translate.toString(transform),
    });
  }, [transform]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`${
        isDragging ? 'absolute z-50' : 'relative'
      }`}
    >
      <button className="w-full h-full">
        <CardTask
          taskTitle={taskTitle}
          taskPriority={taskPriority}
          taskDescription={taskDescription}
          imageAlt={imageAlt}
          imageUrl={imageUrl}
        />
        {children}
      </button>
    </div>
  );
}