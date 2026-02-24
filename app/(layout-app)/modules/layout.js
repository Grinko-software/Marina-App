'use client'
import React, { useEffect, useState } from 'react'
import { isMobileDevice } from '@/utils/agent'
export default function LayoutApp (props) {
    const { children } = props
    const [isMobile, setIsMobile] = useState(true)
    useEffect(() => {
        if (navigator) {
            const view = isMobileDevice()
            setIsMobile(view)
        }
    }, [])
    return isMobile ? <div className="pt-3 w-full h-full min-h-0 overflow-hidden">{children}</div> : <div className="xl:pt-6 w-full h-full min-h-0 overflow-hidden">{children}</div>
}
