/* eslint-disable no-unused-vars */
'use client'
import React, { Suspense, createRef, useEffect, useMemo, useState } from 'react'
import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, dropdown, useDisclosure } from '@nextui-org/react'
import toast, { Toaster } from 'react-hot-toast'
import useStore from './store'
import useInventoryStore from '../../store'
export const notify = (text) => toast(text)
export default function CreateCategory () {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const { error, name, setName, requestCreateCategory, clearStore, complete } = useStore(
        ({ error, name, setName, requestCreateCategory, clearStore, complete }) =>
            ({ error, name, setName, requestCreateCategory, clearStore, complete }))
    const { getCategories } = useInventoryStore(({ getCategories }) => ({ getCategories }))
    useEffect(() => {
        if (complete && !error) {
            clearStore()
            onClose()
            getCategories()
        }
    }, [complete, error])
    return (
        <section>
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                className={' bg-primary-50 text-primary-500 dark:bg-primary-200 dark:text-primary-500'}
                toastOptions={{
                    className: '',
                    duration: 10000,
                    success: {
                        duration: 3000,
                        theme: {
                            primary: 'green',
                            secondary: 'black'
                        }
                    }
                }} />
            <header className="flex justify-end">
                <Button className='bg-primary-400 dark:bg-primary-400' color='primary' onClick={onOpen}>Crear nueva categoría</Button>
            </header>
            <Modal size={'2xl'}
                isOpen={isOpen}
                backdrop='opaque'
                onClose={() => onClose}
                scrollBehavior={'inside'}
                closeButton={<></>}
                id='modal-category'
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200">Nueva categoría</ModalHeader>
                    <ModalBody>
                        <section className="mt-3 space-y-2">

                            <div className="my-4 flex items-center gap-4">
                                <Input
                                    autoFocus={true}
                                    type="text"
                                    variant={'underlined'}
                                    label={''}
                                    labelPlacement={'outside'}
                                    placeholder={ 'Ingrese el nombre de la categoría'}
                                    onValueChange={(value) => { setName(value) }}
                                />
                            </div>
                        </section>
                    </ModalBody>
                    <ModalFooter>
                        {error
                            ? <div className='flex mx-5 self-center'>
                                <h1>{error}</h1>
                            </div>
                            : null}
                        <Button className =" bg-green-500 text-primary-50"
                            onClick={() => { requestCreateCategory(name, notify) }}
                        >
                            Crear
                        </Button>
                        <Button color="danger" variant="flat"
                            onClick={() => {
                                onClose()
                                clearStore()
                            }}
                        >
                            Cerrar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </section>
    )
}
