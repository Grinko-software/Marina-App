/* eslint-disable no-unused-vars */
'use client'
import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ScrollShadow, Select, SelectItem, dropdown, useDisclosure } from '@nextui-org/react'
import React, { Suspense, createRef, useEffect, useMemo, useState } from 'react'
import useInventoryStore from '../../store'
import useOfferFormStore from './store'
import useSalesStore from '@/app/(layout-app)/sales/store'
import { SearchIcon } from '@/components/ui/SearchIcon'
import CardUi from '@/components/ui/Card'
import Image from 'next/image'
import { ConvertBytesToImage, DefaultImageMarinaMarket } from '@/utils/image'
import useOffersStore from '@/stores/offers'
import CreateOffer from './createOffer'
import { DeleteIcon } from '@/components/ui/DeleteIcon'
import { deleteOffer } from '@/services/offers'
import toast, { Toaster } from 'react-hot-toast'

const notify = (text) => toast(text)
export const InputComponent = ({ title, type, placeholder, isPrice, isBarCode, ...rest }) => {
    return (
        <Input
            autoFocus={!!isBarCode}
            type={type}
            variant={'underlined'}
            label={title}
            labelPlacement={'outside'}
            placeholder={placeholder || ('Ingrese el ' + title)}
            endContent={isPrice
                ? <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">$</span>
                </div>
                : null}
            min={isPrice ? 0 : null}
            {...rest}
        />
    )
}

const OffertCard = ({ item, deleteAction }) => {
    const { id: idOffer, quantity, unitPrice, productId, product } = item
    const totalPriceOffer = quantity * unitPrice
    const totalPriceNormal = quantity * product?.price
    const dctoOffer = product?.price - unitPrice
    const pctgOffer = Math.round((dctoOffer / product?.price) * 100)

    const [loadingDelete, setLoadingDelete] = useState(false)

    const handleDeleteOffer = (id) => {
        setLoadingDelete(true)

        deleteOffer({ id, notify }).then(
            (response) => {
                setLoadingDelete(false)
                if (deleteAction) {
                    deleteAction()
                }
            }
        )
    }

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
        <Image
            shadow="none"
            radius="lg"
            width="50"
            height="50"
            alt={product?.name}
            className="w-[4rem] object-cover h-[4rem] rounded-lg bg-slate-100 dark:bg-white"
            // src={'https://confidentefinanciero.com/wp-content/uploads/2023/04/Facturacion-electronica-restaurantes-scaled.jpg'}
            src={product?.image?.length ? ConvertBytesToImage({ imageBytes: product?.image }) : DefaultImageMarinaMarket()}
        />
        <section className='flex-1 flex gap-2 flex-wrap'>
            <div className="flex flex-1 min-w-[8rem] flex-col">
                <span className="text-md">{product?.name?.toUpperCase()}</span>
                <span className="text-sm  text-default-400">{product?.code}</span>
            </div>
            <div className="flex flex-1 min-w-[8rem] flex-col">
                <span className="text-md">{'Precio'}</span>
                <span className="text-sm  text-default-400">{`$${unitPrice} (Normal: $${product?.price})`}</span>
            </div>
            <div className="flex flex-1 min-w-[8rem] flex-col">
                <span className="text-md">{`${quantity} x $${totalPriceOffer}`}</span>
                <span className="text-sm  text-default-400">{`Dcto: $${dctoOffer} (${pctgOffer}%)`}</span>
            </div>
        </section>
        <Button className='' isLoading={loadingDelete} variant='flat' color='danger' isIconOnly onClick={() => handleDeleteOffer(idOffer)}>
            {!loadingDelete
                ? <DeleteIcon/>
                : null}
        </Button>
    </div>
}

