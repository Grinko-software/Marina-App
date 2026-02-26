import React, { useMemo, useState } from 'react'
import {
    Navbar,
    NavbarContent,
    Button,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle
} from '@nextui-org/react'
import {
    FiBox,
    FiGrid,
    FiTrendingUp,
    FiBarChart2,
    FiBookOpen,
    FiLogOut
} from 'react-icons/fi'
import { usePathname, useRouter } from 'next/navigation'
import useAuthStore from '@/stores/user'
import { MODULES_KEYS } from '@/utils/modules'

export default function MobileNavBar () {
    const { signOut } = useAuthStore(({ signOut }) => ({ signOut }))
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()

    const menuItems = [
        { id: 'inventory', label: 'Inventario', route: '/inventory', icon: FiBox },
        { id: 'modules', label: 'Módulos', route: '/modules', icon: FiGrid },
        { id: MODULES_KEYS.PERFORFANCE, label: 'Rendimiento', route: '/modules/performance', icon: FiTrendingUp },
        { id: 'reports', label: 'Reportes', route: '/reports', icon: FiBarChart2 },
        { id: MODULES_KEYS.EVENTS, label: 'Contabilidad', route: '/modules/accounting', icon: FiBookOpen },
        { id: 'login', label: 'Cerrar sesión', route: '/login', icon: FiLogOut }
    ]

    const activeRoute = useMemo(() => {
        return menuItems.find((item) => {
            if (item.route === '/login') return false
            return pathname === item.route || pathname.startsWith(`${item.route}/`)
        })?.route
    }, [pathname])

    const handleNavigation = (route) => {
        if (route === pathname) {
            setIsMenuOpen(false)
            return
        }

        if (route === '/login') {
            signOut()
        }

        window.dispatchEvent(new CustomEvent('navigation-start'))
        router.push(route)
        setIsMenuOpen(false)
    }

    return (
        <Navbar
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            className="bg-primary/95 dark:bg-secondary-500/95 border-b border-default-200/40 backdrop-blur-md"
        >
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                    className="text-gray-900 dark:text-gray-200 data-[hover=true]:bg-black/10 dark:data-[hover=true]:bg-white/10"
                />
            </NavbarContent>

            <NavbarContent className="sm:hidden" justify="center">
                <p className="text-sm font-semibold tracking-wide text-gray-900 dark:text-gray-200">Menú</p>
            </NavbarContent>

            <NavbarMenu className="gap-2 p-3 bg-background/95 dark:bg-content1/95 backdrop-blur-md">
                {menuItems?.map((item) => {
                    const isActive = activeRoute === item.route
                    const isLogout = item.route === '/login'
                    const Icon = item.icon

                    return (
                        <NavbarMenuItem key={item.id} className="w-full">
                            <Button
                                variant={isActive ? 'flat' : 'light'}
                                color="default"
                                className={`h-11 w-full justify-start gap-3 rounded-medium px-4 text-base font-medium text-gray-900 dark:text-gray-200 ${
                                    isActive ? 'bg-gray-200 dark:bg-gray-700' : 'bg-transparent'
                                } ${isLogout ? 'text-gray-700 dark:text-gray-300' : ''}`}
                                onPress={() => handleNavigation(item.route)}
                            >
                                <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                                {item.label}
                            </Button>
                        </NavbarMenuItem>
                    )
                })}
            </NavbarMenu>
        </Navbar>
    )
}
