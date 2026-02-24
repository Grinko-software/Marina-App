'use client'
import { useEffect, useState } from 'react'
import useAccountingEventsStore from './store'
import TableAccounting from './TableAccounting'
import MobileTableAccounting from './MobileTableAccounting'
import useIsMobile from '@/hooks/use-is-mobile'
import { Skeleton } from '@nextui-org/react'

export default function Sales () {
    const { requestData, data, loading, totalpage } = useAccountingEventsStore()
    const [limitPage, setLimitPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const isMobile = useIsMobile()

    useEffect(() => {
        requestData(limitPage, currentPage)
    }, [currentPage])

    // Show loading skeleton while detecting device type
    if (isMobile === null) {
        return (
            <section className="w-full h-full min-h-0 flex overflow-hidden">
                <section className="w-full flex-1 h-full min-h-0 overflow-hidden p-4">
                    <Skeleton className="h-12 w-full rounded-lg mb-3" />
                    <Skeleton className="h-64 w-full rounded-lg" />
                </section>
            </section>
        )
    }

    return (
        <section className="w-full h-full min-h-0 flex overflow-hidden">
            <section className="w-full flex-1 h-full min-h-0 overflow-hidden grid grid-cols gap-3">
                {isMobile
                    ? (
                        <section className="w-full h-full min-h-0 overflow-y-auto overflow-x-hidden pb-[calc(env(safe-area-inset-bottom)+2.5rem)]">
                            <MobileTableAccounting
                                data={data}
                                loading={loading}
                                totalpage={totalpage}
                                setCurrentPage={setCurrentPage}
                                currentPage={currentPage}
                            />
                        </section>
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
