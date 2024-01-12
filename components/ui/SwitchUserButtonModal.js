'use client'
import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react'
import ScannerCredential from '../ScannerCredential/ScannerCredential'
import ScannerController from '../ScannerController/ScannerController'

export default function SwitchUserModal ({ isOpen, onClose }) {
    const closeModal = () => {
        if (isOpen) {
            onClose()
        }
    }

    return (
        <>
            <div className="flex flex-wrap gap-3 w-max h-max">
            </div>
            <ScannerController scanEnabled={!isOpen} authEnabled={isOpen} authModeFunction={null}/>

            <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size={'4xl'} >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 font-extrabold">CAMBIAR SESIÓN</ModalHeader>
                            <ModalBody>
                                <ScannerCredential changeSession={true} onSuccess={closeModal}/>
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
