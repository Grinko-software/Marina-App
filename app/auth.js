'use client'
import React, { useEffect } from 'react'
import useAuthStore from '@/stores/user'
import { useRouter } from 'next/navigation'

export default function Auth ({ pathname }) {
    const router = useRouter()
    const token = useAuthStore((state) => state.token)

    useEffect(() => {
        if (!token) {
            router.push('/login')
        } else if (pathname === '/') {
            router.push('/home')
        }
    }, [token])

    return (<></>)
}
