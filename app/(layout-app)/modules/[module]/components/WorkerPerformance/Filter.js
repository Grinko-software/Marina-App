'use client'

import { Autocomplete, AutocompleteItem, Button } from '@nextui-org/react'
import { useEffect, useState } from 'react'

export default function Filter ({ users, taskTypes, taskStates }) {
    const [selectionTaskType, setSelectionTaskType] = useState(null)
    const [selectionTaskState, setSelectionTaskState] = useState(null)
    const [selectionUser, setSelectionUser] = useState(null)

    useEffect(() => {
        //
    }, [selectionTaskType])

    return <section className='w-full flex'>
        <div className="w-full flex flex-row justify-between">
            <div className="flex flex-row gap-5">
                <div>
                    <Autocomplete
                        label="Empleados"
                        placeholder="Busca un empleado"
                        defaultItems={users}
                        selectedKey={selectionUser}
                        onSelectionChange={(value) => setSelectionUser(value)}
                        allowsEmptyCollection={false}
                        isClearable={false}
                        size='sm'
                        className="max-w-xs"
                    >
                        {(item) => <AutocompleteItem key={item.value}>
                            {`${item.label}`}
                        </AutocompleteItem>}
                    </Autocomplete>
                </div>
                <div>
                    <Autocomplete
                        label="Tipo de tarea"
                        placeholder="Busca un tipo"
                        defaultItems={taskTypes}
                        selectedKey={selectionTaskType}
                        onSelectionChange={(value) => setSelectionTaskType(value)}
                        allowsEmptyCollection={false}
                        isClearable={false}
                        size='sm'
                        className="max-w-xs"
                    >
                        {(item) => <AutocompleteItem key={item.value}>
                            {`${item.label}`}
                        </AutocompleteItem>}
                    </Autocomplete>
                </div>
                <div>
                    <Autocomplete
                        label="Estado de tarea"
                        placeholder="Busca un estado"
                        defaultItems={taskStates}
                        selectedKey={selectionTaskState}
                        onSelectionChange={(value) => setSelectionTaskState(value)}
                        allowsEmptyCollection={false}
                        isClearable={false}
                        size='sm'
                        className="max-w-xl"
                    >
                        {(item) => <AutocompleteItem key={item.value}>
                            {`${item.label}`}
                        </AutocompleteItem>}
                    </Autocomplete>
                </div>
            </div>
            <div className="flex flex-row gap-5">
                <div>
                    <Button className='mr-auto h-full' onClick={() => {}}>
                        {'Buscar'}
                    </Button>
                </div>
                <div>
                    <Button className='mr-auto h-full' onClick={() => {}}>
                        {'Crear'}
                    </Button>
                </div>
            </div>
        </div>

    </section>
}
