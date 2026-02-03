'use client'
import Auth from '@/app/auth'
import ReportView from './components/MainReportView'
import MobileReportView from './components/MobileReportView'
import useIsMobile from '@/hooks/use-is-mobile'

export default function Reports () {
    const isMobile = useIsMobile()

    return (
        <section className="h-auto max-h-full flex">
            <Auth />
            <section className="flex-1 h-auto">
                {isMobile ? <MobileReportView /> : <ReportView />}
            </section>
        </section>
    )
}
