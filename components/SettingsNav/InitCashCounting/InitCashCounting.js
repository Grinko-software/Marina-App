/* eslint-disable no-unused-vars */
'use client'
import React, { useEffect, useState } from 'react'
import { Input, Checkbox, Button, Modal, ModalBody, ModalHeader, ModalContent, ModalFooter } from '@nextui-org/react'
import credit from '@/assets/images/registryBox.png'
import InitCashReconciliationCard from '../../ui/InitCashReconciliationCard'
import Lottie from 'lottie-react'
import QR from '@/assets/gifs/QR.json'
import useCashBalanceStore from '../store'
import useSettingsStore from '@/stores/settings'
import { getCashRegister } from '@/services/cashRegister'
import { getIdUser } from '@/services/account'
import { notify } from '@/services/notify'
import { formatterNumber } from '@/utils/number'
import { today } from '@/utils/date'
import useAuthStore from '@/stores/user'
import useScannerStore from '@/stores/scanner'
import ScannerCredential from '@/components/ScannerCredential/ScannerCredential'
export default function InitCashCounting ({ isOpen, onClose, setStatusCashRegister }) {
    const { /* enabledScanner, disabledScanner, */ disabledAuthMode } = useScannerStore()
    const { setDisabled } = useSettingsStore(({ setDisabled }) => ({ setDisabled }))
    const { getLastIndicatorsCashBalanceEnding, createBalanceBeginnings, openDrawer } = useCashBalanceStore(({ getLastIndicatorsCashBalanceEnding, createBalanceBeginnings, openDrawer }) => ({ getLastIndicatorsCashBalanceEnding, createBalanceBeginnings, openDrawer }))
    const [isSelected, setIsSelected] = useState(0)
    const [readQR, setReadQR] = useState(false)
    const [paymentDetailed, setPayDetailed] = useState(null)
    const [lastBalance, setLastBalance] = useState(null)
    const [detail, setDetail] = useState(null)
    const [userAuthData, setUserAuthData] = useState(null)
    const onHandleState = () => {
        setDisabled(false)
        setReadQR(false)
        onClose()
    }
    const onHandlerBalance = () => {
        if (getCashRegister()?.ID) {
            createBalanceBeginnings(getCashRegister()?.ID, getIdUser(), detail, paymentDetailed, setStatusCashRegister, notify, onHandleState)
        }
    }
    const handlerOpenDrawer = () => {
        const { fullName } = useAuthStore.getState()
        const body = {
            event_type: 'Inicio de caja', date: today().format('DD-MM-YYYY HH:mm:ss'), cash_registry_name: getCashRegister()?.name, user_name: fullName
        }
        openDrawer(getCashRegister()?.ID, notify, body)
    }
    const onHandlerDrawals = () => {
        setReadQR(true)
    }
    const onSuccess = (data) => {
        setUserAuthData(data)
        onHandlerBalance()
    }
    const closeModal = () => {
        disabledAuthMode()
        setReadQR(false)
        onClose()
        setPayDetailed(0)
    }
    useEffect(() => {
        if (userAuthData) {
            // setReadQR(false)
            alert(userAuthData?.fullName)
        }
    }, [userAuthData])
    useEffect(() => {
        if (getCashRegister()?.ID !== 'no-select') {
            getLastIndicatorsCashBalanceEnding(getCashRegister()?.ID, setLastBalance, handlerOpenDrawer)
        } else {
            onClose()
            setTimeout(() => {
                notify('⚙️ Se debe seleccionar una caja en ajustes para continuar!')
            }, [500])
        }
    }, [])

    return (
        <>
            <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size={'4xl'} >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 font-extrabold">INICIO DE CAJA</ModalHeader>
                            {!readQR
                                ? <section>
                                    <ModalBody>
                                        <div className=" space-y-12">
                                            <div className='flex flex-row w-full space-x-4'>
                                                <InitCashReconciliationCard
                                                    title={ lastBalance ? 'Saldo cierre de caja anterior' : 'No se ha registrado un cierre de caja anterior'}
                                                    total={ lastBalance?.total_ending_real_cash_balance ? formatterNumber(lastBalance?.total_ending_real_cash_balance) : '-'}
                                                    bgTitle={'bg-black/40'}
                                                    img={credit}
                                                    detail={'La cantidad de saldo anterior no siempre coincidirá con la cantidad de dinero con la que se inicia la jornada'}
                                                />
                                            </div>
                                            <section className="flex flex-row space-x-3">
                                                <Button variant="shadow" className=' w-[10rem] h-[8rem] bg-green-700  text-white font-extrabold text-3xl'
                                                    onClick={() => setPayDetailed(paymentDetailed + 1000) }>
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
                                                size="lg"
                                                min={0}
                                                type="number"
                                                label={
                                                    <span className=" uppercase font-bold text-lg text-black dark:text-white ">Cantidad de dinero en caja</span>
                                                }
                                                value={paymentDetailed}
                                                placeholder={'0'}
                                                labelPlacement="outside"
                                                startContent={
                                                    <div className="pointer-events-none flex items-center">
                                                        <span className="text-default-400 text-small">$</span>
                                                    </div>
                                                }
                                                onValueChange={(value) => { if (value) { setPayDetailed(parseFloat(value)) } }}
                                            />
                                            <div className="flex flex-col">
                                                <Checkbox
                                                    isSelected={isSelected}
                                                    color="danger"
                                                    onValueChange={setIsSelected}>
                                            Aceptar
                                                </Checkbox>
                                                <p className="text-default-500 italic">
                                        Al hacer clic en Aceptar, confirmo que revisé y aprobé los cálculos del inicio de caja.
                                                    Esta acción representa mi conformidad con la precisión de las transacciones y la cantidad de efectivo en la caja.
                                                </p>
                                            </div>
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
                                            setReadQR(false)
                                            onClose()
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
                                </section>)}
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
