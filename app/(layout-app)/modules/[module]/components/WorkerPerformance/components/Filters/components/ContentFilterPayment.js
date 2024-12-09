/* eslint-disable no-unused-vars */
'use client'

import { Autocomplete, AutocompleteItem, Button, DatePicker } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { getLocalTimeZone, today } from '@internationalized/date'
import PayButton from '../../../PayButton/PayButton'
import useFilterStore from '../../../store'
export default function ContentFilterPayment ({ users, filterData, setFilterData }) {
    const [selectionUser, setSelectionUser] = useState(null)
    const { loading, requestData } = useFilterStore()

    useEffect(() => {
        requestTaskList()
    }, [])

    useEffect(() => {
        setFilterData({
            userId: selectionUser || undefined
        })
    }, [selectionUser])

    const requestTaskList = () => {
        return requestData(filterData)
    }

    return <div className='w-full flex'>
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
                        isClearable={true}
                        size='sm'
                        className="max-w-xs"
                    >
                        {(item) => <AutocompleteItem key={item.value}>
                            {`${item.label}`}
                        </AutocompleteItem>}
                    </Autocomplete>
                </div>
                {/* Calendar */}
                <div>
                    <div className="w-full max-w-xl flex flex-row ">
                        <div className="w-full flex flex-col gap-1">
                            <DatePicker
                                label="Desde"
                                // minValue={today(getLocalTimeZone())}
                                defaultValue={today(getLocalTimeZone()).subtract({ days: 1 })}
                            />
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <DatePicker
                                label="Hasta"
                                // maxValue={today(getLocalTimeZone())}
                                defaultValue={today(getLocalTimeZone()).add({ days: 1 })}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row gap-5">
                <Button onClick={requestTaskList} isLoading={loading}>
                    {'Buscar'}
                </Button>
                <PayButton />
            </div>
        </div>
    </div>
}
