import React, { useState, useEffect } from 'react'
import {
    Navbar,
    NavbarContent,
    Button,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle
} from '@nextui-org/react'
import { usePathname, useRouter } from 'next/navigation'
import useAuthStore from '@/stores/user'
import { MODULES_KEYS } from '@/utils/modules'

export default function MobileNavBar () {
    const { signOut } = useAuthStore(({ signOut }) => ({ signOut }))
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()

    const moduleApplication = pathname.replace('/', '')
    const [selected, setSelected] = useState(moduleApplication)

    const menuItems = [
        { id: 'inventory', label: '📦 Inventario', route: '/inventory' },
        { id: 'modules', label: '🛠️ Módulos', route: '/modules' },
        { id: MODULES_KEYS.PERFORFANCE, label: '📊 Rendimiento', route: '/modules/performance' },
        { id: 'login', label: '🚪 Cerrar sesión', route: '/' }
    ]

    useEffect(() => {
        if (selected && selected !== moduleApplication) {
            if (selected === 'login') {
                signOut()
            }
            router.push(selected)
            setIsMenuOpen(false)
        }
    }, [selected])

    return (
        <Navbar
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            className="bg-primary dark:bg-secondary-500 transition-all duration-300"
        >
            {/* Botón de menú hamburguesa */}
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                    className="sm:hidden transition-transform duration-200 ease-in-out text-gray-900 dark:text-white"
                />
            </NavbarContent>

            {/* Menú desplegable */}
            <NavbarMenu className="flex flex-col gap-3 p-4 items-start bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg transition-all duration-300">
                {menuItems?.map((item, index) => (
                    <NavbarMenuItem key={item.id} className="w-full">
                        <Button
                            className={`
                                w-full h-12 flex items-center justify-start px-4 font-semibold text-lg rounded-lg 
                                transition-colors duration-200 text-gray-900 dark:text-white
                                bg-gray-300 dark:bg-gray-700
                            `}
                            onClick={() => {
                                setSelected(item?.route)
                            }}
                        >
                            {item.label}
                        </Button>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    )
}
