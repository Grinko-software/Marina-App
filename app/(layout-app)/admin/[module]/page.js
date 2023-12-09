'use client'
import { useRouter } from 'next/navigation'
import { modules } from '../modules'
import { useEffect, useState } from 'react'

export default function Page ({ params }) {
    const { module } = params
    const [moduleSelected, setModuleSelected] = useState(null)
    const router = useRouter()

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

    return <section>
        {moduleSelected?.content}
    </section>
}
