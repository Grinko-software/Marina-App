'use client'
import React, { useState, useEffect } from 'react'
import { isMobileDevice } from '@/utils/agent'
import MobileNavBar from '@/components/ui/MobileNavBar'
import UserAvatar from '@/components/ui/UserAvatar'

export function Header () {
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
            <div className="flex flex-row gap-4 items items-center justify-between">
                <UserAvatar />
            </div>
            {isMobile ? <MobileNavBar></MobileNavBar> : <></>}
        </section>
    )
}
