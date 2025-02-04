'use client'
import React, { useEffect, useState } from 'react'
import Header from './header'
import { isMobileDevice } from '@/utils/agent'
export default function LayoutApp (props) {
    const { children, params } = props
    const { module } = params
    const [isMobile, setIsMobile] = useState(true)
    useEffect(() => {
        if (navigator) {
            const view = isMobileDevice()
            setIsMobile(view)
        }
    }, [])
    return isMobile
        ? <div className="sticky top-0 z-20 rounded-lg w-full min-h-[77vh] max-h-[77vh]" >{children}</div>
        : (
            <>
                {/* Header Section */}
                <header className="sticky top-0 z-20 dark:bg-secondary-500 w-full h-[60px]">
                    <Header module={module} />
                </header>
                {/* Main Content Section */}
                <div className="">{children}</div>
            </>
        )
}
