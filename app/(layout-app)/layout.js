'use client'
import { Navigation } from '@/components/navigation/Navigation'
import React, { useState, useEffect } from 'react'
import { Header } from './header'
import { motion } from 'framer-motion'
import ScannerDetection from '@/components/ScannerDetection/ScannerDetection'
import { isMobileDevice } from '@/utils/agent'

export default function LayoutApp ({ children }) {
    const [isMobile, setIsMobile] = useState(true)
    useEffect(() => {
        console.log('Inventory')
        if (navigator) {
            const view = isMobileDevice()
            setIsMobile(view)
        }
    }, [])
    return (

        <section className=" w-screen h-full bg-primary-200 dark:bg-secondary-500 overflow-hidden touch-none fixed">
            <ScannerDetection/>
            <motion.div
                className='h-full flex flex-col'
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.6,
                    delay: 0.2,
                    ease: [0, 0.71, 0.2, 1.01]
                }}>

                <header className="sticky z-20 bg-primary-200 dark:bg-secondary-500 top-0">
                    <Header/>
                </header>
                <div className="h-auto flex-1 max-h-full overflow-y-hidden flex">
                    <main className="h-auto flex-1 mx-[1rem] xl:mx-[2rem] xlg:mx-[2rem]">
                        {children}
                    </main>
                </div>
                {isMobile
                    ? <></>
                    : <footer className="sticky z-20 bg-primary-200 dark:bg-secondary-500 bottom-0 h-auto py-[1rem]">
                        {<Navigation/>}
                    </footer>}
            </motion.div>
        </section>
    )
}
