'use client'
import React, { useState } from 'react'
import { Input, Checkbox, Button, Modal, ModalBody, ModalHeader, ModalContent, ModalFooter } from '@nextui-org/react'
import credit from '@/assets/images/registryBox.png'
import InitCashReconciliationCard from './InitCashReconciliationCard'
import Lottie from 'lottie-react'
import QR from '@/assets/gifs/QR.json'

export default function InitCashCounting ({ isOpen, onClose, isInit, setIsInit }) {
    const [isSelected, setIsSelected] = useState()
    const [readQR, setReadQR] = useState(false)
    return (
        <>
            <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size={'4xl'} >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 font-extrabold">CIERRE DE CAJA</ModalHeader>
                            <ModalBody>
                                {!readQR
                                    ? <div className=" space-y-12">
                                        <div className='flex flex-row w-full space-x-4'>
                                            <InitCashReconciliationCard
                                                title={'Saldo cierre de caja anterior'}
                                                total={'$900.000'}
                                                bgTitle={'bg-black/40'}
                                                img={credit}
                                                detail={'La cantidad de saldo anterior no siempre coincidirá con la cantidad de dinero con la que se inicia la jornada'}
                                            />
                                        </div>
                                        <Input
                                            size='lg'
                                            isRequired={true}
                                            type="number"

                                            label={
                                                <span className=" uppercase font-bold text-lg text-black dark:text-white ">Cantidad de dinero en caja</span>
                                            }
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
                                        setIsInit(true)
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
