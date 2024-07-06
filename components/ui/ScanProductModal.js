'use client'
import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react'
import ScannerProduct from '../ScannerProduct/ScannerProduct'

export default function ScanProductModal ({ isOpen, onClose }) {
    const closeModal = () => {
        if (isOpen) {
            onClose()
        }
    }

    return (
        <>
            <div className="flex flex-wrap gap-3 w-max h-max">
            </div>
            <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size={'4xl'} >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 font-extrabold">ESCANEAR PRODUCTO</ModalHeader>
                            <ModalBody>
                                <ScannerProduct changeSession={true} onSuccess={closeModal}/>
                            </ModalBody>
                            <ModalFooter className='justify-center'>
                                <Button color="danger" variant="shadow" className="w-[12rem] h-[4rem] text-2xl font-extrabold" onClick={() => {
                                    closeModal()
                                }}>
                                    Cerrar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
