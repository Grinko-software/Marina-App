/* eslint-disable no-unused-vars */
'use client'

import { Autocomplete, AutocompleteItem, Button, DatePicker } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import CreateTask from '../../NewTask/newTask'
import useFilterStore from '../../store'
import PayButton from '../../PayButton/PayButton'
import { getLocalTimeZone, today } from '@internationalized/date'
import FilterMobilePayment from './FilterMobilePayment'
import ContentFilterPayment from './components/ContentFilterPayment'
export default function FilterPayment ({ isMobile, isAdmin = true, users, taskTypes, taskStates, taskDifficulties, filterData, setFilterData }) {
    const [selectionTaskType, setSelectionTaskType] = useState(null)
    const [selectionTaskState, setSelectionTaskState] = useState(null)
    const [selectionUser, setSelectionUser] = useState(null)
    const { loading, requestData } = useFilterStore()

    useEffect(() => {
        //
    }, [selectionTaskType])

    useEffect(() => {
        requestTaskList()
    }, [])

    useEffect(() => {
        setFilterData({
            taskTypeId: selectionTaskType || undefined,
            taskStateId: selectionTaskState || undefined,
            userId: selectionUser || undefined
        })
    }, [selectionTaskType, selectionTaskState, selectionUser])

    const requestTaskList = () => {
        return requestData(filterData)
    }

    return isMobile
        ? <div className='bg-primary-200 dark:bg-secondary-500 h-[7rem] fixed top-[5rem] ml-[-1rem] z-50 flex flex-col justify-center items-center w-full'>
            <div className='w-full flex flex-col px-[1rem] gap-3'>
                <PayButton/>
                <FilterMobilePayment
                    users={users}
                    filterData={filterData}
                    setFilterData={setFilterData}
                />
            </div>
        </div>
        : <div className='w-full flex'>
            <ContentFilterPayment
                users={users}
                filterData={filterData}
                setFilterData={setFilterData}
            />
        </div>
}
