'use client'
import React, { useEffect, useState } from 'react'
import { Input, Checkbox, Button, Modal, ModalBody, ModalHeader, ModalContent, ModalFooter } from '@nextui-org/react'
import credit from '@/assets/images/registryBox.png'
import InitCashReconciliationCard from '../../ui/InitCashReconciliationCard'
import Lottie from 'lottie-react'
import QR from '@/assets/gifs/QR.json'
import useCashBalanceStore from '../store'
import { getCashRegister } from '@/services/cashRegister'
import { getIdUser } from '@/services/user'
export default function InitCashCounting ({ isOpen, onClose, isInit, setIsInit, setStatusCashRegister }) {
    const { getLastIndicatorsCashBalanceEnding, createBalanceBeginnings } = useCashBalanceStore(({ getLastIndicatorsCashBalanceEnding, createBalanceBeginnings }) => ({ getLastIndicatorsCashBalanceEnding, createBalanceBeginnings }))
    const [isSelected, setIsSelected] = useState(0)
    const [readQR, setReadQR] = useState(false)
    const [paymentDetailed, setPayDetailed] = useState(0)
    const [lastBalance, setLastBalance] = useState(null)
    const onHandlerBalance = () => {
        if (getCashRegister()?.ID) {
            createBalanceBeginnings(getCashRegister()?.ID, getIdUser(), 'Inicio de caja', paymentDetailed, setStatusCashRegister, setReadQR, onClose)
        }
    }
    useEffect(() => {
        if (getCashRegister()?.ID !== 'no-select') {
            getLastIndicatorsCashBalanceEnding(getCashRegister()?.ID, setLastBalance)
        }
    }, [])

    return (
        <>
            <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size={'4xl'} >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 font-extrabold">INICIO DE CAJA</ModalHeader>
                            <ModalBody>
                                {!readQR
                                    ? <div className=" space-y-12">
                                        <div className='flex flex-row w-full space-x-4'>
                                            <InitCashReconciliationCard
                                                title={ lastBalance ? 'Saldo cierre de caja anterior' : 'No se ha registrado un cierre de caja anterior'}
                                                total={lastBalance || '-'}
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
                                            size='lg'
                                            isRequired={true}
                                            type="number"

                                            label={
                                                <span className=" uppercase font-bold text-lg text-black dark:text-white ">Cantidad de dinero en caja</span>
                                            }
                                            value={paymentDetailed}
                                            placeholder="0"
                                            labelPlacement="outside"
                                            startContent={
                                                <div className="pointer-events-none flex items-center">
                                                    <span className="text-default-400 text-small">$</span>
                                                </div>
                                            }
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
                                    : <Lottie animationData={QR} loop={true} />
                                }
                            </ModalBody>
                            <ModalFooter className='justify-center'>
                                <Button variant="shadow" className =" bg-green-500 text-primary-50 w-[12rem] h-[4rem] text-2xl font-extrabold "
                                    onClick={() => {
                                        // setIsInit(true)
                                        onHandlerBalance()
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
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>)
}
