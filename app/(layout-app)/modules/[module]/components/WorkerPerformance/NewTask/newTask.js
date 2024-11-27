'use client'
import React, { useEffect, useState } from 'react'
import {
    Autocomplete, AutocompleteItem, Button, Input, Modal, ModalBody,
    ModalContent, ModalFooter, ModalHeader, useDisclosure
} from '@nextui-org/react'
import { DatePicker } from '@nextui-org/date-picker'
import useStore from './store'
import { isMobileDevice } from '@/utils/agent'
import { TbShoppingCartPlus } from 'react-icons/tb'
import { notify } from '@/services/notify'
import useAuthStore from '@/stores/user'
import CustomDatePicker from '@/components/DatePicker/DatePicker'

export default function CreateTask ({ isAdmin = true, users, taskTypes }) {
    const { idUser } = useAuthStore()
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [isMobile, setIsMobile] = useState(true)

    const {
        name, setName,
        description, setDescription,
        taskType, setTaskType,
        userTask, setUserTask,
        dateTask, setDateTask,
        error, requestCreate, clearStore, complete
    } = useStore()

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
    useEffect(() => {
        const adjustScrollOnFocus = (e) => {
            const target = e.target
            if (target.tagName === 'INPUT') {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
        }

        document.addEventListener('focusin', adjustScrollOnFocus)
        return () => document.removeEventListener('focusin', adjustScrollOnFocus)
    }, [])

    return (
        <section>
            <header className="flex justify-end">
                <Button
                    className='bg-emerald-600 dark:bg-emerald-600 font-semibold'
                    color='primary'
                    onClick={onOpen}
                    startContent={<TbShoppingCartPlus size={25} />}
                >
                    {isMobile ? '' : 'CREAR TAREA'}
                </Button>
            </header>
            <Modal
                backdrop="blur"
                isOpen={isOpen}
                placement={'top'}
                size={isMobile ? '' : '4xl'}
                radius="lg"
                id='modal-supplier'
                classNames={{
                    body: 'py-6 w-full h-full',
                    closeButton: 'hidden'
                }}
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200">
                        Nueva tarea
                    </ModalHeader>
                    <ModalBody>
                        <section className=" mt-3 grid gap-4 grid-cols-1 md:grid-cols-2 items-start">
                            <div className="p-4">
                                <Autocomplete
                                    label="Tipo de tarea"
                                    placeholder="Busca un tipo"
                                    defaultItems={taskTypes}
                                    selectedKey={taskType}
                                    onSelectionChange={(value) => {
                                        setTaskType(value)
                                        // document.activeElement.blur()
                                    }}
                                    allowsEmptyCollection={false}
                                    isClearable={true}
                                    variant={'underlined'}
                                    labelPlacement={'outside'}
                                    classNames={{
                                        listbox: 'z-50'
                                    }}
                                    portal
                                >
                                    {(item) => (
                                        <AutocompleteItem key={item.value}>
                                            {`${item.label}`}
                                        </AutocompleteItem>
                                    )}
                                </Autocomplete>
                            </div>
                            {isAdmin && (
                                <div className="p-4">
                                    <Autocomplete
                                        label="Responsable"
                                        placeholder="Busca un usuario"
                                        defaultItems={users}
                                        selectedKey={userTask}
                                        onSelectionChange={(value) => setUserTask(value)}
                                        allowsEmptyCollection={false}
                                        isClearable={false}
                                        variant={'underlined'}
                                        labelPlacement={'outside'}
                                    >
                                        {(item) => (
                                            <AutocompleteItem key={item.value}>
                                                {`${item.label}`}
                                            </AutocompleteItem>
                                        )}
                                    </Autocomplete>
                                </div>
                            )}
                            <div className="p-4">
                                <Input
                                    type="text"
                                    value={name}
                                    variant={'underlined'}
                                    label={'Nombre Tarea'}
                                    labelPlacement={'outside'}
                                    placeholder={'Ingrese el nombre de la tarea'}
                                    onValueChange={(value) => { setName(value) }}
                                />
                            </div>
                            <div className="p-4">
                                <Input
                                    type="text"
                                    value={description}
                                    variant={'underlined'}
                                    label={'Descripción Tarea'}
                                    labelPlacement={'outside'}
                                    placeholder={'Ingrese la descripción de la tarea'}
                                    onValueChange={(value) => { setDescription(value) }}
                                />
                            </div>
                            {isMobile
                                ? <div className="p-4 flex w-full items-end justify-end">
                                    <CustomDatePicker
                                        label="Fecha límite"
                                        placeholder={'Selecciona la fecha de la tarea'}
                                        value={dateTask}
                                        onChange={setDateTask}
                                    />
                                </div>
                                : <div className="p-4">
                                    <DatePicker
                                        variant={'underlined'}
                                        labelPlacement={'outside'}
                                        label="Fecha límite"
                                        placeholder={'Selecciona la fecha de la tarea'}
                                        value={dateTask}
                                        onChange={setDateTask}
                                    />
                                </div>
                            }
                        </section>
                    </ModalBody>
                    <ModalFooter>
                        {error && (
                            <div className='flex mx-5 self-center'>
                                <h1>{error}</h1>
                            </div>
                        )}
                        <Button
                            className="bg-green-500 text-primary-50"
                            onClick={() => {
                                requestCreate(
                                    name,
                                    description,
                                    taskType,
                                    userTask,
                                    dateTask,
                                    notify,
                                    idUser,
                                    isAdmin
                                )
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
