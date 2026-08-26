/* eslint-disable no-unused-vars */
'use client'
import { useEffect, useState } from 'react'
import useLastSalesStore from './store'
import SaleDetail from './SaleDetail'
import TableSales from './TableSales'

export default function Sales ({ params }) {
    const { requestData, loading, data, totalpage } = useLastSalesStore()
    const [target, setTarget] = useState(null)
    const [limitPage, setLimitPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const [openModalToPrint, setOpenModalToPrint] = useState(false)
    useEffect(() => {
        requestData(limitPage, currentPage)
    }, [currentPage])

    return (
        <section className="w-full h-full min-h-0 flex flex-col">
            <section className="flex flex-col w-full gap-3 h-full min-h-0">
                <div className="sm:hidden">
                    <SaleDetail
                        openModalToPrint={openModalToPrint}
                        setOpenModalToPrint={setOpenModalToPrint}
                        target={target}
                        setTarget={setTarget}
                    />
                </div>
                <TableSales
                    data={data}
                    loading={loading}
                    setTarget={setTarget}
                    totalpage={totalpage}
                    setCurrentPage={setCurrentPage}
                    setLimitPage={setLimitPage}
                    setOpenModalToPrint={setOpenModalToPrint}
                />
            </section>
        </section>
    )
}
