'use client'
import TableSales from '@/components/ui/TableSales'
import { useEffect } from 'react'
import useLastSalesStore from './store'

export default function Sales ({ params }) {
    const { requestData, loading, data } = useLastSalesStore()
    useEffect(() => {
        requestData()
    }, [])

    return <section>
        <section className='grid grid-cols w-full gap-3 ' >
            <TableSales data={ data } loading={loading} />
        </section>
    </section>
}
