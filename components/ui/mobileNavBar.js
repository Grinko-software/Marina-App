import React, { useState, useEffect, useCallback, useMemo } from 'react'
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

export default function MobileNavBar () {
    const { signOut } = useAuthStore(({ signOut }) => ({ signOut }))
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()

    const moduleApplication = pathname.replace('/', '')
    const [selected, setSelected] = useState(moduleApplication)

    // Menú de navegación
    const menuItems = useMemo(() => [
        { id: 'inventory', label: '📦 Inventario', route: '/inventory' },
        { id: 'modules', label: '🛠️ Módulos', route: '/modules' },
        { id: 'performance', label: '📊 Rendimiento', route: '/modules/performance' },
        { id: 'login', label: '🚪 Cerrar sesión', route: '/' }
    ], [])

    // Manejo de navegación
    const handleNavigation = useCallback((route) => {
        setSelected(route)
        if (route === 'login') {
            signOut()
        }
        router.push(route)
        setIsMenuOpen(false)
    }, [router, signOut])

    useEffect(() => {
        if (selected && selected !== moduleApplication) {
            handleNavigation(selected)
        }
    }, [selected, moduleApplication, handleNavigation])

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
                {menuItems.map(({ id, label, route }) => (
                    <NavbarMenuItem key={id} className="w-full">
                        <Button
                            className={`
                                w-full h-12 flex items-center justify-start px-4 font-semibold text-lg rounded-lg 
                                transition-colors duration-200 text-gray-900 dark:text-white
                                ${
                    selected === route
                        ? 'bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white'
                        : 'hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white'
                    }
                            `}
                            onClick={() => handleNavigation(route)}
                        >
                            {label}
                        </Button>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    )
}
