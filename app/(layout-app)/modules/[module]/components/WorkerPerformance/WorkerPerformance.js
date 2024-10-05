'use client'
import { useEffect, useState } from 'react'
import Filter from './Filter'
import Widgets from './Widgets'
import { getDataModelTaskStates, getDataModelTaskTypes, getDataModelUsers, requestTaskStatesList, requestTaskTypesList, requestUserList } from './service'

export default function WorkerPerformance () {
    // const { requestData } = useAccountingEventsStore()
    const [users, setUsers] = useState([])
    const [taskTypes, setTaskTypes] = useState([])
    const [taskStates, setTaskStates] = useState([])

    useEffect(() => {
        requestUserList().then((data) => {
            if (data) {
                const items = getDataModelUsers({ data: data?.data })
                setUsers(items || [])
            }
        })

        requestTaskTypesList().then((data) => {
            if (data) {
                const items = getDataModelTaskTypes({ data: data?.data })
                setTaskTypes(items || [])
            }
        })

        requestTaskStatesList().then((data) => {
            if (data) {
                const items = getDataModelTaskStates({ data: data?.data })
                setTaskStates(items || [])
            }
        })
    }, [])
    /* useEffect(() => { console.debug(loading) }, [loading]) */

    return <section className='w-full h-full'>
        <section className='flex w-full h-full' >
            <div className='w-full h-full flex flex-col gap-3'>
                <Filter users={users} taskTypes={taskTypes} taskStates={taskStates}/>
                <Widgets/>
                <div className='border border-green-300 flex flex-1 items-center'>
                    <p className='text-center m-auto'>
                        CARDS
                    </p>
                </div>
            </div>
        </section>
    </section>
}
