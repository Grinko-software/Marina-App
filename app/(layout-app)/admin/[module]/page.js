'use client'
import { useRouter } from 'next/navigation'
import { modules } from '../modules'
import { useEffect, useState } from 'react'
import useAuthStore from '@/stores/user'
import RequireAdminComponent from './components/Auth'

export default function Page ({ params }) {
    const { module } = params
    const [moduleSelected, setModuleSelected] = useState(null)
    const [contentModule, setContentModule] = useState(null)
    const [isAuthRequered, setIsAuthRequered] = useState(false)
    const router = useRouter()
    const { isAdmin } = useAuthStore()

    useEffect(() => {
        if (module) {
            const selected = modules.find((item) => item.path === module)
            if (selected) {
                setModuleSelected(selected)
            } else {
                setModuleSelected(null)
                router.push('/admin')
            }
        }
    }, [module])

    useEffect(() => {
        if (moduleSelected) {
            const { requireAdmin, content } = moduleSelected

            if (!requireAdmin || (requireAdmin && isAdmin)) {
                setContentModule(content)
                setIsAuthRequered(false)
            } else {
                setIsAuthRequered(true)
            }
        } else {
            setContentModule(null)
            setIsAuthRequered(false)
        }
    }, [moduleSelected, isAdmin])

    return <section className='flex flex-1 h-full'>
        {isAuthRequered
            ? <RequireAdminComponent moduleName={moduleSelected?.name}/>
            : contentModule}
    </section>
}
