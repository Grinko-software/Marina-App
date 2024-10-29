'use client'

const Widget = ({ title, count }) => {
    return (
        <div className="w-full border rounded-lg shadow-md bg-white p-4 transition-transform transform hover:scale-105">
            <div className="flex flex-col items-center text-center">
                <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
                <p className="text-3xl font-bold text-teal-600">{count}</p>
            </div>
        </div>
    )
}

export default function Widgets ({
    countTotalTasks = 0,
    countTodoTasks = 0,
    countInProgressTasks = 0,
    countReadyToEvaluateTasks = 0,
    countUnassignedTasks = 0
}) {
    return <section className='w-full flex'>
        <div className="flex flex-row w-full gap-5 justify-between">
            <Widget title='Total tareas' count={countTotalTasks}/>
            <Widget title='Tareas por hacer' count={countTodoTasks}/>
            <Widget title='Tareas en curso' count={countInProgressTasks}/>
            <Widget title='Tareas listas para evaluar' count={countReadyToEvaluateTasks}/>
            <Widget title='Tareas sin asignar' count={countUnassignedTasks}/>
        </div>
    </section>
}
