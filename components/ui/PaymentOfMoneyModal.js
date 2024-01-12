'use client'
import React, { useState, useEffect } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react'
import useScannerStore from '@/stores/scanner'
import ScannerCredential from '../ScannerCredential/ScannerCredential'

export default function PaymentOfMoneyModal ({ isOpen, onClose }) {
    const [paymentDetailed, setPayDetailed] = useState(false)
    const [readQR, setReadQR] = useState(false)
    const [userAuthData, setUserAuthData] = useState(null)
    const { /* enabledScanner, disabledScanner, */ disabledAuthMode } = useScannerStore()

    useEffect(() => {
        if (userAuthData) {
            // setReadQR(false)
            // alert(userAuthData?.fullName)
        }
    }, [userAuthData])

    useEffect(() => {
        setReadQR(false)
    }, [])

    /*     useEffect(() => {
        if (isOpen) {
            disabledScanner()
        } else {
            enabledScanner()
        }
    }, [isOpen])
 */
    const onScanFunction = (data) => {
        setUserAuthData(data)
        // disabledAuthMode()
        // setReadQR(false)
    }

    const closeModal = () => {
        disabledAuthMode()
        setReadQR(false)
        onClose()
    }

    return (
        <>
            <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size={'4xl'} className="space-y-2" >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 font-extrabold text-2xl">RETIRO EN EFECTIVO</ModalHeader>
                            {!readQR
                                ? <ModalBody>
                                    <div className=" space-y-12">
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
                                                <span className="font-bold text-lg text-black dark:text-white ">CANTIDAD</span>
                                            }
                                            placeholder="0"
                                            labelPlacement="outside"
                                            value={paymentDetailed}
                                            startContent={
                                                <div className="pointer-events-none flex items-center">
                                                    <span className="text-default-400 text-small dark:text-white">$</span>
                                                </div>
                                            }
                                        />
                                        <Input
                                            size='lg'
                                            type="text"
                                            label={
                                                <span className="font-bold text-lg text-black dark:text-white ">DETALLE</span>
                                            }
                                            labelPlacement="outside"
                                            placeholder="Ingrese detalles del retiro"
                                        />
                                    </div>
                                </ModalBody>
                                : <ModalBody>
                                    <ScannerCredential onGetUserData={onScanFunction} />
                                    {userAuthData?.fullName}
                                </ModalBody>}
                            <ModalFooter className='justify-center'>
                                <Button variant="shadow" className =" bg-green-500 text-primary-50 w-[12rem] h-[4rem] text-2xl font-extrabold "
                                    onClick={() => {
                                        setReadQR(true)
                                    }}>
                                    ACEPTAR
                                </Button>
                                <Button color="danger" variant="shadow" className="w-[12rem] h-[4rem] text-2xl font-extrabold" onClick={() => {
                                    closeModal()
                                }}>
                                    CANCELAR
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
