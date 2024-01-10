'use client'
import React, { useState, useEffect } from 'react'
import QR from '@/assets/gifs/QR.json'
import CompletedGif from '@/assets/gifs/animation_completed.json'
import ErrordGif from '@/assets/gifs/animation_error.json'
import Lottie from 'lottie-react'
import useScannerStore from '@/stores/scanner'
import useAuthStore from '@/stores/user'
import { Spinner } from '@nextui-org/react'

export default function ScannerCredential ({ onGetUserData }) {
    const [loading, setLoading] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [error, setError] = useState(false)
    const [userAuthData, setUserAuthData] = useState(null)
    const { enabledAuthMode /* disabledAuthMode */ } = useScannerStore()
    const { getUserDataWithCode } = useAuthStore()

    const getUserData = async (qrValue) => {
        setLoading(true)
        const data = await getUserDataWithCode({ authCode: qrValue })
        if (data) {
            setUserAuthData(data)
            setCompleted(true)
        } else {
            setError(true)
        }
        setLoading(false)
    }

    const onCompleteAuth = () => {
        onGetUserData(userAuthData)
    }

    /*  const onErrorAuth = () => {
        //
    } */

    useEffect(() => {
        enabledAuthMode(getUserData)
    }, [])

    useEffect(() => {
        if (userAuthData) {
            onCompleteAuth()
        }
    }, [userAuthData])

    return (
        <section className='w-full h-full'>
            {
                completed
                    ? <>
                        <Lottie className="w-[15rem] mx-auto my-20" animationData={CompletedGif} loop={false} />
                    </>
                    : error
                        ? <>
                            <Lottie className="w-[15rem] mx-auto my-20" animationData={ErrordGif} loop={false} />
                            <span></span>
                        </>
                        : <>
                            <Lottie animationData={QR} loop={true} />
                            {loading
                                ? <Spinner className='text-md m-auto my-1'>
                                    {'Verificando...'}
                                </Spinner>
                                : null}
                        </>
            }
        </section>
    )
}
