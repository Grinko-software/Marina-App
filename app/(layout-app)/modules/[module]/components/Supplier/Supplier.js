'use client'
import { useEffect, useState } from 'react'
import useLastSalesStore from './store'
import SupplierAssociation from './SupplierAssociation'
import SupplierInfo from './SupplierInfo'

export default function Supplier ({ params }) {
    const { requestData, loading, data } = useLastSalesStore()
    const [target, setTarget] = useState(null)

    useEffect(() => {
        requestData()
    }, [])

    return <section className='w-full'>
        <section className='flex flex-row' >
            <SupplierInfo data={data} loading={loading} setTarget={setTarget}/>
            <SupplierAssociation target={target} setTarget={setTarget}/>
        </section>
    </section>
}
