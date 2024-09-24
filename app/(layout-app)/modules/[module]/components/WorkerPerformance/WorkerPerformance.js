'use client'
import { useEffect } from 'react'
import Filter from './Filter'
import Widgets from './Widgets'

export default function WorkerPerformance () {
    // const { requestData } = useAccountingEventsStore()
    useEffect(() => {
        // requestData(limitPage, currentPage)
    }, [])
    /* useEffect(() => { console.debug(loading) }, [loading]) */

    return <section className='w-full h-full'>
        <section className='flex w-full h-full' >
            <div className='w-full h-full flex flex-col gap-3'>
                <Filter/>
                <Widgets/>
                <div className='border border-green-300 flex flex-1 items-center'>
                    <p className='text-center m-auto'>
                        CARDS
                    </p>
                </div>
            </div>
        </section>
    </section>
}
