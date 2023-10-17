import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Marina Market App',
    description: 'Marina Market Appp'
}

export default function RootLayout ({ children }) {
    return (
        <html lang='en' suppressHydrationWarning>
            <head>
                <title>Marina Market App</title>
            </head>
            <body className={inter.className + ' h-screen flex overscroll-none'} >
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}
