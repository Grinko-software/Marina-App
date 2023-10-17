'use client'
import MainTittleCard from '@/components/ui/MainCard'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Auth from '../auth'
import UserAvatar from '../../components/ui/UserAvatar'
import { isMobileDevice } from '@/utils/agent'

export default function Home () {
    const [salesDisabled, setSalesDisabled] = useState(true)
    useEffect(() => {
        if (navigator) {
            const isMobile = isMobileDevice()
            setSalesDisabled(isMobile)
        }
    }, [])
    return (
        <section className="h-full w-full flex-1 flex flex-col bg-primary-300 dark:bg-secondary-500">
            <Auth/>
            <div className="flex-1  flex flex-col sm:flex-row sm:mt-36 sm:ml-5 sm:mr-5 sm:mb-0 ">
                <main>
                    <section className="flex flex-col items-center sm:mr-0 mr-5 sm:ml-0 ml-5 sm:mt-0 mt-5">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.2,
                                ease: [0, 0.71, 0.2, 1.01]
                            }}
                            className="gap-5 grid grid-cols-3 grid-rows-[auto_minmax(auto,_1fr)_auto] ">
                            <MainTittleCard
                                disabled={salesDisabled}
                                route ="/sales"
                                title="Ventas"
                                imgSrc="https://confidentefinanciero.com/wp-content/uploads/2023/04/Facturacion-electronica-restaurantes-scaled.jpg"
                                footerMessage="Gestión eficiente para tu minimarket."
                            />
                            <MainTittleCard
                                route="/inventory"
                                title="Inventario"
                                imgSrc="https://www.vendhq.com/blog/wp-content/uploads/2020/04/iStock-1133945516.jpg"
                                footerMessage="Optimiza existencias en tiempo real."
                            />
                            <MainTittleCard
                                route ="/reports"
                                title="Reportes"
                                imgSrc="https://assets.equifax.com/marketing/argentina/images/interactive_reports_feature1_750x550.jpg"
                                footerMessage="Datos clave para decisiones informadas y estratégicas."
                            />
                        </motion.div>
                    </section>
                    <div className='flex  sm:flex-row-reverse sm:items-end sm:m-0 m-5'>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.2,
                                ease: [0, 0.71, 0.2, 1.01]
                            }}
                        >
                            <UserAvatar />
                        </motion.div>
                    </div>
                </main>
            </div>
        </section>

    )
}
