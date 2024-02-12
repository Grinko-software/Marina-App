'use client'
import { useEffect, useState } from 'react'
import useAccountingEventsStore from './store'
import TableAccounting from './TableAccounting'

export default function Sales () {
    const { requestData, data, loading, totalpage } = useAccountingEventsStore()
    const [limitPage, setLimitPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    useEffect(() => {
        requestData(limitPage, currentPage)
    }, [currentPage])
    /* useEffect(() => { console.debug(loading) }, [loading]) */

    return <section className='w-full'>
        <section className='grid grid-cols w-full gap-3' >
            <TableAccounting
                data={ data }
                loading={loading}
                totalpage={totalpage}
                setCurrentPage={setCurrentPage}
                setLimitPage={setLimitPage}
            />
        </section>
    </section>
}
