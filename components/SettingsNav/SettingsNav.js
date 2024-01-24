'use client'
import React, { useState, useEffect } from 'react'
import { Card, CardHeader, Button, Divider } from '@nextui-org/react'
import useAuthStore from '@/stores/user'
import ThemeButton from '../ui/ThemeButton'
import imgSrc from '@/app/icon.png'
import Image from 'next/image'
import ShortcutButton from '../ui/ShortcutButton'
import { PaymentOfMoney } from '../ui/PaymentOfMoney'
import { usePathname } from 'next/navigation'
import BoxStatus from './closeBoxStatus'
import ScaleStatus from '@/components/ui/ScaleStatus'
import hubScale from '@/app/(layout-app)/sales/components/store/connectionScale'
import { HomeButton } from '../ui/HomeButton'
import SwitchUserButton from '../ui/SwitchUserButton'
import useSettingsStore from '@/stores/settings'
import { getStatus } from './services'
import toast from 'react-hot-toast'
export default function SettingsNav () {
    const notify = (text) => toast(text)
    const [userName, setUserName] = useState(null)
    const [admin, setAdmin] = useState(false)
    const [openModalCashBalance, setOpenModalCashBalance] = useState(false)
    const { selectedCashRegister, statusCashRegister, setStatusCashRegister, setDisabled, disabled } =
     useSettingsStore(({ selectedCashRegister, statusCashRegister, setStatusCashRegister, setDisabled, disabled }
     ) => ({ selectedCashRegister, statusCashRegister, setStatusCashRegister, setDisabled, disabled }))
    const { fullName, isAdmin } = useAuthStore(({ fullName, isAdmin }) => ({ fullName, isAdmin }))
    const { isConnected } = hubScale()
    const { signOut } = useAuthStore(({ signOut }) => ({ signOut }))
    useEffect(() => {
        if (fullName) {
            setUserName(fullName)
            setAdmin(isAdmin)
        }
    }, [fullName])
    useEffect(() => {
        if (selectedCashRegister?.ID !== 'no-select' && statusCashRegister === null) {
            getStatus(selectedCashRegister?.ID).then((status) => {
                console.log(status)
                if (!status) {
                    // Open Modal to Init Cash balance
                    setOpenModalCashBalance(true)
                } else {
                    // Se debe hacer un cierre de caja
                }
            })
        }
    }, [selectedCashRegister])
    /* Control disable button */
    useEffect(() => {
        if (selectedCashRegister?.ID === 'no-select') {
            //
            notify('⚙️ Se debe seleccionar una caja en ajustes para continuar!')
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }, [selectedCashRegister])
    return (
        <div >
            <Card className={`${usePathname() !== '/home' ? 'bg-transparent shadow-none' : ''} `}>
                <CardHeader className="justify-between space-x-2">
                    <div className={`${usePathname() !== '/home' ? 'flex-row-reverse' : 'flex-row'} flex gap-3`}>
                        {usePathname() === '/home'
                            ? <div>
                                <Image className="w-16 h-16 p-1 rounded-full ring-4 ring-amber-600" src={imgSrc} alt="Bordered avatar"/>
                            </div>
                            : <></>}
                        <div className="flex flex-col items-start justify-center">
                            <h4 className="sm:text-xl  text-tiny font-semibold leading-none text-default-600">{userName?.toUpperCase() }</h4>
                            <h5 className="sm:text-xl text-tiny tracking-tight text-default-400">{admin ? 'Administrador' : 'Trabajador'}</h5>
                        </div>

                        <div className="flex flex-row gap-3 items items-center">
                            {usePathname() === '/sales' ? <div><ScaleStatus scaleStatus = {isConnected}/></div> : <></>}
                            <div className="col-start-2 col-end-2">
                                <PaymentOfMoney disabled={disabled} />
                            </div>
                            <div className="col-start-2 col-end-2">
                                <BoxStatus
                                    setStatusCashRegister={setStatusCashRegister}
                                    openModalCashBalance={openModalCashBalance}
                                    setOpenModalCashBalance={setOpenModalCashBalance}
                                    disabled={disabled}

                                />
                            </div>
                            <Divider orientation="vertical" className="h-12"/>
                            <div className="col-start-1 col-end-2">
                                <ThemeButton/>
                            </div>
                            <div className="col-start-2 col-end-2">
                                <SwitchUserButton />
                            </div>
                            <div className="col-start-2 col-end-2">
                                <ShortcutButton />
                            </div>
                            <div className="col-start-2 col-end-2">
                                {usePathname() !== '/home'
                                    ? <div>
                                        <HomeButton />
                                    </div>
                                    : <></>}
                            </div>
                            {usePathname() !== '/home'
                                ? <div>
                                    <Divider orientation="vertical" className="h-12"/>
                                </div>
                                : <></>}
                        </div>
                    </div>
                    {usePathname() === '/home'
                        ? <Button
                            className={'text-xs sm:text-lg bg-transparent text-foreground border-default-200'}
                            color="primary"
                            radius="full"
                            variant={'solid'}
                            onClick={() => signOut()}
                        >
                            {'Cerrar Sesion'}
                        </Button>
                        : <></>}
                </CardHeader>
            </Card>
        </div>
    )
}
