import React, { useState, useEffect } from 'react'
import { Navbar, NavbarContent, Button, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@nextui-org/react'
import { usePathname, useRouter } from 'next/navigation'

export default function MobileNavBar () {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const pathname = usePathname()
    const moduleApplication = pathname.replace('/', '')
    const router = useRouter()
    const [selected, setSelected] = useState(moduleApplication)
    const menuItems = [
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
            id: 'modules',
            label: 'Módulos',
            route: '/modules{k,'
        },
        {
            id: 'admin',
            label: 'Administrar',
            route: '/modules'
        }
    ]
    useEffect(() => {
        if (selected && selected !== moduleApplication) {
            router.push('/' + selected)
        }
    }, [selected])

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} className='bg-transparent dark:bg-secondary-500'>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    className="sm:hidden"
                />
            </NavbarContent>
            <NavbarMenu className='items items-start'>
                {menuItems?.map((item, index) => (
                    <NavbarMenuItem key={item}>
                        <Button
                            className="w-full h-[2rem] bg-transparent font-bold text-2xl py-8"
                            href="#"
                            onClick={setSelected}
                        >
                            {item.label}
                        </Button>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    )
}
