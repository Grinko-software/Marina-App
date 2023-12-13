'use client'
import { useEffect, useState } from 'react'
import useLastSalesStore from './store'
import SaleDetail from './SaleDetail'
import TableSales from './TableSales'

export default function Sales ({ params }) {
    const { requestData, loading, data } = useLastSalesStore()
    const [target, setTarget] = useState(null)

    useEffect(() => {
        requestData()
    }, [])

    return <section className='w-full'>
        <section className='grid grid-cols w-full gap-3' >
            <TableSales data={ data } loading={loading} setTarget={setTarget}/>
            <SaleDetail target={target} setTarget={setTarget}/>
        </section>
    </section>
}
