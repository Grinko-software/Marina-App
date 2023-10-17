/* eslint-disable no-unused-vars */
'use client'
import Auth from '@/app/auth'
import TableProducs from './card'
import { useEffect } from 'react'
import useSalesStore from '../sales/store'

export default function Inventory () {
    useEffect(() => {
        console.log('Inventory')
        useSalesStore.getState()?.disabledScanner()
        useSalesStore.getState()?.enabledRedirectSales()
    }, [])

    return (
        <section className='h-full'>
            <Auth/>
            <section className='h-full'>
                <TableProducs />
            </section>
        </section>
    )
}
