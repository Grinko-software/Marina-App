'use client'
import React, { useState, useEffect } from 'react'
import { isMobileDevice } from '@/utils/agent'
import MobileNavBar from '@/components/ui/mobileNavBar'
import SettingsNav from '@/components/SettingsNav/SettingsNav'

export function Header () {
    const [isMobile, setIsMobile] = useState(true)
    useEffect(() => {
        if (navigator) {
            const view = isMobileDevice()
            setIsMobile(view)
        }
    }, [])
    return (
        <section
            className={
                'flex flex-row-reverse mx-[1rem] animation-fade-in z-50'
            }
        >
            <div className="flex flex-row gap-4 items items-center justify-between">
                <SettingsNav isMobile={isMobile} />
            </div>
            {isMobile ? <MobileNavBar /> : <></>}
        </section>
    )
}
