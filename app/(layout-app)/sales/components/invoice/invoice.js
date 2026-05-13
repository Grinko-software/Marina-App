/* eslint-disable camelcase */
/* eslint-disable no-lone-blocks */
/* eslint-disable multiline-ternary */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import useInventoryStore from './store'
import { notify } from '@/services/notify'
import {
    Divider,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Chip
} from '@nextui-org/react'
import { SearchIcon } from '@/components/ui/SearchIcon'
import { BiUser } from 'react-icons/bi'

export const SectionInput = ({ title, children, showDivider, className }) => {
    return (
        <section className={'mt-3 space-y-2' + className}>
            {showDivider ? <Divider /> : null}
            <h3 className="text-medium pt-1">{title}</h3>
            <section className="space-y-3">{children}</section>
        </section>
    )
}

export default function InvoiceDetailed ({
    openModal,
    setOpenModal,
    setVoucherTargetValue
}) {
    const [createCustomer, setCreateCustomer] = useState(false)
    const [messageSearch, setMessageSearch] = useState(null)
    const [searchInput, setSearchInput] = useState('')
    const [filteredList, setFilteredList] = useState([])
    const [errorInput, setErrorInput] = useState(false)
    const [localSelected, setLocalSelected] = useState(null)

    const {
        defaultForm,
        create,
        setFormData,
        getCustomers,
        customers,
        setTargetCustomer,
        targetCustomer,
        triggetgetCustomers
    } = useInventoryStore(
        ({
            defaultForm,
            create,
            setFormData,
            getCustomers,
            customers,
            setTargetCustomer,
            targetCustomer,
            triggetgetCustomers
        }) => ({
            defaultForm,
            create,
            setFormData,
            getCustomers,
            customers,
            setTargetCustomer,
            targetCustomer,
            triggetgetCustomers
        })
    )

    const onClose = () => {
        setOpenModal(false)
    }

    const validateRut = (rut) => {
        const rutRegex = /^(\d{8})-(\d|k|K)$/
        return rutRegex.test(rut)
    }

    const controlError = () => {
        const dictionary = Object.keys(defaultForm)
        for (const keys of dictionary) {
            const value = defaultForm[keys]?.value
            if (!value) {
                useInventoryStore.getState().setFormData({
                    ...useInventoryStore.getState().defaultForm,
                    [keys]: { value: null, error: 'Este campo es obligatorio' }
                })
            }
        }
    }

    const handleInputChange = ({ field, value }) => {
        let newFormValues = {}
        if (field === 'rut') {
            if (validateRut(value)) {
                setErrorInput(false)
                newFormValues = { ...defaultForm, [field]: { value, error: null } }
            } else {
                newFormValues = {
                    ...defaultForm,
                    [field]: {
                        value: null,
                        error: 'Debes ingresar el formato correcto 12345678-9'
                    }
                }
            }
        } else {
            newFormValues = { ...defaultForm, [field]: { value, error: null } }
        }
        setFormData(newFormValues)
    }

    const handleSave = () => {
        if (localSelected) {
            setTargetCustomer(localSelected)
        }
        onClose()
    }

    const getInitial = (name) => name?.charAt(0)?.toUpperCase() || '?'

    useEffect(() => {
        setLocalSelected(targetCustomer || null)
    }, [openModal])

    useEffect(() => {
        const searchSize = searchInput?.length || 0
        if (searchSize >= 1) {
            let updatedList = [...customers]
            updatedList = updatedList.filter((item) => {
                return item?.meta?.toLowerCase().includes(searchInput?.toLowerCase())
            })
            if (!updatedList?.length) {
                setMessageSearch('No encontramos ese cliente, intentá con otro término')
            } else {
                setMessageSearch(null)
            }
            setFilteredList(updatedList)
        } else {
            setMessageSearch(null)
            setFilteredList(customers)
        }
    }, [searchInput, customers])

    useEffect(() => {
        getCustomers()
    }, [])

    return (
        <Modal
            size={'2xl'}
            isOpen={openModal}
            backdrop="opaque"
            onClose={onClose}
            scrollBehavior={'inside'}
            closeButton={<></>}
        >
            {!createCustomer ? (
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-2">
                                <span className="text-primary-500 dark:text-primary-200 font-semibold text-lg">
									Seleccionar cliente
                                </span>
                                {localSelected && (
                                    <Chip
                                        color="success"
                                        variant="flat"
                                        size="sm"
                                        startContent={<BiUser size={13} />}
                                        classNames={{ content: 'capitalize' }}
                                    >
                                        {localSelected.name?.toLowerCase()}
                                    </Chip>
                                )}
                            </ModalHeader>

                            <ModalBody className="gap-3 px-6">
                                <div className="sticky top-0 z-10 bg-content1 pb-2">
                                    <Input
                                        isClearable
                                        variant="bordered"
                                        radius="lg"
                                        value={searchInput}
                                        onClear={() => setSearchInput('')}
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        placeholder="Buscar por nombre, RUT o razón social..."
                                        startContent={
                                            <SearchIcon className="text-default-400 pointer-events-none flex-shrink-0" />
                                        }
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    {filteredList?.length ? (
                                        filteredList.map((item) => {
                                            const isSelected = localSelected?.id === item.id
                                            return (
                                                <button
                                                    key={item.id}
                                                    type="button"
                                                    onClick={() => setLocalSelected(item)}
                                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all ${
                                                        isSelected
                                                            ? 'border-success bg-success/10'
                                                            : 'border-default-200 hover:border-default-400 hover:bg-default-50 dark:hover:bg-default-100/10'
                                                    }`}
                                                >
                                                    <div
                                                        className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 ${
                                                            isSelected ? 'bg-green-500' : 'bg-default-300'
                                                        }`}
                                                    >
                                                        {getInitial(item.name)}
                                                    </div>
                                                    <div className="flex flex-col min-w-0 flex-1">
                                                        <span className="font-semibold text-sm capitalize truncate">
                                                            {item?.name?.toLowerCase()}
                                                        </span>
                                                        <div className="flex items-center gap-3 mt-0.5">
                                                            <span className="text-xs text-default-400 font-mono">
                                                                {item?.code}
                                                            </span>
                                                            {item?.business_name && (
                                                                <span className="text-xs text-default-400 truncate">
                                                                    {item.business_name}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {isSelected && (
                                                        <svg
                                                            width="18"
                                                            height="18"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="text-green-500 shrink-0"
                                                        >
                                                            <polyline points="20 6 9 17 4 12" />
                                                        </svg>
                                                    )}
                                                </button>
                                            )
                                        })
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-10 text-default-400 gap-2">
                                            <SearchIcon className="w-10 h-10 opacity-30" />
                                            <p className="text-sm text-center">
                                                {messageSearch || 'No se encontraron clientes'}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </ModalBody>

                            <ModalFooter className="gap-2">
                                <Button
                                    variant="bordered"
                                    color="primary"
                                    onClick={() => setCreateCustomer(true)}
                                    startContent={<BiUser size={16} />}
                                >
									Nuevo cliente
                                </Button>
                                <Button
                                    className="bg-green-500 text-white flex-1"
                                    isDisabled={!localSelected}
                                    onClick={handleSave}
                                >
                                    {localSelected
                                        ? `Confirmar — ${localSelected.name?.toLowerCase()}`
                                        : 'Selecciona un cliente'}
                                </Button>
                                <Button color="danger" variant="flat" onClick={onClose}>
									Cerrar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            ) : (
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200">
								Nuevo cliente
                            </ModalHeader>

                            <ModalBody>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
                                    <Input
                                        type="text"
                                        variant="bordered"
                                        label="Nombre de empresa *"
                                        defaultValue=""
                                        errorMessage={defaultForm?.businessName?.error}
                                        isInvalid={!!defaultForm?.businessName?.error}
                                        onValueChange={(value) =>
                                            handleInputChange({ field: 'businessName', value })
                                        }
                                    />
                                    <Input
                                        type="text"
                                        variant="bordered"
                                        label="RUT de empresa *"
                                        placeholder="12345678-9"
                                        defaultValue=""
                                        errorMessage={defaultForm?.rut?.error}
                                        isInvalid={!!defaultForm?.rut?.error}
                                        onValueChange={(value) =>
                                            handleInputChange({ field: 'rut', value })
                                        }
                                    />
                                    <Input
                                        type="text"
                                        variant="bordered"
                                        label="Giro de empresa *"
                                        description="Máx. 39 caracteres"
                                        defaultValue=""
                                        errorMessage={defaultForm?.businessLine?.error}
                                        isInvalid={!!defaultForm?.businessLine?.error}
                                        onValueChange={(value) =>
                                            handleInputChange({
                                                field: 'businessLine',
                                                value: value.substring(0, 39)
                                            })
                                        }
                                    />
                                    <Input
                                        type="text"
                                        variant="bordered"
                                        label="Representante legal"
                                        defaultValue=""
                                        onValueChange={(value) =>
                                            handleInputChange({ field: 'legalRepresentative', value })
                                        }
                                    />
                                    <Input
                                        type="text"
                                        variant="bordered"
                                        label="Teléfono"
                                        defaultValue=""
                                        onValueChange={(value) =>
                                            handleInputChange({ field: 'phone', value })
                                        }
                                    />
                                    <Input
                                        type="text"
                                        variant="bordered"
                                        label="Correo"
                                        defaultValue=""
                                        onValueChange={(value) =>
                                            handleInputChange({ field: 'email', value })
                                        }
                                    />
                                    <Input
                                        type="text"
                                        variant="bordered"
                                        label="Dirección"
                                        defaultValue=""
                                        onValueChange={(value) =>
                                            handleInputChange({ field: 'address', value })
                                        }
                                    />
                                    <Input
                                        type="text"
                                        variant="bordered"
                                        label="Región"
                                        defaultValue=""
                                        onValueChange={(value) =>
                                            handleInputChange({ field: 'region', value })
                                        }
                                    />
                                </div>
                            </ModalBody>

                            <ModalFooter className="gap-3">
                                <Button
                                    isDisabled={!!errorInput}
                                    className="bg-green-500 text-white"
                                    onClick={() => {
                                        if (
                                            defaultForm?.rut?.value &&
											defaultForm?.businessLine?.value &&
											defaultForm?.businessName?.value
                                        ) {
                                            create(defaultForm, notify, setTargetCustomer, getCustomers)
                                            onClose()
                                            setCreateCustomer(false)
                                        } else {
                                            controlError()
                                        }
                                    }}
                                >
									Guardar cliente
                                </Button>
                                <Button
                                    color="danger"
                                    variant="flat"
                                    onClick={() => setCreateCustomer(false)}
                                >
									Volver
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            )}
        </Modal>
    )
}
