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
        cancelPrintSale
    } = salePrintStore()

    const onCalcelHandler = () => {
        cancelPrintSale()
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
                size={'xl'}
                isOpen={isOpen}
                backdrop='blur'
                onClose={() => onClose}
                scrollBehavior={'inside'}
                closeButton={<></>}
                className='w-full'
            >
                <ModalContent className=' overflow-y-scroll'>
                    <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200">
                        {'¿Desesa imprimir comprobante de venta?'}
                    </ModalHeader>
                    <ModalBody>
                        Selecctione si desea imprimir el comprobante de esta venta.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="flat"
                            onClick={() => {
                                onCalcelHandler()
                            }}
                        >
                            {'Cerrar'}
                        </Button>
                        <Button className =" bg-green-500 text-primary-50"
                            onClick={() => { onSubmitHandler() }}
                            // isLoading={isLoading}
                        >
                            {'Imprimir comprobante'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
