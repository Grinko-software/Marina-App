'use client'

const Widget = ({ title, count }) => {
    return (
        <div className="w-full border rounded-lg items-center bg-teal-400 p-2">
            <div className="flex flex-col gap-1 items-center">
                <p>{title}</p>
                <p className="text-2xl">{count}</p>
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
