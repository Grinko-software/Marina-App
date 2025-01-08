'use client'
import React from 'react'
import Header from './header'

export default function LayoutApp (props) {
    const { children, params } = props
    const { module } = params
    return (

        <section className="w-full h-full flex flex-col">
            <header className="sticky z-0 bg-primary-200 dark:bg-secondary-500 top-0">
                <Header module={module}/>
            </header>
            <main className="flex flex-1">
                {children}
            </main>
        </section>
    )
}
