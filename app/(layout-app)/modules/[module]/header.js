'use client'
import { useRouter } from 'next/navigation'
import { getModuleName } from '../modules'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'

export default function Header ({ module }) {
    const router = useRouter()

    return <section className='pb-5'>
        <Breadcrumbs itemClasses={{
            item: [
                'px-2 py-0.5 border-small border-default-400 rounded-small',
                'data-[current=true]:border-foreground data-[current=true]:bg-foreground data-[current=true]:text-background transition-colors',
                'data-[disabled=true]:border-default-400 data-[disabled=true]:bg-default-100'
            ]
        }}>
            <BreadcrumbItem startContent={null} onPress={() => router.push('/modules')} >Administrar</BreadcrumbItem>
            <BreadcrumbItem isCurrent href=''>{getModuleName({ path: module })}</BreadcrumbItem>
        </Breadcrumbs>
    </section>
}
