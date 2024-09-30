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

export default function Widgets () {
    return <section className='w-full flex'>
        <div className="flex flex-row w-full gap-5 justify-between">
            <Widget title='Total tareas' count={10}/>
            <Widget title='Tareas completada' count={5}/>
            <Widget title='Tareas en curso' count={2}/>
            <Widget title='Tareas por hacer' count={3}/>
            <Widget title='Tareas sin asignar' count={0}/>
        </div>
    </section>
}
