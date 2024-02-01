'use client'
import React, { useState, useEffect } from 'react'
import QR from '@/assets/gifs/QR.json'
import CompletedGif from '@/assets/gifs/animation_completed.json'
import ErrordGif from '@/assets/gifs/animation_error.json'
import Lottie from 'lottie-react'
import useScannerStore from '@/stores/scanner'
import useAuthStore from '@/stores/user'
import { Spinner } from '@nextui-org/react'
import AlertMessage from '../ui/AlertMessage'

const TIMEOUT = 1500
const TIMEOUT_SCAN = 500

export default function ScannerCredential ({ onGetUserData, onSuccess, changeSession, requireAdmin, withoutDelay }) {
    const [loading, setLoading] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const [userAuthData, setUserAuthData] = useState(null)
    const {
        enabledAuthMode,
        disabledAuthMode,
        authModeEnabled,
        datetimeLastUpdate
    } = useScannerStore()
    const {
        signInWithCode,
        getUserDataWithCode,
        errorAuthCode
    } = useAuthStore()

    const getUserData = async (qrValue) => {
        setLoading(true)
        setCompleted(false)
        setErrorMessage(null)
        const data = await getUserDataWithCode({ authCode: qrValue, requireAdmin })
        if (data) {
            setUserAuthData(data)
            setError(false)
            setSuccess(true)
        } else {
            setError(true)
            setSuccess(false)
        }
        setCompleted(true)
        setLoading(false)
    }

    const loginWithQR = async (qrValue) => {
        setLoading(true)
        setCompleted(false)
        setErrorMessage(null)
        const data = await signInWithCode({ authCode: qrValue })
        if (data) {
            setError(false)
            setSuccess(true)
        } else {
            setError(true)
            setSuccess(false)
        }
        setCompleted(true)
        setLoading(false)
    }

    const onCompleteAuth = () => {
        if (onGetUserData) {
            onGetUserData(userAuthData)
        }
        if (onSuccess) {
            onSuccess(userAuthData)
        }
    }

    /*  const onErrorAuth = () => {
        //
    } */

    useEffect(() => {
        if (error && completed) {
            if (requireAdmin) {
                setErrorMessage('Se requieren permisos de administrador')
            } else {
                setErrorMessage('Credencial no autorizada')
            }
        } else {
            setErrorMessage(null)
        }
    }, [error, completed, requireAdmin])

    useEffect(() => {
        if (changeSession) {
            enabledAuthMode(loginWithQR)
        } else {
            enabledAuthMode(getUserData)
        }
    }, [datetimeLastUpdate, authModeEnabled])

    useEffect(() => {
        if (completed && success) {
            setTimeout(() => {
                onCompleteAuth()
            }, withoutDelay ? 0 : TIMEOUT)
            setTimeout(() => {
                disabledAuthMode()
            }, withoutDelay ? TIMEOUT_SCAN : (TIMEOUT + TIMEOUT_SCAN))
        }
    }, [completed, success, withoutDelay])

    return (
        <section className='h-full flex flex-col items-center py-[3rem]'>
            <section className='h-[15rem] flex overflow-hidden'>
                {
                    completed && success
                        ? <>
                            <Lottie className="mx-auto" animationData={CompletedGif} loop={false} />
                        </>
                        : error
                            ? <>
                                <Lottie className="mx-auto" animationData={ErrordGif} loop={false} />

                            </>
                            : <>
                                <Lottie className="mx-auto scale-[2]" animationData={QR} loop={true} />
                            </>
                }
            </section>

            {/*  {`| completed:${completed}\n`}
            {`| loading:${loading}`}
            {`| success:${success}`}
            {`| error:${error}`} */}
            <section className='max-w-[40rem]'>

                {loading
                    ? <Spinner className='text-md m-auto my-1'>
                        {'Verificando...'}
                    </Spinner>
                    : error
                        ? <AlertMessage message= {errorAuthCode || errorMessage}/>
                        : null}
            </section>
        </section>
    )
}
