'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { updateTokenSystem } from '@/services/http'
import { getToken } from '@/services/account'
export default function Auth ({ pathname }) {
    const router = useRouter()
    const token = getToken()

    useEffect(() => {
        if (!token || token === 'null' || token === null) {
            router.push('/login')
        } else if (pathname === '/') {
            router.push('/home')
        }
    }, [token])
    useEffect(() => {
        updateTokenSystem()
    }, [])
    return <></>
}
