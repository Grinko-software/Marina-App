'use client'
import React from 'react'
import Header from './header'

export default function LayoutApp (props) {
    const { children, params } = props
    const { module } = params

    return (
        <section className="w-full h-full flex flex-col overflow-hidden">
            {/* Header Section */}
            <header className="sticky top-0 z-20 dark:bg-secondary-500 w-full h-[60px]">
                <Header module={module} />
            </header>

            {/* Main Content Section */}
            <div className="flex-grow flex flex-col md:flex-row w-full overflow-hidden">
                <main className="w-full flex-grow overflow-hidden">
                    {children}
                </main>
            </div>
        </section>
    )
}
