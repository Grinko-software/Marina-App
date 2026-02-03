'use client'
import { useEffect, useState } from 'react'
import useAccountingEventsStore from './store'
import TableAccounting from './TableAccounting'
import MobileTableAccounting from './MobileTableAccounting'
import useIsMobile from '@/hooks/use-is-mobile'

export default function Sales () {
    const { requestData, data, loading, totalpage } = useAccountingEventsStore()
    const [limitPage, setLimitPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const isMobile = useIsMobile()

    useEffect(() => {
        requestData(limitPage, currentPage)
    }, [currentPage])

    return (
        <section className="w-full">
            <section className="grid grid-cols w-full gap-3">
                {isMobile
                    ? (
                        <MobileTableAccounting
                            data={data}
                            loading={loading}
                            totalpage={totalpage}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                        />
                    )
                    : (
                        <TableAccounting
                            data={data}
                            loading={loading}
                            totalpage={totalpage}
                            setCurrentPage={setCurrentPage}
                            setLimitPage={setLimitPage}
                        />
                    )}
            </section>
        </section>
    )
}
