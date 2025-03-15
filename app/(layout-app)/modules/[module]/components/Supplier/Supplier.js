'use client'
import { useEffect, useState } from 'react'
import useSupplierStore from './store'
import SupplierAssociation from './SupplierAssociation'
import SupplierInfo from './SupplierInfo'
import useInventoryStore from '@/app/(layout-app)/inventory/store'
import CreateSupplier from './NewSupplier/newSupplier'

export default function Supplier ({ params }) {
    const { requestData, loading, data } = useSupplierStore()
    const { listInventory, getListInventory } = useInventoryStore()
    const [target, setTarget] = useState(null)

    useEffect(() => {
        requestData()
        getListInventory()
    }, [])

    return (
        <section className="w-full">
            <CreateSupplier />
            <section className="flex flex-row">
                <SupplierInfo data={data} loading={loading} setTarget={setTarget} totalPages={data?.length || 0} />
                <SupplierAssociation
                    target={target}
                    setTarget={setTarget}
                    products={listInventory}
                    handleRefresh={requestData}
                />
            </section>
        </section>
    )
}
