/* eslint-disable no-unused-vars */
'use client'
import { Scanner } from '@yudiel/react-qr-scanner'
import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ScrollShadow, Select, SelectItem, dropdown, useDisclosure } from '@nextui-org/react'
import React, { Suspense, createRef, useEffect, useMemo, useState } from 'react'
import { FaCamera } from 'react-icons/fa'
import { productCreated } from '../services'
import useStore from '../../store'
import { notify } from '@/services/notify'

export const Camera = ({ setOpenModal, setTargetProduct, resultCamera, setResultCamera }) => {
    const { listInventory } = useStore()
    const { isOpen, onClose, onOpen } = useDisclosure()

    useEffect(() => {
        if (resultCamera) {
            const findCode = productCreated({ listInventory, code: resultCamera })
            if (findCode) {
                notify('✅  Producto encontrado !')
                setTargetProduct(findCode)
                setOpenModal(false)
            } else {
                notify('❌ Este producto no se encuentra registrado!')
                setOpenModal(true)
            }
            onClose()
        }
    }, [resultCamera])
    return <section>
        <header className="flex justify-end space-x-3">
            <Button
                className='bg-amber-400 dark:bg-amber-400 font-semibold' color='danger' variant="bordered"
                onClick={
                    () => {
                        // setResultCamera(null)
                        onOpen()
                    }}
                startContent={<FaCamera size={25}/>}>

            </Button>
        </header>

        <Modal
            size={'3xl'}
            isOpen={isOpen}
            backdrop='blur'
            onClose={() => onClose}
            scrollBehavior={'inside'}
            closeButton={<></>}
        >
            <ModalContent className=' overflow-y-scroll'>
                <ModalHeader className="flex flex-col gap-1 text-center text-primary-500 dark:text-primary-200">{'Escanear código'}</ModalHeader>
                <div className='flex flex-col items-center justify-center h-[20rem] w-full'>
                    <div className='flex flex-col items-center justify-center h-[20rem] w-[20rem]'>
                        <Scanner
                            enabled={true}
                            onResult={(text, result) => {
                                setResultCamera(text)
                                console.debug(text, result)
                            }}
                            scanning={(value) => console.log(value)}
                            onError={(error) => console.log(error?.message)}
                        />
                    </div>

                </div>
                <ModalFooter className='flex justify-between'>
                    <Button color="danger"
                        className='w-full'
                        onClick={() => {
                            setResultCamera(null)
                            setTargetProduct(null)
                            setTargetProduct(null)
                            onClose()
                        }}
                    >
                        {'Cerrar'}
                    </Button>
                </ModalFooter>
            </ModalContent>

        </Modal>
    </section>
}
export default Camera
