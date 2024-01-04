/* eslint-disable camelcase */
/* eslint-disable no-lone-blocks */
/* eslint-disable multiline-ternary */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import useInventoryStore from './store'
import toast, { Toaster } from 'react-hot-toast'
import { Divider, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Text, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'
import { DeleteIcon } from '@/components/ui/DeleteIcon'
import { deleteOffer } from '@/services/offers'
import { BiSolidOffer } from 'react-icons/bi'
import { SearchIcon } from '@/components/ui/SearchIcon'

export const SectionInput = ({ title, children, showDivider, className }) => {
    return (
        <section className={'mt-3 space-y-2' + className}>
            { showDivider ? <Divider/> : null}
            <h3 className="text-medium pt-1">{title}</h3>
            <section className="space-y-3">
                {children}
            </section>
        </section>
    )
}
export default function InvoiceDetailed ({ openModal, setOpenModal, setVoucherTargetValue }) {
    const [createCustomer, setCreateCustomer] = useState(false)
    const [messageSearch, setMessageSearch] = useState(null)
    const [searchInput, setSearchInput] = useState('')
    const [filteredList, setFilteredList] = useState([])
    const [errorInput, setErrorInput] = useState(false)
    const notify = (text) => toast(text)
    const { defaultForm, create, setFormData, getCustomers, customers, setTargetCustomer, targetCustomer, triggetgetCustomers } =
     useInventoryStore(({ defaultForm, create, setFormData, getCustomers, customers, setTargetCustomer, targetCustomer, triggetgetCustomers }
     ) => ({ defaultForm, create, setFormData, getCustomers, customers, setTargetCustomer, targetCustomer, triggetgetCustomers }))
    const onClose = () => {
        setOpenModal(false)
    }
    const validateRut = (rut) => {
        // Expresión regular para validar el formato del RUT
        const rutRegex = /^(\d{8})-(\d|k|K)$/
        return rutRegex.test(rut)
    }
    const controlError = () => {
        const dictionary = Object.keys(defaultForm)
        for (const keys of dictionary) {
            // console.log('Clave:', keys, 'Valor:', defaultForm[keys])
            const value = defaultForm[keys]?.value
            if (!value) {
                useInventoryStore.getState().setFormData({ ...useInventoryStore.getState().defaultForm, [keys]: { value: null, error: 'Este campo es obligatorio' } })
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
                newFormValues = { ...defaultForm, [field]: { value: null, error: 'Debes ingresar el formato correcto 12345678-9' } }
            }
            // newFormValues = { ...defaultForm, [field]: value }
        } else {
            newFormValues = { ...defaultForm, [field]: { value, error: null } }
        }
        setFormData(newFormValues)
    }
    const CardRow = ({ item, setTargetCustomer }) => {
        const { ID, business_name } = item
        return <div className="flex gap-2 flex-row w-full items-center border rounded-xl pr-2">
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
            <section className='flex-1 flex gap-2 flex-wrap p-5 cursor-pointer' onClick={() => {
                setTargetCustomer(item)
                setOpenModal(false)
            }}>
                <div className="flex flex-1 min-w-[8rem] flex-col">
                    <span className="text-md">{item?.name?.toUpperCase()}</span>
                    <span className="text-sm  text-default-400">{item?.code}</span>
                </div>
                <div className="flex flex-1 min-w-[8rem] flex-col">
                    <span className="text-md">{business_name}</span>

                </div>
                <div className="flex flex-1 min-w-[8rem] flex-col">

                </div>
            </section>

        </div>
    }
    useEffect(() => {
        const searchSize = searchInput?.length || 0
        if (searchSize >= 1) {
            let updatedList = [...customers]
            updatedList = updatedList.filter((item) => {
                return item?.meta?.toLowerCase().includes(searchInput?.toLowerCase())
            })
            if (!updatedList?.length) {
                setMessageSearch('Ups.. no lo hemos podido encontrar, intenta buscar otro cliente')
            } else {
                setMessageSearch(null)
            }
            setFilteredList(updatedList)
        } else {
            setFilteredList(customers)
        }
    }, [searchInput, customers])
    useEffect(() => {
        getCustomers()
    }, [])
    // useEffect(() => { console.log(defaultForm) }, [defaultForm])
    return (
        <>
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
            <div className="flex flex-wrap gap-3">
            </div>
            <Modal size={'2xl'}
                isOpen={openModal}
                backdrop='opaque'
                onClose={onClose}
                scrollBehavior={'inside'}
                closeButton={<></>}
            >
                {!createCustomer
                    ? <ModalContent>
                        {(onClose) => (
                            <section>
                                <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200">Selecciona un cliente</ModalHeader>
                                <ModalBody>
                                    <section>
                                        <div className="my-4 items-center gap-4 grid">
                                            <Input
                                                label="Busqueda"
                                                isClearable
                                                radius="lg"
                                                value={searchInput}
                                                onClear={() => setSearchInput('')}
                                                onChange={(e) => setSearchInput(e.target.value)}
                                                classNames={{
                                                    label: 'text-black/50 dark:text-white/90',
                                                    input: [
                                                        'bg-transparent',
                                                        'text-black/90 dark:text-white/90',
                                                        'placeholder:text-default-700/50 dark:placeholder:text-white/60'
                                                    ],
                                                    innerWrapper: 'bg-transparent'
                                                }}
                                                className='my-4 w-full'
                                                placeholder="Toca para buscar un cliente ... "
                                                startContent={
                                                    <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                                                }
                                            />
                                        </div>
                                        <section className='flex flex-col gap-2'>
                                            {(filteredList)?.length
                                                ? filteredList.map((item) => {
                                                    return (<div key={item.id}><CardRow item={item} setTargetCustomer={setTargetCustomer}/></div>)
                                                })
                                                : <div>No se ha encontrado el cliente</div>}

                                        </section>
                                    </section>
                                </ModalBody>
                                <ModalFooter>
                                    <Button className =" bg-blue-500 text-primary-50" onClick={() => {
                                        setCreateCustomer(true)
                                    }
                                    }>
                            Crear cliente
                                    </Button>
                                    <Button className =" bg-green-500 text-primary-50" onClick={() => {
                                    // setEdit(false)
                                    // setTargetProduct(null)
                                        onClose()
                                    }
                                    }>
                            Guardar
                                    </Button>
                                    <Button color="danger" variant="light"
                                        onClick={() => {
                                            onClose()
                                        }}
                                    >
                            Cerrar
                                    </Button>
                                </ModalFooter>
                            </section>
                        )}
                    </ModalContent>
                    : <ModalContent>
                        {(onClose) => (
                            <section>
                                <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200">Crear un cliente</ModalHeader>
                                <ModalBody>
                                    <section>
                                        <SectionInput title={''}>
                                            <div className="my-4 items-center gap-4 grid grid-cols-1 md:grid-cols-2">
                                                <div className="flex-3">
                                                    <h3 className=" text-small pt-1">{'* Nombre de empresa'}</h3>
                                                    <section className="space-y-3">
                                                        <Input type="text" variant={'underlined'} defaultValue={ ''}
                                                            errorMessage={defaultForm?.businessName?.error}
                                                            isInvalid={defaultForm?.businessName?.error}
                                                            onValueChange={(value) => { handleInputChange({ field: 'businessName', value }) }} />
                                                    </section>

                                                </div>
                                                <div className="flex-3">
                                                    <h3 className="text-small pt-1">{'* Rut de empresa'}</h3>
                                                    <section className="space-y-3">
                                                        <Input
                                                            type="text"
                                                            variant={'underlined'}
                                                            defaultValue={ ''}
                                                            errorMessage={defaultForm?.rut?.error}
                                                            isInvalid={defaultForm?.rut?.error}
                                                            onValueChange={(value) => { handleInputChange({ field: 'rut', value }) }}
                                                        />
                                                    </section>

                                                </div>
                                            </div>
                                        </SectionInput>
                                        <SectionInput title={''} >
                                            <div className="my-4 items-center gap-4 grid grid-cols-1 md:grid-cols-2">
                                                <div className="flex-3">
                                                    <h3 className="text-small pt-1">{'* Giro de empresa'}</h3>
                                                    <section className="space-y-3">
                                                        <Input type="text" variant={'underlined'} defaultValue={ ''}
                                                            errorMessage={defaultForm?.businessLine?.error}
                                                            isInvalid={defaultForm?.businessLine?.error}
                                                            onValueChange={(value) => { handleInputChange({ field: 'businessLine', value }) }}
                                                        />
                                                    </section>

                                                </div>
                                                <div className="flex-3">
                                                    <h3 className="text-small pt-1">{'Representante'}</h3>
                                                    <section className="space-y-3">
                                                        <Input type="text" variant={'underlined'} defaultValue={ ''}
                                                            onValueChange={(value) => { handleInputChange({ field: 'legalRepresentative', value }) }}

                                                        />
                                                    </section>

                                                </div>
                                            </div>
                                        </SectionInput>
                                        <SectionInput title={''} >
                                            <div className="my-4 items-center gap-4 grid grid-cols-1 md:grid-cols-2">
                                                <div className="flex-3">
                                                    <h3 className="text-small pt-1">{'Teléfono'}</h3>
                                                    <section className="space-y-3">
                                                        <Input type="text" variant={'underlined'} defaultValue={ ''}
                                                            onValueChange={(value) => { handleInputChange({ field: 'phone', value }) }}
                                                        />
                                                    </section>

                                                </div>
                                                <div className="flex-3">
                                                    <h3 className="text-small pt-1">{'Correo'}</h3>
                                                    <section className="space-y-3">
                                                        <Input type="text" variant={'underlined'} defaultValue={ ''}
                                                            onValueChange={(value) => { handleInputChange({ field: 'email', value }) }}
                                                        />
                                                    </section>

                                                </div>
                                            </div>
                                        </SectionInput>
                                        <SectionInput title={''} >
                                            <div className="my-4 items-center gap-4 grid grid-cols-1 md:grid-cols-2">
                                                <div className="flex-3">
                                                    <h3 className="text-small pt-1">{'Dirección'}</h3>
                                                    <section className="space-y-3">
                                                        <Input type="text" variant={'underlined'} defaultValue={ ''}

                                                            onValueChange={(value) => { handleInputChange({ field: 'address', value }) }}
                                                        />
                                                    </section>

                                                </div>
                                                <div className="flex-3">
                                                    <h3 className="text-small pt-1">{'Región'}</h3>
                                                    <section className="space-y-3">
                                                        <Input type="text" variant={'underlined'} defaultValue={ ''}
                                                            onValueChange={(value) => { handleInputChange({ field: 'region', value }) }}
                                                        />
                                                    </section>

                                                </div>
                                            </div>
                                        </SectionInput>

                                    </section>

                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        isDisabled={!!errorInput}
                                        className="bg-green-500 text-primary-50"
                                        onClick={() => {
                                            if (defaultForm?.rut?.value && defaultForm?.businessLine?.value && defaultForm?.businessName?.value) {
                                                create(defaultForm, notify, setTargetCustomer, getCustomers)
                                                onClose()
                                                setCreateCustomer(false)
                                            } else {
                                                controlError()
                                            }
                                        }
                                        }>
                            Guardar
                                    </Button>
                                    <Button color="danger" variant="light"
                                        onClick={() => {
                                            onClose()
                                            setCreateCustomer(false)
                                        }}
                                    >
                            Cerrar
                                    </Button>
                                </ModalFooter>
                            </section>
                        )}
                    </ModalContent>}

            </Modal>
        </>
    )
}
