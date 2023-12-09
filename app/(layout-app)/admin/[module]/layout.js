'use client'
import React from 'react'
import Header from './header'

export default function LayoutApp ({ children, params }) {
    const { module } = params
    return (

        <section className="min-h-full w-screen h-full bg-primary-200 dark:bg-secondary-500 overflow-x-hidden touch-none fixed">
            <header className="sticky z-20 bg-primary-200 dark:bg-secondary-500 top-0">
                <Header module={module}/>
            </header>
            <div className="h-auto flex-1 max-h-full overflow-hidden flex">
                <main className="h-auto flex-1 mx-[1rem] xl:mx-[2rem] xlg:mx-[2rem]">
                    {children}
                </main>
            </div>
        </section>
    )
}
