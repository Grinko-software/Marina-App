'use client'
import Auth from '@/app/auth'
import ReportView from './components/MainReportView'

export default function Reports () {
    return (
        <section className='h-full'>
            <Auth/>
            <section className='h-full'>
                <ReportView></ReportView>
            </section>
        </section>
    )
}
