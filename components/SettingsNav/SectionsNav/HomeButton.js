'use client'
import { useRouter } from 'next/navigation'
import { AiFillHome } from 'react-icons/ai'

export function HomeButton () {
    const router = useRouter()
    return (
        <button
            aria-label='Toggle Dark Mode'
            type='button'
            className='flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700 animation-fade-in'
            onClick={() => { router.push('/home') }}
        >
            <AiFillHome className="w-6 h-6 sm:w-10 sm:h-10 cursor-pointer fill-primary-500 dark:fill-primary-300"/>
        </button>
    )
}
