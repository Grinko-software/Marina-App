'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'

const ThemeButton = () => {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    if (!mounted) {
        return null
    }

    return (
        <button
            aria-label='Toggle Dark Mode'
            type='button'
            className='flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700 animation-fade-in'
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        >
            {resolvedTheme === 'dark'
                ? (
                    <SunIcon className='w-6 h-6 sm:w-10 sm:h-10 text-orange-300' />
                )
                : (
                    <MoonIcon className='w-6 h-6 sm:w-10 sm:h-10 text-indigo-950' />
                )}
        </button>
    )
}

export default ThemeButton
