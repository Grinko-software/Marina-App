'use client'
import React from 'react'
import Header from './header'

export default function LayoutApp (props) {
    const { children, params } = props
    const { module } = params
    return (

        <section className="w-full h-full flex flex-col">
            <header className="sticky z-20 bg-primary-200 dark:bg-secondary-500 top-0">
                <Header module={module}/>
            </header>
            <div className="h-auto flex-1 flex">
                <main className="flex flex-1">
                    {children}
                </main>
            </div>
        </section>
    )
}
