'use client'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes'
export function Providers ({ children }) {
    return (
        <ThemeProvider attribute='class'>
            <NextUIProvider>
                {children}
            </NextUIProvider>
        </ThemeProvider>

    )
}
