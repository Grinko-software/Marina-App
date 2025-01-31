'use client'

import { Card, CardBody } from '@nextui-org/react'

const Widget = ({ title, count }) => {
    return (
        <Card className="w-full rounded-lg shadow-md p-4 ">
            <CardBody>
                <div className="flex flex-col items-center text-center">
                    <h4 className="text-lg font-semibold">{title}</h4>
                    <p className="text-2xl font-bold text-teal-600">{count}</p>
                </div>
            </CardBody>
        </Card>
    )
}

export default function Widgets ({
    countTotalTasks = 0,
    countTodoTasks = 0,
    countInProgressTasks = 0,
    countReadyToEvaluateTasks = 0,
    countUnassignedTasks = 0
}) {
    return (
        <section className="w-full flex">
            <div className="flex flex-row w-full gap-2 justify-between">
                <Widget title="Total tareas" count={countTotalTasks} />
                <Widget title="Tareas por hacer" count={countTodoTasks} />
                <Widget title="Tareas en curso" count={countInProgressTasks} />
                <Widget
                    title="Tareas listas para evaluar"
                    count={countReadyToEvaluateTasks}
                />
                <Widget title="Tareas sin asignar" count={countUnassignedTasks} />
            </div>
        </section>
    )
}
