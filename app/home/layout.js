'use client'

export default function ApplicationLayout ({ children }) {
    return (
        <section className=" bg-primary-300 dark:bg-secondary-500">
            <div className="flex-1 flex flex-col sm:flex-row">
                <main className="flex-1 flex h-[10rem] sm:h-[12rem]">
                    { children }
                </main>
            </div>
        </section>
    )
}
