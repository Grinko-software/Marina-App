/* eslint-disable no-unused-vars */
'use client'
import Auth from '@/app/auth'
import TableProducs from './card'
import MobileTableProducs from './mobileCard'
import { useEffect, useState } from 'react'
import { isMobileDevice } from '@/utils/agent'
import useScannerStore from '@/stores/scanner'

export default function Inventory () {
    const [isMobile, setIsMobile] = useState(true)
    useEffect(() => {
        if (navigator) {
            const view = isMobileDevice()
            setIsMobile(view)
        }
        useScannerStore.getState()?.disabledScanner()
        useScannerStore.getState()?.enabledRedirectSales()
    }, [])

    return (
        <section>
            <Auth />
            {!isMobile ? <TableProducs /> : <MobileTableProducs />}
        </section>
    )
}
