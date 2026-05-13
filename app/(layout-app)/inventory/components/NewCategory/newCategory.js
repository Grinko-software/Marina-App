/* eslint-disable no-unused-vars */
'use client'
import React, {
    useEffect,
    useMemo,
    useState
} from 'react'
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
import useInventoryStore from '../../store'
import { BiSolidCategory, BiPlus, BiSearch } from 'react-icons/bi'
import { isMobileDevice } from '@/utils/agent'
import { notify } from '@/services/notify'
import { DeleteIcon } from '@/components/ui/DeleteIcon'

export default function CreateCategory () {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [openModal, setOpenModal] = useState(false)
    const [type, setType] = useState('Eliminar')
    const [target, setTarget] = useState(null)
    const [value, setValue] = useState('')
    const [invalid, setInvalid] = useState(false)
    const [isMobile, setIsMobile] = useState(true)
    const [search, setSearch] = useState('')

    const {
        deleteCategory,
        error,
        name,
        setName,
        requestCreateCategory,
        clearStore,
        complete
    } = useStore(
        ({
            deleteCategory,
            error,
            name,
            setName,
            requestCreateCategory,
            clearStore,
            complete
        }) => ({
            deleteCategory,
            error,
            name,
            setName,
            requestCreateCategory,
            clearStore,
            complete
        })
    )

    const { handlCategoriesRequest, listCategories } = useInventoryStore(
        ({ handlCategoriesRequest, listCategories }) => ({
            handlCategoriesRequest,
            listCategories
        })
    )

    const filteredCategories = useMemo(() => {
        if (!listCategories) return []
        if (!search.trim()) return listCategories
        return listCategories.filter(item =>
            item.label.toLowerCase().includes(search.toLowerCase())
        )
    }, [listCategories, search])

    const deleteAction = () => {
        setOpenModal(false)
        setTarget(null)
        setValue('')
        setInvalid(false)
        handlCategoriesRequest()
        clearStore()
    }

    const handleDeleteCategory = (id) => {
        setOpenModal(true)
        deleteCategory({ id, notify, deleteAction })
    }

    const controlInputToDelete = (id) => {
        if (value === target?.label) {
            setInvalid(false)
            handleDeleteCategory(id)
        } else {
            setInvalid(true)
        }
    }

    const close = () => {
        setOpenModal(false)
    }

    const handleCreate = () => {
        if (name?.trim()) {
            requestCreateCategory(name, notify)
        }
    }

    useEffect(() => {
        if (navigator) {
            setIsMobile(isMobileDevice())
        }
    }, [])

    useEffect(() => {
        if (complete && !error) {
            clearStore()
            handlCategoriesRequest()
        }
    }, [complete, error])

    return (
        <section>
            <header className="flex justify-end">
                <Button
                    className="bg-emerald-600 dark:bg-emerald-600 font-semibold"
                    color="primary"
                    onClick={onOpen}
                    startContent={<BiSolidCategory size={25} />}
                >
                    {isMobile ? '' : 'CATEGORÍAS'}
                </Button>
            </header>

            <Modal
                size={'2xl'}
                isOpen={isOpen}
                backdrop="opaque"
                onClose={onClose}
                scrollBehavior={'inside'}
                closeButton={<></>}
                id="modal-category"
            >
                <ModalContent>
                    <ModalHeader className="flex items-center justify-between gap-2">
                        <span className="text-primary-500 dark:text-primary-200 font-semibold">
							Categorías
                        </span>
                        <span className="text-sm text-default-400 font-normal">
                            {listCategories?.length ?? 0} en total
                        </span>
                    </ModalHeader>

                    <ModalBody className="gap-3">
                        <div className="sticky top-0 z-10 bg-content1 flex flex-col gap-3 pb-2">
                            <div className="flex gap-2 items-center">
                                <Input
                                    autoFocus
                                    variant="bordered"
                                    placeholder="Nueva categoría..."
                                    value={name}
                                    onValueChange={setName}
                                    onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                                    classNames={{ base: 'flex-1' }}
                                />
                                <Button
                                    isIconOnly
                                    className="bg-emerald-600 text-white shrink-0"
                                    onClick={handleCreate}
                                    title="Agregar categoría"
                                >
                                    <BiPlus size={20} />
                                </Button>
                            </div>

                            {error && (
                                <p className="text-danger text-sm px-1">{error}</p>
                            )}

                            <Input
                                variant="flat"
                                placeholder="Buscar categoría..."
                                value={search}
                                onValueChange={setSearch}
                                startContent={<BiSearch className="text-default-400" size={18} />}
                            />
                        </div>

                        {filteredCategories.length
                            ? (
                                <div className="grid grid-cols-2 gap-2">
                                    {filteredCategories.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between px-3 py-2 rounded-xl border border-default-200 hover:border-default-400 transition-colors group"
                                        >
                                            <span className="capitalize text-sm font-medium truncate flex-1">
                                                {item.label?.toLowerCase()}
                                            </span>
                                            <Button
                                                isIconOnly
                                                size="sm"
                                                variant="light"
                                                color="danger"
                                                className="opacity-40 group-hover:opacity-100 transition-opacity shrink-0 ml-1"
                                                onClick={() => {
                                                    setOpenModal(true)
                                                    setTarget(item)
                                                }}
                                            >
                                                <DeleteIcon />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )
                            : (
                                <div className="flex flex-col items-center justify-center py-10 text-default-400">
                                    <BiSolidCategory size={40} className="mb-2 opacity-30" />
                                    <p className="text-sm">
                                        {search.trim()
                                            ? 'No se encontró ninguna categoría'
                                            : 'No hay categorías creadas'}
                                    </p>
                                </div>
                            )}
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            color="danger"
                            variant="flat"
                            onClick={() => {
                                onClose()
                                clearStore()
                                setSearch('')
                            }}
                        >
							Cerrar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal
                backdrop="opaque"
                isOpen={openModal}
                radius="2xl"
                classNames={{
                    body: 'py-6',
                    backdrop: 'backdrop-opacity-75',
                    base: `${
                        type === 'Eliminar'
                            ? 'border-[#C70039] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]'
                            : 'border-[#ffd700] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]'
                    }`,
                    header: `${
                        type === 'Eliminar'
                            ? 'border-b-[1px] border-[#C70039]'
                            : 'border-b-[1px] border-[#ffd700]'
                    }`,
                    footer: `${
                        type === 'Eliminar'
                            ? 'border-t-[1px] border-[#C70039]'
                            : 'border-t-[1px] border-[#ffd700]'
                    }`,
                    closeButton: 'hover:bg-white/5 active:bg-white/10'
                }}
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 font-bold items-center">
                        {type} Categoría
                    </ModalHeader>
                    <ModalBody>
                        {type === 'Eliminar'
                            ? (
                                <div className="flex flex-col justify-between mx-10 gap-4">
                                    <p>
										Se eliminará la categoría:
                                        <p className="font-bold">{target?.label}</p>
                                    </p>
                                    <p>Para confirmar, debes ingresar el nombre de la categoría</p>
                                    <Input
                                        classNames={'max-w-xs'}
                                        isInvalid={invalid}
                                        color={invalid ? 'danger' : ''}
                                        errorMessage={invalid && 'Respuesta invalida'}
                                        isRequired
                                        type="text"
                                        label="Categoría"
                                        onValueChange={setValue}
                                    />
                                </div>
                            )
                            : (
                                <div className="flex flex-col justify-between mx-10 gap-4">
                                    <p>
										Se modificara la categoría:
                                        <p className="font-bold">{target?.label}</p>
                                    </p>
                                    <p>¿Esta seguro que desea modificar la categoría?</p>
                                </div>
                            )}
                    </ModalBody>
                    <ModalFooter className="justify-center">
                        <Button color="foreground" variant="light" onPress={close}>
							Cancelar
                        </Button>
                        <Button
                            color={`${type === 'Eliminar' ? 'danger' : 'warning'}`}
                            className="shadow-lg shadow-indigo-500/20"
                            onPress={() => {
                                controlInputToDelete(target?.id)
                            }}
                            onClose={close}
                        >
							Aceptar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </section>
    )
}
