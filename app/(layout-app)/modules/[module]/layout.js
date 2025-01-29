'use client'
import React from 'react'
import Header from './header'

export default function LayoutApp (props) {
    const { children, params } = props
    const { module } = params

    return (
        <section className="w-screen h-full bg-primary-200 dark:bg-secondary-500 overflow-x-hidden touch-none fixed min-h-full flex flex-col gap-2">
            <header className="sticky z-20 bg-primary-200 dark:bg-secondary-500">
                <Header module={module}/>
            </header>
            <div className="h-auto flex-1 max-h-full overflow-hidden flex justify-start items-start">
                <main className="h-auto flex-1 mx-[1rem] xl:mx-[2rem] xlg:mx-[3rem] flex justify-start items-start">
                    {children}
                </main>
            </div>
        </section>
    )
}
