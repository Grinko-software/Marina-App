'use client'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes'
import ScannerDetection from '@/components/ScannerDetection/ScannerDetection'

export function Providers ({ children }) {
    return (
        <ThemeProvider attribute='class'>
            <NextUIProvider>
                <ScannerDetection/>
                {children}
            </NextUIProvider>
        </ThemeProvider>

    )
}
