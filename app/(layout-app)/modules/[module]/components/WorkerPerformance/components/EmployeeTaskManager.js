/* eslint-disable no-unused-vars */
'use client'
import { useEffect, useState } from 'react'
import useLastSalesStore from './store'
import Board from './Board'

export default function EmployeeTaskManager ({ params }) {
    const { requestData, loading, data, totalpage } = useLastSalesStore()
    const [target, setTarget] = useState(null)
    const [limitPage, setLimitPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        requestData(limitPage, currentPage)
    }, [currentPage])

    return <section className='w-full'>
        <section className='grid grid-cols w-full gap-3' >
            <Board></Board>
        </section>
    </section>
}
