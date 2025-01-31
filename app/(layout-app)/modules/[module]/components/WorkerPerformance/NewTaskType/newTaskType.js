'use client'
import React, { useEffect, useState } from 'react'
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure
} from '@nextui-org/react'
import useStore from './store'
import { isMobileDevice } from '@/utils/agent'
import { BiPlusCircle } from 'react-icons/bi'
import { notify } from '@/services/notify'

export default function CreateTaskType () {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [isMobile, setIsMobile] = useState(true)
    const { name, setName, requestCreate, clearStore, complete, error } =
		useStore()

    useEffect(() => {
        if (navigator) {
            const view = isMobileDevice()
            setIsMobile(view)
        }
    }, [])

    useEffect(() => {
        if (complete && !error) {
            clearStore()
            onClose()
        }
    }, [complete, error])
    return (
        <section>
            <header className="flex justify-end">
                <Button
                    className="bg-emerald-600 dark:bg-emerald-600 font-semibold"
                    color="primary"
                    onClick={onOpen}
                    startContent={<BiPlusCircle size={25} />}
                >
                    {isMobile ? '' : 'CREAR TIPO DE TAREA'}
                </Button>
            </header>
            <Modal
                size={'4xl'}
                isOpen={isOpen}
                backdrop="opaque"
                onClose={() => onClose}
                scrollBehavior={'inside'}
                closeButton={<></>}
                id="modal-task-type"
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200">
						Nuevo tipo de tarea
                    </ModalHeader>
                    <ModalBody>
                        <div className="p-4 flex items-center">
                            <Input
                                autoFocus={true}
                                type="text"
                                value={name}
                                variant={'underlined'}
                                label={'Nombre tipo de tarea'}
                                labelPlacement={'outside'}
                                placeholder={'Ingrese el nombre'}
                                onValueChange={(value) => {
                                    setName(value)
                                }}
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {error
                            ? (
                                <div className="flex mx-5 self-center">
                                    <h1>{error}</h1>
                                </div>
                            )
                            : null}
                        <Button
                            className=" bg-green-500 text-primary-50"
                            onClick={() => {
                                requestCreate(name, notify)
                            }}
                        >
							Crear
                        </Button>
                        <Button
                            color="danger"
                            variant="flat"
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
