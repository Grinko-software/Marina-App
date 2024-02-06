/* eslint-disable no-unused-vars */
'use client'
import MainTittleCard from '@/components/ui/MainCard'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Auth from '../auth'
import SettingsNav from '@/components/SettingsNav/SettingsNav'
import inventory from '@/assets/images/inventory.webp'
import reports from '@/assets/images/report.jpeg'
import sales from '@/assets/images/sales.jpeg'
import { isMobileDevice } from '@/utils/agent'
import useScannerStore from '@/stores/scanner'
import useSettingsStore from '@/stores/settings'
export default function Home () {
    const [salesDisabled, setSalesDisabled] = useState(true)
    const [show, setShow] = useState(null)
    const { disabled } = useSettingsStore(({ disabled }) => ({ disabled }))
    useEffect(() => {
        if (navigator) {
            const isMobile = isMobileDevice()
            setSalesDisabled(isMobile)
        }
    }, [])

    useEffect(() => {
        useScannerStore.getState()?.disabledScanner()
    }, [])
    useEffect(() => {
        if (disabled !== null) {
            setShow(disabled)
        }
    }, [disabled])

    return (
        <section className="bg-primary-300 dark:bg-secondary-500 sm:mx-10" >
            <Auth/>
            <div>
                <main>
                    <div className="sm:mt-36 sm:mr-0 sm:ml-0 mt-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.2,
                                ease: [0, 0.71, 0.2, 1.01]
                            }}
                            className="gap-4 sm:gap-10 grid grid-cols-3 grid-rows-[auto_minmax(auto,_1fr)_auto] sm:mx-5 touch-none place-items-center"
                        >
                            <MainTittleCard
                                disabled={ salesDisabled}
                                route ="/sales"
                                title="Ventas"
                                imgSrc={sales}
                                footerMessage="Gestión eficiente para tu minimarket."
                            />
                            <MainTittleCard
                                route="/inventory"
                                title="Inventario"
                                imgSrc={inventory}
                                footerMessage="Optimiza existencias en tiempo real."
                                // disabled={disabled}
                            />
                            <MainTittleCard
                                route ="/modules"
                                title="Módulos"
                                imgSrc={reports}
                                footerMessage="Herramientas para visualizar reportes y administrar tu sistema."
                                // disabled={disabled}
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.2,
                                ease: [0, 0.71, 0.2, 1.01]
                            }}
                            className="flex sm:flex-col-reverse sm:m-0 m-4  items-center sm:items-end sm:x-5"
                        >
                            <SettingsNav />
                        </motion.div>
                    </div>
                </main>
            </div>
        </section>

    )
}
