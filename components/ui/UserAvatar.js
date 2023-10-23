'use client'
import React, { useState, useEffect } from 'react'
import { Card, CardHeader, Button } from '@nextui-org/react'
import useAuthStore from '@/stores/user'
import ThemeButton from './ThemeButton'
import imgSrc from '@/app/icon.png'
import Image from 'next/image'
// import ShortcutButton from './ShortcutButton'

export default function UserAvatar () {
    const [userName, setUserName] = useState(null)
    const [admin, setAdmin] = useState(false)
    const { fullName, isAdmin } = useAuthStore(({ fullName, isAdmin }) => ({ fullName, isAdmin }))

    const { signOut } = useAuthStore(({ signOut }) => ({ signOut }))
    useEffect(() => {
        if (fullName) {
            setUserName(fullName)
            setAdmin(isAdmin)
        }
    }, [fullName])
    return (
        <div>
            <Card >
                <CardHeader className="justify-between space-x-1">
                    <div className="flex gap-3">
                        <Image className="w-16 h-16 p-1 rounded-full ring-4 ring-amber-600" src={imgSrc} alt="Bordered avatar"/>
                        <div className="flex flex-col items-start justify-center">
                            <h4 className="sm:text-xl  text-tiny font-semibold leading-none text-default-600">{userName?.toUpperCase() }</h4>
                            <h5 className="sm:text-xl text-tiny tracking-tight text-default-400">{admin ? 'Administrador' : 'Trabajador'}</h5>
                        </div>
                    </div>
                    <div className="col-start-1 col-end-1">
                        <ThemeButton/>
                    </div>
                    {/* <div className="col-start-2 col-end-2">
                        <ShortcutButton />
                    </div> */}
                    <Button
                        className={'text-xs sm:text-lg bg-transparent text-foreground border-default-200'}
                        color="primary"
                        radius="full"
                        variant={'solid'}
                        onClick={() => signOut()}
                    >
                        {'Cerrar Sesion'}
                    </Button>
                </CardHeader>
            </Card>
        </div>
    )
}
