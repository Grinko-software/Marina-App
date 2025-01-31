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
        <html lang='es' suppressHydrationWarning>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
                <title>Marina Market App</title>
            </head>
            <body className={inter.className + ' h-screen flex overscroll-hidden'} >
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}
