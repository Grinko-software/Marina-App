'use client'
import { Navigation } from '@/components/navigation/Navigation'
import React, { useState, useEffect } from 'react'
import { Header } from './header'
import { motion } from 'framer-motion'
import { isMobileDevice } from '@/utils/agent'
import { usePathname } from 'next/navigation'

export default function LayoutApp ({ children }) {
    const [isMobile, setIsMobile] = useState(true)
    const pathname = usePathname()
    const isFullHeightMobileRoute = pathname?.includes('/reports') || pathname?.includes('/modules/accounting')

    useEffect(() => {
        if (typeof navigator !== 'undefined') {
            setIsMobile(isMobileDevice())
        }
    }, [])

    return (
        <section
            className="w-screen h-[100dvh] min-h-[100svh] bg-primary-200 dark:bg-secondary-500 overflow-hidden touch-pan-y relative pb-[env(safe-area-inset-bottom)] sm:fixed sm:inset-0 sm:h-[100dvh] sm:overflow-auto"
            style={{ minHeight: '100dvh' }}
        >
            <motion.div
                className="h-full min-h-0 flex flex-col gap-3 "
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.6,
                    delay: 0.2,
                    ease: [0, 0.71, 0.2, 1.01]
                }}
            >
                {/* Header */}
                <header className="sticky top-0 z-20 bg-primary-200 dark:bg-secondary-500 h-[60px] flex-shrink-0">
                    <Header />
                </header>

                {/* Main Content */}
                <div className="flex-1 min-h-0 flex w-full overflow-hidden">
                    <main className={`flex-grow h-full min-h-0 ${isMobile && isFullHeightMobileRoute ? 'overflow-hidden' : 'overflow-y-auto'} sm:overflow-hidden mx-[1rem] xl:mx-[2rem] xlg:mx-[2rem]`}>
                        {children}
                    </main>
                </div>

                {/* Footer (Only Desktop) */}
                {!isMobile &&
                <footer className="sticky bottom-0 z-20 bg-primary-200 dark:bg-secondary-500 h-[6rem]  flex-shrink-0">
                    <Navigation />
                </footer>}
            </motion.div>
        </section>
    )
}
