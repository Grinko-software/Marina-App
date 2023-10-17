'use client'
import Auth from '@/app/auth'
import SalesMenu from './sales'
import { useEffect } from 'react'
import useSalesStore from './store'
import { isMobileDevice } from '@/utils/agent'
import { useRouter } from 'next/navigation'

export default function Sales () {
    const router = useRouter()

    useEffect(() => {
        if (navigator) {
            const isMobile = isMobileDevice()
            if (isMobile) {
                router.push('/home')
            }
        }
    }, [])

    useEffect(() => {
        console.log('Sales')
        useSalesStore.getState()?.enabledScanner()
    }, [])

    return (
        <section className='h-full'>
            <Auth/>
            <section className='h-full'>
                <SalesMenu/>
            </section>
        </section>
    )
}
