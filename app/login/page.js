'use client'
import React, { useEffect } from 'react'
import LoginForm from './components/FormLogin'
import { Card, CardHeader } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import useAuthStore from '@/stores/user'

export default function Login () {
    const router = useRouter()
    const token = useAuthStore((state) => state.token)

    useEffect(() => {
        if (token) {
            router.push('/home')
        }
    }, [token])

    return (
        <section
            className=' bg-transparent'>
            <Card
            // isBlurred
                // className='max-w-md w-full mx-auto overflow-hidden shadow-lg rounded-2xl p-8 space-y-5  bg-white bg-opacity-40 backdrop-blur-lg dark:bg-black dark:bg-opacity-50 dark:backdrop-blur-lg'
                className='dark max-w-md w-full mx-auto overflow-hidden shadow-2xl rounded-2xl p-8 space-y-5 bg-opacity-30 backdrop-blur-lg bg-slate-600'
            >
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <h1 className="font-bold text-3xl text-center w-full mt-10">Bienvenido</h1>
                </CardHeader>
                <LoginForm />
            </Card>
        </section>
    )
}
