'use client'
import { Navigation } from '@/components/navigation/Navigation'
import React, { useState, useEffect } from 'react'
import { Header } from './header'
import { motion } from 'framer-motion'
import { isMobileDevice } from '@/utils/agent'

export default function LayoutApp ({ children }) {
    const [isMobile, setIsMobile] = useState(true)
    useEffect(() => {
        if (navigator) {
            const view = isMobileDevice()
            setIsMobile(view)
        }
    }, [])
    return (

        <section className="min-h-full w-screen h-full bg-primary-200 dark:bg-secondary-500 overflow-x-hidden touch-none fixed">
            <motion.div
                className='min-h-full flex flex-col'
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
                <div className="h-auto flex-1 max-h-full overflow-hidden flex">
                    <main className="h-auto flex-1 mx-[1rem] xl:mx-[2rem] xlg:mx-[2rem]">
                        {children}
                    </main>
                </div>
                {isMobile
                    ? <></>
                    : <footer className="sticky z-20 bg-primary-200 dark:bg-secondary-500 bottom-0 h-[6rem] pt-[1rem]">
                        {<Navigation/>}
                    </footer>}
            </motion.div>
        </section>
    )
}
