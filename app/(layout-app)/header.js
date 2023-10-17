'use client'
import ThemeButton from '@/components/ui/ThemeButton'
import { HomeButton } from '@/components/ui/HomeButton'
import ScaleStatus from '@/components/ui/ScaleStatus'
import hubScale from './sales/components/store/connectionScale'
import { usePathname } from 'next/navigation'

export function Header () {
    const { isConnected } = hubScale()
    return (
        <section className={'flex flex-row-reverse py-2 mx-[1rem] xl:mx-[6rem] xlg:mx-[6rem] gap-x-unit-1 animation-fade-in'}>
            <HomeButton/>
            <ThemeButton/>
            {usePathname() === '/sales' ? <ScaleStatus scaleStatus = {isConnected}/> : <></>}
        </section>
    )
}
