'use client'
import React, { useEffect, useState } from 'react'
import { Tabs, Tab } from '@nextui-org/react'
import { usePathname, useRouter } from 'next/navigation'
export function Navigation () {
    const pathname = usePathname()
    const moduleApplication = pathname.replace('/', '')
    const router = useRouter()
    const [selected, setSelected] = useState(moduleApplication)
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
        {
            id: 'reports',
            label: 'Reportes',
            route: '/reports'
        }
    ]
    useEffect(() => {
        if (selected && selected !== moduleApplication) {
            router.push('/' + selected)
        }
    }, [selected])
    return (
        <footer className={'flex flex-col items-center w-full'}>
            <Tabs
                disabledKeys={['reports']}
                aria-label="Options"
                items={tabs}
                selectedKey={selected}
                onSelectionChange={setSelected}
            >
                {(item) => (
                    <Tab key={item.id} size={'lg'} title={item.label} className="w-full md:w-[10rem] xl:w-[24rem]">
                    </Tab>
                )}
            </Tabs>
        </footer>
    )
}
