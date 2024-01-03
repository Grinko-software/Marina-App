'use client'
import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react'
import { IoPersonSharp } from 'react-icons/io5'
import credit from '@/assets/images/credit.jpg'
import cash from '@/assets/images/cash.jpeg'
import CashReconciliationCard from './CashReconciliationCard'

export default function CashReconciliationModal ({ isOpen, onClose }) {
    return (
        <>
            <div className="flex flex-wrap gap-3 w-max h-max">
            </div>
            <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size={'4xl'} >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 font-extrabold">CIERRE DE CAJA</ModalHeader>
                            <ModalBody>
                                <div className=" space-y-16">
                                    <div className='flex flex-row w-full space-x-4'>
                                        <CashReconciliationCard
                                            title={'Ventas en Debito/Credito'}
                                            total={'$900.000'}
                                            bgTitle={'bg-black/40'}
                                            img={credit}
                                            detail={'Total de ingresos en tarjetas de debito/credito del dia'}
                                        />
                                        <CashReconciliationCard
                                            title={'Ventas en Efectivo'}
                                            total={'$900.000'}
                                            bgTitle={'bg-green-600/40'}
                                            img={cash}
                                            detail={'Total de ingresos en efectivo del dia'}
                                        />
                                        <CashReconciliationCard
                                            title={'Egresos/pagos'}
                                            total={'$900.000'}
                                            bgTitle={'bg-green-600/40'}
                                            img={cash}
                                            detail={'Total de egresos de caja diarios (pagos)'}
                                        />
                                    </div>
                                    <Input
                                        size='lg'
                                        type="text"
                                        label="Detalle"
                                        labelPlacement="outside"
                                        placeholder="Ingrese detalles del retiro"
                                    />
                                    <Input
                                        size='lg'
                                        label="Usuario"
                                        placeholder="Escanée su llave"
                                        labelPlacement="outside"
                                        isRequired={true}
                                        startContent={
                                            <IoPersonSharp className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                                        }
                                    />
                                </div>
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
