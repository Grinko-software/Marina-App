'use client'
import { useRouter } from 'next/navigation'
import { modules } from '../modules'
import { useEffect, useState } from 'react'
import useAuthStore from '@/stores/user'

const requireAdminComponent = () => {
    return <div>
        No puedes acceder, requieres permisos de administrador
    </div>
}

export default function Page ({ params }) {
    const { module } = params
    const [moduleSelected, setModuleSelected] = useState(null)
    const [contentModule, setContentModule] = useState(null)
    const router = useRouter()
    const { signInWithCode, loading, isAdmin } = useAuthStore()

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

            if (!requireAdmin || (requireAdmin && !isAdmin)) {
                setContentModule(content)
            } else {
                setContentModule(requireAdminComponent)
            }
        } else {
            setContentModule(null)
        }
    }, [moduleSelected, isAdmin])

    return <section>
        {contentModule}
    </section>
}
