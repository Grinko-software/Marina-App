'use client'
import Auth from '@/app/auth'
import { Modules } from './components/modules'

export default function Administration () {
    return (
        <section className='h-full max-h-full flex'>
            <Auth/>
            <section className='flex-1 h-full'>
                <Modules/>
            </section>
        </section>
    )
}
