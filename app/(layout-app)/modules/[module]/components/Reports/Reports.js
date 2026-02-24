'use client'
import ReportView from '@/app/(layout-app)/reports/components/MainReportView'
import MobileReportView from '@/app/(layout-app)/reports/components/MobileReportView'
import useIsMobile from '@/hooks/use-is-mobile'
import { Skeleton } from '@nextui-org/react'

/**
 * Wrapper component for Reports that handles mobile/desktop view switching
 * Used in /modules/reports route
 */
export default function Reports () {
    const isMobile = useIsMobile()

    // Show loading skeleton while detecting device type
    if (isMobile === null) {
        return (
            <section className="w-full h-full min-h-0 overflow-hidden p-4">
                <Skeleton className="h-20 w-full rounded-lg mb-4" />
                <Skeleton className="h-40 w-full rounded-lg mb-4" />
                <Skeleton className="h-40 w-full rounded-lg" />
            </section>
        )
    }

    return (
        <section className="w-full h-full min-h-0 overflow-hidden">
            {isMobile ? <MobileReportView /> : <ReportView />}
        </section>
    )
}
