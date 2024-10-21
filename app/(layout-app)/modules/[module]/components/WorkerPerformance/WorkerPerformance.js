'use client'
import { useEffect, useState } from 'react'
import Filter from './Filter'
import Widgets from './Widgets'
import { getDataModelTaskDifficulties, getDataModelTaskStates, getDataModelTaskTypes, getDataModelUsers, requestTaskDifficultList, requestTaskStatesList, requestTaskTypesList, requestUserList } from './service'
import Board from './components/Board'
import useFilterStore from './store'

export default function WorkerPerformance () {
    // const { requestData } = useAccountingEventsStore()
    const [users, setUsers] = useState([])
    const [taskTypes, setTaskTypes] = useState([])
    const [taskStates, setTaskStates] = useState([])
    const [taskDifficulties, setTaskDifficulties] = useState([])
    const { data, loading } = useFilterStore()

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

        requestTaskDifficultList().then((data) => {
            if (data) {
                const items = getDataModelTaskDifficulties({ data: data?.data })
                setTaskDifficulties(items || [])
            }
        })
    }, [])

    return <section className='w-full h-full'>
        <section className='flex w-full h-full' >
            <div className='w-full h-full flex flex-col gap-3'>
                <Filter users={users} taskTypes={taskTypes} taskStates={taskStates} taskDifficulties={taskDifficulties}/>
                <Widgets loading={loading} data={data}/>
                <div className='border border-green-300 flex flex-1 items-center'>
                    <p className='text-center m-auto'>
                        <Board></Board>
                    </p>
                </div>
            </div>
        </section>
    </section>
}
