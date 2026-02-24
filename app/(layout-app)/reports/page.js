'use client'
import Auth from '@/app/auth'
import ReportView from './components/MainReportView'
import MobileReportView from './components/MobileReportView'
import useIsMobile from '@/hooks/use-is-mobile'
import { Skeleton } from '@nextui-org/react'

export default function Reports () {
    const isMobile = useIsMobile()

    // Show loading skeleton while detecting device type
    if (isMobile === null) {
        return (
            <section className="w-full h-full min-h-0 flex overflow-hidden">
                <Auth />
                <section className="w-full flex-1 h-full min-h-0 overflow-hidden p-4">
                    <Skeleton className="h-20 w-full rounded-lg mb-4" />
                    <Skeleton className="h-40 w-full rounded-lg mb-4" />
                    <Skeleton className="h-40 w-full rounded-lg" />
                </section>
            </section>
        )
    }

    return (
        <section className="w-full h-full min-h-0 flex overflow-hidden">
            <Auth />
            <section className="w-full flex-1 h-full min-h-0 overflow-hidden">
                {isMobile ? <MobileReportView /> : <ReportView />}
            </section>
        </section>
    )
}
