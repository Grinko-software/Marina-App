'use client'
import Auth from '@/app/auth'
import ReportView from './components/MainReportView'

export default function Reports () {
    return (
        <section className="h-auto max-h-full flex">
            <Auth />
            <section className="flex-1 h-auto">
                <ReportView></ReportView>
            </section>
        </section>
    )
}
