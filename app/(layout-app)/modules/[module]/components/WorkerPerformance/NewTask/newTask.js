'use client'
import React, { useEffect, useState } from 'react'
import { Autocomplete, AutocompleteItem, Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from '@nextui-org/react'
import useStore from './store'
import { isMobileDevice } from '@/utils/agent'
import { TbShoppingCartPlus } from 'react-icons/tb'
import { notify } from '@/services/notify'

export default function CreateTask ({ users, taskTypes, difficultTypes }) {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [isMobile, setIsMobile] = useState(true)
    const {
        name, setName,
        description, setDescription,
        taskType, setTaskType,
        difficultType, setDifficultType,
        userTask, setUserTask,
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
    return (
        <section>
            <header className="flex justify-end">
                <Button className='bg-emerald-600 dark:bg-emerald-600 font-semibold' color='primary' onClick={onOpen}
                    startContent={<TbShoppingCartPlus size={25}/>}>
                    {isMobile ? '' : 'CREAR TAREA'}
                </Button>
            </header>
            <Modal size={'4xl'}
                isOpen={isOpen}
                backdrop='opaque'
                onClose={() => onClose}
                scrollBehavior={'inside'}
                closeButton={<></>}
                id='modal-supplier'
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200">Nueva tarea</ModalHeader>
                    <ModalBody>
                        <section className="mt-3 grid grid-cols-2">
                            <div className="p-4 flex items-center">
                                <Autocomplete
                                    label="Tipo de tarea"
                                    placeholder="Busca un tipo"
                                    defaultItems={taskTypes}
                                    selectedKey={taskType}
                                    onSelectionChange={(value) => setTaskType(value)}
                                    allowsEmptyCollection={false}
                                    isClearable={false}
                                    variant={'underlined'}
                                >
                                    {(item) => <AutocompleteItem key={item.value}>
                                        {`${item.label}`}
                                    </AutocompleteItem>}
                                </Autocomplete>
                            </div>
                            <div className="p-4 flex items-center">
                                <Autocomplete
                                    label="Responsable"
                                    placeholder="Busca un usuario"
                                    defaultItems={users}
                                    selectedKey={userTask}
                                    onSelectionChange={(value) => setUserTask(value)}
                                    allowsEmptyCollection={false}
                                    isClearable={false}
                                    variant={'underlined'}
                                >
                                    {(item) => <AutocompleteItem key={item.value}>
                                        {`${item.label}`}
                                    </AutocompleteItem>}
                                </Autocomplete>
                            </div>
                            <div className="p-4 flex items-center">
                                <Autocomplete
                                    label="Dificultad"
                                    placeholder="Busca un tipo de dificultad"
                                    defaultItems={difficultTypes}
                                    selectedKey={difficultType}
                                    onSelectionChange={(value) => setDifficultType(value)}
                                    allowsEmptyCollection={false}
                                    isClearable={false}
                                    variant={'underlined'}
                                >
                                    {(item) => <AutocompleteItem key={item.value}>
                                        {`${item.label}`}
                                    </AutocompleteItem>}
                                </Autocomplete>
                            </div>
                            <div className="p-4 flex items-center">
                                <Input
                                    autoFocus={true}
                                    type="text"
                                    value={name}
                                    variant={'underlined'}
                                    label={'Nombre Tarea'}
                                    labelPlacement={'outside'}
                                    placeholder={ 'Ingrese el nombre de la tarea'}
                                    onValueChange={(value) => { setName(value) }}
                                />
                            </div>
                            <div className="p-4 flex items-center">
                                <Textarea
                                    type="text"
                                    value={description}
                                    variant={'underlined'}
                                    label={'Descripción Tarea'}
                                    labelPlacement={'outside'}
                                    placeholder={ 'Ingrese la descripción de la tarea'}
                                    onValueChange={(value) => { setDescription(value) }}
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
                            onClick={() => { requestCreate(taskType, difficultType, userTask, name, description, notify) }}
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
