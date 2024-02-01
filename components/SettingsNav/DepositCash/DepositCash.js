'use client'
import React, { useState, useEffect } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react'
import useScannerStore from '@/stores/scanner'
import ScannerCredential from '../../ScannerCredential/ScannerCredential'
import useCashBalanceStore from '../store'
import useSettingsStore from '@/stores/settings'
import { getCashRegister } from '@/services/cashRegister'
import { getIdUser } from '@/services/account'
import { notify } from '@/services/notify'
import { today } from '@/utils/date'
import useAuthStore from '@/stores/user'
export default function DepositCash ({ isOpen, onClose, disabled }) {
    const [paymentDetailed, setPayDetailed] = useState(null)
    const [readQR, setReadQR] = useState(false)
    const [userAuthData, setUserAuthData] = useState(null)
    const { /* enabledScanner, disabledScanner, */ disabledAuthMode } = useScannerStore()
    const { createDepositOrWithdrawalCashBalance, openDrawer } = useCashBalanceStore(({ createDepositOrWithdrawalCashBalance, openDrawer }) => ({ createDepositOrWithdrawalCashBalance, openDrawer }))
    const { setStatusCashRegister } = useSettingsStore(({ setStatusCashRegister }) => ({ setStatusCashRegister }))
    const onhandlerAcctions = () => {
        setPayDetailed(null)
        onClose()
        setReadQR(false)
    }
    const onHandlerDrawals = () => {
        setReadQR(true)
    }
    const handlerOpenDrawer = () => {
        const { fullName } = useAuthStore.getState()
        const body = {
            event_type: 'Retiro de caja', date: today().format('DD-MM-YYYY HH:mm:ss'), cash_registry_name: getCashRegister()?.name, user_name: fullName
        }
        openDrawer(getCashRegister()?.ID, notify, body)
    }
    useEffect(() => {
        if (userAuthData) {
            // setReadQR(false)
            alert(userAuthData?.fullName)
        }
    }, [userAuthData])

    useEffect(() => {
        setReadQR(false)
    }, [])
    const onSuccess = (data) => {
        setUserAuthData(data)
        createDepositOrWithdrawalCashBalance(getCashRegister()?.ID, getIdUser(), 'Retiro de prueba', paymentDetailed, setStatusCashRegister, onhandlerAcctions, notify, handlerOpenDrawer, 'income')
    }

    const closeModal = () => {
        disabledAuthMode()
        setReadQR(false)
        onClose()
        setPayDetailed(0)
    }

    return (
        <>
            <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size={'4xl'} className="space-y-2" >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 font-extrabold text-2xl">INGRESO EN EFECTIVO</ModalHeader>
                            {!readQR
                                ? <section>
                                    <ModalBody>
                                        <div className=" space-y-12">
                                            <section className="flex flex-row space-x-3">
                                                <Button variant="shadow" className=' w-[10rem] h-[8rem] bg-green-700  text-white font-extrabold text-3xl'
                                                    onClick={
                                                        () => {
                                                            setPayDetailed(paymentDetailed + 1000)
                                                        }
                                                    }>
                                                $1.000
                                                </Button>
                                                <Button variant="shadow" className=' w-[10rem] h-[8rem] bg-indigo-600 text-white font-extrabold text-3xl shadow-lg'
                                                    onClick={() => setPayDetailed(paymentDetailed + 2000) }>
                                                 $2.000
                                                </Button>
                                                <Button variant="shadow" className=' w-[10rem] h-[8rem] bg-red-600 text-white  font-extrabold text-3xl shadow-lg'
                                                    onClick={() => setPayDetailed(paymentDetailed + 5000) }>
                                                $5.000
                                                </Button>
                                                <Button variant="shadow" className=' w-[10rem] h-[8rem] bg-blue-600 text-white  font-extrabold text-3xl shadow-lg'
                                                    onClick={() => setPayDetailed(paymentDetailed + 10000) }>
                                                $10.000
                                                </Button>
                                                <Button variant="shadow" className=' w-[10rem] h-[8rem] bg-orange-600 text-white  font-extrabold text-3xl shadow-lg'
                                                    onClick={() => setPayDetailed(paymentDetailed + 20000) }>
                                                $20.000
                                                </Button>
                                            </section>
                                            <Input
                                                type="number"
                                                title="Efectivo"
                                                autoFocus={true}
                                                label={
                                                    <span className="font-bold text-lg text-black dark:text-white ">CANTIDAD</span>
                                                }
                                                labelPlacement="outside"
                                                placeholder={'0'}
                                                startContent={
                                                    <div className="pointer-events-none flex items-center">
                                                        <span className="text-default-400 text-small dark:text-white">$</span>
                                                    </div>
                                                }
                                                min={0}
                                                value={paymentDetailed}
                                                onValueChange={(value) => { if (value) { setPayDetailed(parseFloat(value)) } }}
                                            />

                                            <Input
                                                size='lg'
                                                type="text"
                                                label={
                                                    <span className="font-bold text-lg text-black dark:text-white ">DETALLE</span>
                                                }
                                                labelPlacement="outside"
                                                placeholder="Ingrese detalles del ingreso"
                                            />
                                        </div>
                                    </ModalBody>
                                    <ModalFooter className='justify-center'>
                                        <Button variant="shadow" className =" bg-green-500 text-primary-50 w-[12rem] h-[4rem] text-2xl font-extrabold "
                                            onClick={() => {
                                                onHandlerDrawals()
                                            }}>
                                    ACEPTAR
                                        </Button>
                                        <Button color="danger" variant="shadow" className="w-[12rem] h-[4rem] text-2xl font-extrabold" onClick={() => {
                                            closeModal()
                                        }}>
                                    CANCELAR
                                        </Button>
                                    </ModalFooter>
                                </section>

                                : (<section>
                                    <ModalBody>
                                        <ScannerCredential onSuccess={onSuccess} changeSession={false} requireAdmin={true} withoutDelay={true}/>
                                        {userAuthData?.fullName}
                                    </ModalBody>
                                    <ModalFooter className='justify-center'>
                                        <Button variant="shadow" className =" bg-gray-500 text-primary-50 w-[12rem] h-[4rem] text-2xl font-extrabold "
                                            onClick={() => {
                                                setReadQR(false)
                                            }}>
                                    Volver
                                        </Button>
                                        <Button color="danger" variant="shadow" className="w-[12rem] h-[4rem] text-2xl font-extrabold" onClick={() => {
                                            closeModal()
                                        }}>
                                    CANCELAR
                                        </Button>
                                    </ModalFooter>
                                </section>)
                            }

                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
