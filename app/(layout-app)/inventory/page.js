/* eslint-disable no-unused-vars */
'use client'
import Auth from '@/app/auth'
import TableProducs from './card'
import MobileTableProducs from './mobileCard'
import { useEffect, useState } from 'react'
import useSalesStore from '../sales/store'
import { isMobileDevice } from '@/utils/agent'

export default function Inventory () {
    const [isMobile, setIsMobile] = useState(true)
    useEffect(() => {
        if (navigator) {
            const view = isMobileDevice()
            setIsMobile(view)
        }
        useSalesStore.getState()?.disabledScanner()
        useSalesStore.getState()?.enabledRedirectSales()
    }, [])

    return (
        <section >
            <Auth/>
            {!isMobile
                ? <TableProducs />
                : <MobileTableProducs/>
            }
        </section>
    )
}
