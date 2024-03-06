/* eslint-disable no-unused-vars */
'use client'
import React, { useState, useEffect } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Card, CardBody, Image, Input, useDisclosure } from '@nextui-org/react'
import salePrintStore from './store'

export default function SalePrinterModal () {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false)
    const {
        printBodyLastSale,
        setPrintBodyLastSale,
        requestPrintSale,
        cancelPrintSale,
        downdloadVoucher
    } = salePrintStore()

    const onCancelHandler = () => {
        cancelPrintSale()
    }
    const onDowndloadVoucher = () => {
        // cancelPrintSale()
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 1000)
        downdloadVoucher({ printBodyLastSale })
    }

    const onSubmitHandler = () => {
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 1000)
        requestPrintSale({ printBodyLastSale })
    }

    useEffect(() => {
        if (printBodyLastSale) {
            if (!isOpen) onOpen()
        } else {
            if (isOpen) onClose()
        }
    }, [printBodyLastSale, isOpen])

    return (
        <>
            <Modal
                size='5xl'
                className='h-[23rem]'
                isOpen={isOpen}
                backdrop='blur'
                onClose={() => onClose}
                scrollBehavior={'inside'}
                closeButton={<></>}
            >
                <ModalContent className='overflow-hidden space-y-[2.5rem]'>
                    <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200 text-[2rem]">
                        <h4 className='flex flex-col items-center'>
                            {'¿Desesa imprimir comprobante de venta?'}
                        </h4>
                    </ModalHeader>
                    <div className='flex flex-col items-center'>
                        <div className='flex flex-row space-x-3 '>
                            <Button
                                color="danger"
                                variant="flat"
                                className='text-[1.5rem] w-[17rem] h-[8rem]'
                                onClick={() => {
                                    onCancelHandler()
                                }}
                            >
                                {'Cerrar'}
                            </Button>
                            <Button
                                className="bg-blue-500 text-primary-50 text-[1.5rem] w-[17rem] h-[8rem]"
                                variant="flat"
                                onClick={() => { onDowndloadVoucher() }}
                            >
                                {'Descargar pdf'}
                            </Button>
                            <Button
                                className="bg-green-500 text-primary-50 text-[1.5rem] w-[17rem] h-[8rem]"
                                onClick={() => { onSubmitHandler() }}
                            >
                                {'Imprimir comprobante'}
                            </Button>
                        </div>
                    </div>

                </ModalContent>
            </Modal>
        </>
    )
}
