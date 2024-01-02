'use client'
import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react'
import { IoPersonSharp } from 'react-icons/io5'

export default function PaymentOfMoneyModal ({ isOpen, onClose }) {
    return (
        <>
            <div className="flex flex-wrap gap-3 w-max h-max">
            </div>
            <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size='xl' >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200">Retiro de efectivo</ModalHeader>
                            <ModalBody>
                                <Input
                                    size='lg'
                                    type="number"
                                    label="Cantidad"
                                    placeholder="0"
                                    labelPlacement="outside"
                                    startContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">$</span>
                                        </div>
                                    }
                                />
                                <Input
                                    size='lg'
                                    type="text"
                                    label="Detalle"
                                    labelPlacement="outside"
                                    placeholder="Ingrese detalles del retiro"
                                />
                                <Input
                                    size='lg'
                                    label="Encargado"
                                    placeholder="Usuario"
                                    labelPlacement="outside"
                                    startContent={
                                        <IoPersonSharp className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button className ="dark" onClick={onClose}>
                                    Aceptar
                                </Button>
                                <Button color="danger" variant="light" onClick={onClose}>
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
