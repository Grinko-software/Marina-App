'use client'
import { useEffect } from 'react'
import useAccountingEventsStore from './store'
import TableAccounting from './TableAccounting'

export default function Sales () {
    const { requestData, data, loading } = useAccountingEventsStore()

    useEffect(() => {
        requestData()
    }, [])
    /* useEffect(() => { console.debug(loading) }, [loading]) */

    return <section className='w-full'>
        <section className='grid grid-cols w-full gap-3' >
            <TableAccounting data={ data } loading={loading} />
        </section>
    </section>
}