export default function Offers () {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [searchInput, setSearchInput] = useState('')
    const [filteredList, setFilteredList] = useState([])
    const [listOffersWithProducts, setListOffersWithProducts] = useState([])
    const [sectionCreateOffer, setSectionCreateOffer] = useState(false)
    const [messageSearch, setMessageSearch] = useState('')

    const { data, setFormData, requestCreateOffer, loading, error, setError, complete, hasRequeredValues, clearStore } = useOfferFormStore()
    const { listInventory } = useInventoryStore()
    const { offers, getOffers, loadingOffers } = useOffersStore()

    useEffect(() => {
        if (isOpen) {
            useSalesStore.getState()?.disabledRedirectSales()
            getOffers()
        } else {
            useSalesStore.getState()?.enabledRedirectSales()
            setFilteredList([])
            setSearchInput(null)
            setSectionCreateOffer(false)
        }
    }, [isOpen])

    useEffect(() => {
        if (offers && listInventory?.length) {
            const offersWithProducts = offers?.map((item) => {
                const product = useInventoryStore.getState().getProductById(listInventory, item.productId)
                return {
                    ...item,
                    product
                }
            })

            const offersValids = offersWithProducts.filter(({ product }) => {
                return !!product
            })

            setListOffersWithProducts(offersValids)
        } else {
            setListOffersWithProducts([])
        }
    }, [offers, listInventory])

    useEffect(() => {
        // Create copy of item list
        const searchSize = searchInput?.length || 0
        if (searchSize >= 1) {
            let updatedList = [...listOffersWithProducts]
            updatedList = updatedList.filter((item) => {
                return item?.product?.meta?.toLowerCase().includes(searchInput?.toLowerCase())
                // return item?.meta?.toLowerCase().indexOf(searchInput?.toLowerCase()) !== -1
            })
            if (!updatedList?.length) {
                setMessageSearch('Ups.. no lo hemos podido encontrar, intenta buscar otro producto.')
            } else {
                setMessageSearch(null)
            }
            setFilteredList(updatedList)
        } else {
            setFilteredList(listOffersWithProducts)
            setMessageSearch('Realiza una búsqueda.')
        }
    }, [searchInput, listOffersWithProducts])

    useEffect(() => {
        if (complete && !error) {
            getOffers()
            clearStore()
            setSectionCreateOffer(false)
        }
    }, [complete, error])

    return (
        <section>
            <header className="flex justify-end">
                <Button className='bg-amber-400 dark:bg-amber-400 font-bold' color='danger' variant="bordered" onClick={onOpen}>OFERTAS</Button>
            </header>
            <Modal size={'3xl'}
                isOpen={isOpen}
                backdrop='blur'
                onClose={() => onClose}
                scrollBehavior={'inside'}
                closeButton={<></>}
            >
                {!sectionCreateOffer
                    ? <ModalContent>
                        <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200">{'Ofertas'}</ModalHeader>
                        <ModalBody>
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
                                    placeholder="Toca para buscar un producto en oferta..."
                                    startContent={
                                        <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                                    }
                                />
                            </div>
                            {
                                (searchInput && listOffersWithProducts.length)
                                    ? <section className='flex flex-col gap-2'>
                                        {(filteredList)?.length
                                            ? filteredList.map((item) => {
                                                // {id,quantity,unitPrice,productId }
                                                return (<div key={item.id}><OffertCard item={item} deleteAction={getOffers}/></div>)
                                            })
                                            : <div>No se ha encontrado la oferta</div>}

                                    </section>
                                    : <section className='flex flex-col gap-2'>
                                        {(listOffersWithProducts)?.length
                                            ? listOffersWithProducts.map((item) => {
                                            // {id,quantity,unitPrice,productId }
                                                return (<div key={item.id}><OffertCard item={item} deleteAction={getOffers}/></div>)
                                            })
                                            : <div>No hay ofertas</div>}
                                    </section>
                            }
                        </ModalBody>
                        <ModalFooter>
                            {error
                                ? <div className='flex mx-5 self-center'>
                                    <h1>{error}</h1>
                                </div>
                                : null}
                            <Button className =" bg-green-500 text-primary-50"
                                onClick={() => { setSectionCreateOffer(true) }}>
                                {'Crear oferta'}
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
                        <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200">{'Crear nueva oferta'}</ModalHeader>
                        <ModalBody>
                            <section>
                                <CreateOffer/>
                            </section>
                        </ModalBody>
                        <ModalFooter>
                            {error
                                ? <div className='flex mx-5 self-center'>
                                    <h1>{error}</h1>
                                </div>
                                : null}
                            <Button className =" bg-green-500 text-primary-50"
                                onClick={() => { requestCreateOffer(data, notify) }}
                                isLoading={!!loading}>
                                {'Guardar'}
                            </Button>
                            <Button color="danger" variant="flat"
                                onClick={() => {
                                    setSectionCreateOffer(false)
                                    clearStore()
                                }}
                            >
                                {'Cancelar'}
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                }
            </Modal>
        </section>
    )
}
