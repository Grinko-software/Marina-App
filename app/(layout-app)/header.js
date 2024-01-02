'use client'
import ThemeButton from '@/components/ui/ThemeButton'
import { HomeButton } from '@/components/ui/HomeButton'
import ScaleStatus from '@/components/ui/ScaleStatus'
import React, { useState, useEffect } from 'react'
import hubScale from './sales/components/store/connectionScale'
import { usePathname } from 'next/navigation'
import { isMobileDevice } from '@/utils/agent'
import MobileNavBar from '@/components/ui/mobileNavBar'
import ShortcutButton from '@/components/ui/ShortcutButton'
import { CloseBox } from '@/components/ui/CloseBox'
import { PaymentOfMoney } from '@/components/ui/PaymentOfMoney'
import { Divider } from '@nextui-org/react'

export function Header () {
    const { isConnected } = hubScale()
    const [isMobile, setIsMobile] = useState(true)
    useEffect(() => {
        console.log('Inventory')
        if (navigator) {
            const view = isMobileDevice()
            setIsMobile(view)
        }
    }, [])
    return (
        <section className={'flex flex-row-reverse py-2 mx-[2rem] gap-x-unit-1 animation-fade-in'}>
            <div className="flex flex-row gap-4 items items-center">
                {usePathname() === '/sales' ? <ScaleStatus scaleStatus = {isConnected}/> : <></>}
                <Divider orientation="vertical" className="h-12"/>
                <div className="col-start-2 col-end-2">
                    <PaymentOfMoney />
                </div>
                <div className="col-start-2 col-end-2">
                    <CloseBox />
                </div>
                <Divider orientation="vertical" className="h-12"/>
                <div className="col-start-1 col-end-2">
                    <ThemeButton/>
                </div>
                <div className="col-start-2 col-end-2">
                    <ShortcutButton />
                </div>
                <div className="col-start-2 col-end-2">
                    <HomeButton />
                </div>
            </div>
            {isMobile ? <MobileNavBar></MobileNavBar> : <></>}

        </section>
    )
}
