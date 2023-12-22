'use client'
import { useEffect } from 'react'

const SupplierItem = ({ supplierId, name, rut, companyName, companyRut }) => {
    return <div className='w-full border'>
        <div>{supplierId}</div>
        <div>{name}</div>
        <div>{rut}</div>
        <div>{companyName}</div>
        <div>{companyRut}</div>
    </div>
}

export default function SupplierInfo ({ data, loading, setTarget }) {
    useEffect(() => {
    }, [data])

    return <section className='w-full'>
        <section className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-1 w-full gap-3' >
            {data?.map((item) => {
                return <div key={item.ID}>
                    <SupplierItem supplierId={item.ID}
                        name={item.name}
                        rut={item.rut}
                        companyName={item.company_name}
                        companyRut={item.company_rut}
                    />
                </div>
            })}
        </section>
    </section>
}
