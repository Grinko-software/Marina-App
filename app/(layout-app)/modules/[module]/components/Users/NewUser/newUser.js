/* eslint-disable no-unused-vars */
'use client'
import React, {
    Suspense,
    createRef,
    useEffect,
    useMemo,
    useState
} from 'react'
import {
    Button,
    Divider,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    dropdown,
    useDisclosure
} from '@nextui-org/react'
import toast, { Toaster } from 'react-hot-toast'
import useStore from './store'
import useInventoryStore from '../../store'
import { BiSolidCategory } from 'react-icons/bi'
import { isMobileDevice } from '@/utils/agent'
import { FaTruck, FaUserPlus } from 'react-icons/fa'

export const notify = (text) => toast(text)

export default function CreateUser ({ handleRefresh }) {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [isMobile, setIsMobile] = useState(true)
    const {
        name,
        setName,
        lastName,
        setLastName,
        email,
        setEmail,
        password,
        setPassword,
        error,
        requestCreate,
        clearStore,
        complete
    } = useStore()

    useEffect(() => {
        if (navigator) {
            const view = isMobileDevice()
            setIsMobile(view)
        }
    }, [])

    useEffect(() => {
        if (complete && !error) {
            closeModal()
        }
    }, [complete, error])

    const closeModal = () => {
        clearStore()
        if (isOpen) {
            onClose()
        }
    }
    return (
        <section>
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                className={
                    ' bg-primary-50 text-primary-500 dark:bg-primary-200 dark:text-primary-500'
                }
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
                }}
            />
            <header className="flex justify-end">
                <Button
                    className="bg-emerald-600 dark:bg-emerald-600 font-semibold"
                    color="primary"
                    onClick={onOpen}
                    startContent={<FaUserPlus size={25} />}
                >
                    {isMobile ? 'CREAR USUARIO' : 'CREAR USUARIO'}
                </Button>
            </header>
            <Modal
                size={'4xl'}
                isOpen={isOpen}
                backdrop="opaque"
                onClose={() => onClose}
                scrollBehavior={'inside'}
                closeButton={<></>}
                id="modal-supplier"
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200">
						Nuevo usuario
                    </ModalHeader>
                    <ModalBody>
                        <section className="mt-3 grid grid-cols-2">
                            <div className="p-4 flex items-center">
                                <Input
                                    autoFocus={true}
                                    type="text"
                                    value={name}
                                    variant={'underlined'}
                                    label={'Nombre'}
                                    labelPlacement={'outside'}
                                    placeholder={'Ingrese el nombre del usuario'}
                                    onValueChange={(value) => {
                                        setName(value)
                                    }}
                                />
                            </div>
                            <div className="p-4 flex items-center">
                                <Input
                                    type="text"
                                    value={lastName}
                                    variant={'underlined'}
                                    label={'Apellido'}
                                    labelPlacement={'outside'}
                                    placeholder={'Ingrese el Apellido del usuario'}
                                    onValueChange={(value) => {
                                        setLastName(value)
                                    }}
                                />
                            </div>
                            <div className="p-4 flex items-center">
                                <Input
                                    type="text"
                                    value={email}
                                    variant={'underlined'}
                                    label={'Correo del usuario'}
                                    labelPlacement={'outside'}
                                    placeholder={'Ingrese el correo del usuario'}
                                    onValueChange={(value) => {
                                        setEmail(value)
                                    }}
                                />
                            </div>
                            <div className="p-4 flex items-center">
                                <Input
                                    type="text"
                                    value={password}
                                    variant={'underlined'}
                                    label={'Contraseña'}
                                    labelPlacement={'outside'}
                                    placeholder={'Ingrese la contraseña del usuario'}
                                    onValueChange={(value) => {
                                        setPassword(value)
                                    }}
                                />
                            </div>
                        </section>
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
                                requestCreate(name, lastName, email, password, notify)
                                handleRefresh()
                                clearStore()
                            }}
                        >
							Crear
                        </Button>
                        <Button
                            color="danger"
                            variant="flat"
                            onClick={() => {
                                closeModal()
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
