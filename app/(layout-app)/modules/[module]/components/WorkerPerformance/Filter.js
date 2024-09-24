'use client'

export default function Filter () {
    return <section className='w-full flex'>
        <div className="w-full flex flex-row justify-between">
            <div className="flex flex-row gap-5">
                <div>
                    Selector usuarios
                </div>
                <div>
                    Selector tipo
                </div>
                <div>
                    Selector estado
                </div>
            </div>
            <div className="flex flex-row gap-5">
                <div>
                    Buscar
                </div>
                <div>
                    Crear
                </div>
            </div>
        </div>

    </section>
}
