'use client'
import React, { useEffect, useState } from 'react'
import { Tabs, Tab } from '@nextui-org/react'
import { usePathname, useRouter } from 'next/navigation'
export function Navigation () {
    const pathname = usePathname()
    const moduleApplication = pathname.replace('/', '')
    const router = useRouter()
    const [selected, setSelected] = useState()

    const tabs = [
        {
            id: 'sales',
            label: 'Ventas',
            route: '/sales'
        },
        {
            id: 'inventory',
            label: 'Inventario',
            route: '/inventory'
        },
        /* {
            id: 'reports',
            label: 'Reportes',
            route: '/reports'
        }, */
        {
            id: 'modules',
            label: 'Módulos',
            route: '/modules'
        }
    ]

    useEffect(() => {
        if (moduleApplication) {
            const pathParts = moduleApplication.split('/')
            const principalPath = pathParts.length ? pathParts[0] : undefined
            if (!selected) {
                setSelected(principalPath)
            } else if (selected !== principalPath) {
                setSelected(selected)
                router.push('/' + selected)
            }
        }
    }, [moduleApplication, selected])

    /*    useEffect(() => {
        if (selected && !moduleApplication?.includes(selected)) {
            router.push('/' + selected)
        }
    }, [selected]) */

    return (
        <footer className={'flex flex-col items-center w-full'}>
            <Tabs
                aria-label="Options"
                items={tabs}
                selectedKey={selected}
                onSelectionChange={(key) => {
                    if (key !== selected) {
                        window.dispatchEvent(new CustomEvent('navigation-start'))
                    }
                    setSelected(key)
                }}
                // disabledKeys={['reports']}
            >
                {(item) => (
                    <Tab
                        key={item.id}
                        size={'lg'}
                        title={item.label}
                        className="w-full md:w-[10rem] xl:w-[24rem]"
                    ></Tab>
                )}
            </Tabs>
        </footer>
    )
}
