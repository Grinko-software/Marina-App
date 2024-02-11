/* eslint-disable no-unused-vars */
'use client'
import React, { Suspense, createRef, useEffect, useMemo, useState } from 'react'
import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, dropdown, useDisclosure } from '@nextui-org/react'
import toast from 'react-hot-toast'
import useStore from './store'
import useInventoryStore from '../../store'
import { BiSolidCategory } from 'react-icons/bi'
import { isMobileDevice } from '@/utils/agent'
import { notify } from '@/services/notify'
import { DeleteIcon } from '@/components/ui/DeleteIcon'
export default function CreateCategory () {
    const [sectionCreateCategory, setSectionCreateCategory] = useState(false)
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [openModal, setOpenModal] = useState(false)
    const [type, setType] = useState('Eliminar')
    const [target, setTarget] = useState(null)
    const [value, setValue] = useState('')
    const [invalid, setInvalid] = useState(false)
    const [isMobile, setIsMobile] = useState(true)
    const { deleteCategory, error, name, setName, requestCreateCategory, clearStore, complete } = useStore(
        ({ deleteCategory, error, name, setName, requestCreateCategory, clearStore, complete }) =>
            ({ deleteCategory, error, name, setName, requestCreateCategory, clearStore, complete }))
    const { handlCategoriesRequest, listCategories } = useInventoryStore(({ handlCategoriesRequest, listCategories }) => ({ handlCategoriesRequest, listCategories }))

    const DeleteCard = ({ item }) => {
        const { label, id } = item
        const [loadingDelete, setLoadingDelete] = useState(false)

        const handleOpenModalConfirmm = (item) => {
            // setLoadingDelete(true)
            setOpenModal(true)
            setTarget(item)
            // deleteCategory({ id, notify, deleteAction })
        }

        return <div className="flex gap-2 flex-row w-full items-center border rounded-xl pr-2">

            <section className='flex-1 flex gap-2 flex-wrap p-4'>
                <div className="flex flex-1 min-w-[8rem] flex-col">
                    <span className="text-md">{label?.toUpperCase()}</span>
                </div>
                <div className="flex flex-1 min-w-[8rem] flex-col">
                </div>
                <div className="flex flex-1 min-w-[8rem] flex-col">
                </div>
            </section>
            <Button className='' isLoading={loadingDelete} variant='flat' color='danger' isIconOnly
                onClick={() => handleOpenModalConfirmm(item)}>
                {!loadingDelete
                    ? <DeleteIcon/>
                    : null}
            </Button>
        </div>
    }
    const deleteAction = () => {
        setOpenModal(false)
        setTarget(null)
        setValue('')
        setInvalid(false)
        handlCategoriesRequest()
        clearStore()
        onClose()
    }
    const handleDeleteCategory = (id) => {
        setOpenModal(true)
        deleteCategory({ id, notify, deleteAction })
    }

    const controlInputToDelete = (id) => {
        if (value === target?.label) {
            setInvalid(false)
            handleDeleteCategory(id)
            // delete
        } else {
            setInvalid(true)
        }
    }
    const close = () => {
        setOpenModal(false)
    }
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
            handlCategoriesRequest()
        }
    }, [complete, error])
    return (
        <section>
            <header className="flex justify-end">
                <Button className='bg-emerald-600 dark:bg-emerald-600 font-semibold' color='primary' onClick={onOpen}
                    startContent={<BiSolidCategory size={25}/>}>
                    {isMobile ? '' : 'CATEGORÍAS'}
                </Button>
            </header>
            <Modal size={'2xl'}
                isOpen={isOpen}
                backdrop='opaque'
                onClose={() => onClose}
                scrollBehavior={'inside'}
                closeButton={<></>}
                id='modal-category'
            >
                { sectionCreateCategory
                    ? <ModalContent>
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
                    : <ModalContent>
                        <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200">Categorías</ModalHeader>
                        <ModalBody>
                            <section className='flex flex-col gap-2'>
                                {(listCategories)?.length
                                    ? listCategories.map((item) => {
                                        return (
                                            <DeleteCard
                                                key={item.id}
                                                item={item}

                                            />
                                        )
                                    })
                                    : <div>No se encuentran categorías</div>}

                            </section>
                        </ModalBody>
                        <ModalFooter>
                            {error
                                ? <div className='flex mx-5 self-center'>
                                    <h1>{error}</h1>
                                </div>
                                : null}
                            <Button className =" bg-green-500 text-primary-50"
                                onClick={() => {
                                    setSectionCreateCategory(true)
                                    // requestCreateCategory(name, notify)
                                }}
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

                }
            </Modal>
            <Modal
                backdrop="opaque"
                isOpen={openModal}
                radius="2xl"
                classNames={
                    {
                        body: 'py-6',
                        backdrop: 'backdrop-opacity-75',
                        base: `${type === 'Eliminar' ? 'border-[#C70039] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]' : 'border-[#ffd700] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]'}`,
                        header: `${type === 'Eliminar' ? 'border-b-[1px] border-[#C70039]' : ' border-b-[1px] border-[#ffd700]'}`,
                        footer: `${type === 'Eliminar' ? 'border-t-[1px] border-[#C70039]' : 'border-t-[1px] border-[#ffd700]'}`,
                        closeButton: 'hover:bg-white/5 active:bg-white/10'
                    }}
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 font-bold items-center">{type} Categoría</ModalHeader>
                    <ModalBody>

                        {type === 'Eliminar'
                            ? <div className='flex flex-col justify-between mx-10 gap-4'>
                                <p>Se eliminará la categoría :<p className='font-bold'>{target?.label}</p></p>
                                <p>Para confirmar, debes ingresar el nombre de la categoría</p>
                                <Input
                                    classNames={'max-w-xs' }
                                    isInvalid={invalid}
                                    color={invalid ? 'danger' : ''}
                                    errorMessage={invalid && 'Respuesta invalida'}
                                    isRequired
                                    type="text"
                                    label="Categoría"
                                    onValueChange={setValue}
                                />
                            </div>
                            : <div className='flex flex-col justify-between mx-10 gap-4'>
                                <p>Se modificara la categoría:<p className='font-bold'>{target?.label}</p></p>
                                <p>¿Esta seguro que desea modificar la categoría?</p>
                            </div>
                        }

                    </ModalBody>
                    <ModalFooter className='justify-center'>
                        <Button color="foreground" variant="light" onPress={close}>
                                    Cancelar
                        </Button>
                        <Button color={`${type === 'Eliminar' ? 'danger' : 'warning'}`} className="shadow-lg shadow-indigo-500/20"
                            onPress={() => { controlInputToDelete(target?.id) }}
                            onClose={close} >
                                    Aceptar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </section>
    )
}
