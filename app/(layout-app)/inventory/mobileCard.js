/* eslint-disable no-unused-vars */
'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useDisclosure, Input, Skeleton } from '@nextui-org/react'
import { DefaultImageMarinaMarket } from '@/utils/image'
import { roundValue } from '@/utils/number'
import useInventoryStore from './store'
import CreateProduct from './components/NewProduct/createProduct'
import { SearchIcon } from '@/components/ui/SearchIcon'
import ProductDetail from './components/productDetail'
import TabsCustom from '@/components/ui/Tabs'
import { useIsInViewport } from '@/utils/viewportObserver'
import useScannerStore from '@/stores/scanner'
import useStore from './store/store'
import { upgradeVersion } from '@/services/sync'
import useSyncStore from '@/stores/common/sync'
import Camera from './components/Camera/camera'
import Image from '@/components/ui/Image'
const LIMIT_PRODUCTS_VIEW = 50

function ProductImage ({ src, alt }) {
    const fallback = DefaultImageMarinaMarket()
    const [imgSrc, setImgSrc] = useState(src?.length ? src : fallback)

    useEffect(() => {
        setImgSrc(src?.length ? src : fallback)
    }, [src])

    return (
        <Image
            src={imgSrc}
            width={56}
            height={56}
            alt={alt || ''}
            className="w-14 h-14 rounded-lg object-cover bg-slate-100 dark:bg-white shrink-0"
            onError={() => setImgSrc(fallback)}
        />
    )
}

export default function Card () {
    const { getData, error, loading, setLoading, data, triggerAction } = useStore(
        (state) => state
    )
    const { lastUpdate, setLastUpdate } = useSyncStore()
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [targeProduct, setTargetProduct] = useState(null)
    const [selectedCategoryID, setSelectedCategoryID] = useState('24')
    const [listInventory, setListInventory] = useState([])
    const [listInventoryComplete, setListInventoryComplete] = useState([])
    const [sectionSearch, setSectionSearch] = useState(false)
    const [searchInput, setSearchInput] = useState(null)
    const [messageSearch, setMessageSearch] = useState('')
    const [showMoreEnable, setShowMoreEnable] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [lastInViewPort, setLastInViewPort] = useState(false)
    const [openCreateProductModal, setOpenCreateProductModal] = useState(false)
    const [resultCamera, setResultCamera] = useState(null)
    const refShowMore = useRef(null)
    const onChange = (event) => {
        setSearchInput(event.target.value)
    }
    const listEmpty = new Array(20).fill(null)
    const {
        listCategories,
        listInventory: list,
        getCategories,
        getStockTypes,
        handleProductRequest
    } = useInventoryStore(
        ({
            listCategories,
            listInventory,
            getCategories,
            getStockTypes,
            handleProductRequest
        }) => ({
            listCategories,
            listInventory,
            getCategories,
            getStockTypes,
            handleProductRequest
        })
    )
    const [filteredList, setFilteredList] = useState([])
    useIsInViewport({ ref: refShowMore, setStatus: setLastInViewPort })

    useEffect(() => {
        if (resultCamera) {
            setOpenCreateProductModal(true)
        }
    }, [resultCamera])

    useEffect(() => {
        if (selectedCategoryID) {
            const filteredLisInventory = list?.filter(
                (item) => item.productCategoryId === parseInt(selectedCategoryID)
            )
            setListInventoryComplete([...filteredLisInventory])
            if (filteredLisInventory.length > LIMIT_PRODUCTS_VIEW) {
                setShowMoreEnable(true)
            } else {
                setShowMoreEnable(false)
            }
            setPageNumber(1)
        }
    }, [selectedCategoryID, list])

    useEffect(() => {
        if (listInventoryComplete) {
            const currentItems = pageNumber * LIMIT_PRODUCTS_VIEW
            if (currentItems < listInventoryComplete.length) {
                setListInventory(listInventoryComplete.slice(0, currentItems))
                setShowMoreEnable(true)
            } else {
                setListInventory(listInventoryComplete)
                setShowMoreEnable(false)
            }
        }
    }, [listInventoryComplete, pageNumber])

    useEffect(() => {
        if (
            lastInViewPort &&
            pageNumber * LIMIT_PRODUCTS_VIEW < listInventoryComplete?.length
        ) {
            setTimeout(() => {
                setPageNumber(pageNumber + 1)
            }, 500)
        }
    }, [listInventoryComplete, lastInViewPort, pageNumber])

    useEffect(() => {
        if (selectedCategoryID) {
            setSectionSearch(false)
        }
    }, [selectedCategoryID])

    useEffect(() => {}, [refShowMore])

    useEffect(() => {
        if (targeProduct) {
            onOpen()
        }
    }, [targeProduct])

    useEffect(() => {
        if (isOpen) {
            useScannerStore.getState()?.disabledRedirectSales()
        } else {
            useScannerStore.getState()?.enabledRedirectSales()
        }
    }, [isOpen])

    useEffect(() => {
        const searchSize = searchInput?.length || 0
        if (searchSize >= 3) {
            let updatedList = [...list]
            // Include all elements which includes the search query
            updatedList = updatedList.filter((item) => {
                return (
                    item?.meta?.toLowerCase().indexOf(searchInput?.toLowerCase()) !== -1
                )
            })
            // Trigger render with updated values
            if (!updatedList?.length) {
                setMessageSearch(
                    'Ups.. no lo hemos podido encontrar, intenta buscar otro producto.'
                )
            } else {
                setMessageSearch(null)
            }
            setFilteredList(updatedList)
        } else if (searchSize >= 1) {
            setFilteredList([])
            setMessageSearch(
                'Escribe al menos 3 carácteres para realizar una búsqueda.'
            )
        } else {
            setFilteredList([])
            setMessageSearch('Realiza una búsqueda.')
        }
    }, [searchInput, list])

    useEffect(() => {
        if (!sectionSearch) {
            setSearchInput('')
        }
    }, [sectionSearch])
    /* set States from store inventory */
    useEffect(() => {
        if (data) {
            getCategories(data?.categories)
            getStockTypes(data?.stockTypes)
            // if (list?.length > 0 || !updateProduct) {
            if (list?.length > 0) {
                if (upgradeVersion(lastUpdate, setLastUpdate)) {
                    handleProductRequest(false, list)
                } else {
                    handleProductRequest(false, list)
                }
            } else {
                handleProductRequest(false, list)
            }
        }
    }, [data])
    /* Handle multiple request */
    useEffect(() => {
        getData()
        return () => {
            setLoading(false)
        }
    }, [])
    return (
        <section className='w-11/12 touch-none fixed flex flex-col' style={{ height: 'calc(100dvh - 4.5rem)' }}>
            <div className='flex flex-col gap-3 flex-1 min-h-0 pb-3'>

                <div className='flex flex-row gap-2 items-center shrink-0'>
                    {loading
                        ? <div className="flex-1">
                            <Skeleton className="w-full h-10 rounded-lg bg-slate-600"/>
                        </div>
                        : <div className="flex-1 min-w-0">
                            <TabsCustom
                                items={listCategories}
                                selectedKey={selectedCategoryID}
                                onSelectionChange={setSelectedCategoryID}
                            />
                        </div>
                    }
                    <div className="flex gap-1 shrink-0">
                        <Camera
                            resultCamera={resultCamera}
                            setResultCamera={setResultCamera}
                            setTargetProduct={setTargetProduct}
                            setOpenCreateProductModal={setOpenCreateProductModal}
                        />
                        <CreateProduct
                            triggerAction={triggerAction}
                            handleProductRequest={handleProductRequest}
                            openModal={openCreateProductModal}
                            setOpenModal={setOpenCreateProductModal}
                            resultCamera={resultCamera}
                            setResultCamera={setResultCamera}
                        />
                    </div>
                </div>

                <div className="rounded-xl shadow-md bg-secondary-50 dark:bg-secondary-450 overflow-hidden flex flex-col flex-1 min-h-0">
                    <div className="px-3 pt-3 pb-1 shrink-0">
                        <Input
                            label="Búsqueda"
                            autoFocus
                            isClearable
                            radius="lg"
                            onChange={onChange}
                            onFocusChange={(value) =>
                                value
                                    ? useScannerStore.getState()?.disabledRedirectSales()
                                    : useScannerStore.getState()?.enabledRedirectSales()
                            }
                            classNames={{
                                label: 'text-black/50 dark:text-white/90',
                                input: [
                                    'bg-transparent',
                                    'text-black/90 dark:text-white/90',
                                    'placeholder:text-default-700/50 dark:placeholder:text-white/60'
                                ],
                                innerWrapper: 'bg-transparent'
                            }}
                            placeholder="Toca para buscar un producto..."
                            startContent={
                                <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                            }
                            onClear={() => setSearchInput('')}
                        />
                    </div>

                    {loading
                        ? <div style={{ scrollbarGutter: 'stable' }} className='flex-1 min-h-0 overflow-y-auto pb-3'>
                            <div className="divide-y divide-black/5 dark:divide-white/5">
                                {listEmpty?.map((_, key) => (
                                    <div key={key} className="flex items-center gap-3 px-3 py-2.5">
                                        <Skeleton className="w-14 h-14 rounded-lg shrink-0"/>
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-4 w-3/4 rounded"/>
                                            <Skeleton className="h-3 w-1/4 rounded"/>
                                        </div>
                                        <Skeleton className="w-10 h-5 rounded-full shrink-0"/>
                                    </div>
                                ))}
                            </div>
                        </div>
                        : searchInput
                            ? <div style={{ scrollbarGutter: 'stable' }} className='flex-1 min-h-0 overflow-y-auto pb-3'>
                                {filteredList.length
                                    ? <div className="divide-y divide-black/5 dark:divide-white/5">
                                        {filteredList.map((item, index) => (
                                            <button
                                                key={'productSearch' + index}
                                                onClick={() => setTargetProduct(item)}
                                                className="flex items-center gap-3 w-full px-3 py-2.5 text-left hover:bg-black/5 dark:hover:bg-white/5 active:scale-[0.99] transition-transform"
                                            >
                                                <ProductImage src={item?.image} alt={item?.name}/>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold text-sm truncate">{item?.name}</p>
                                                    <p className="text-xs text-default-400 mt-0.5">${item?.price}</p>
                                                </div>
                                                <span className={`text-xs font-semibold rounded-full px-2 py-0.5 shrink-0 text-white ${item?.stock <= 0 ? 'bg-red-500' : 'bg-emerald-600'}`}>
                                                    {item?.stock >= 100 ? '+99' : roundValue(item?.stock, 0, '-')}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                    : <p className="text-center text-default-400 py-6 text-sm px-4">{messageSearch}</p>
                                }
                            </div>
                            : <div style={{ scrollbarGutter: 'stable' }} className='flex-1 min-h-0 overflow-y-auto pb-3'>
                                <div className="divide-y divide-black/5 dark:divide-white/5">
                                    {listInventory?.map((item, index) => (
                                        <button
                                            ref={index + 1 === listInventory.length && showMoreEnable ? refShowMore : null}
                                            key={'productList' + index}
                                            onClick={() => setTargetProduct(item)}
                                            className="flex items-center gap-3 w-full px-3 py-2.5 text-left hover:bg-black/5 dark:hover:bg-white/5 active:scale-[0.99] transition-transform"
                                        >
                                            <ProductImage src={item?.image} alt={item?.name}/>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-sm truncate">{item?.name}</p>
                                                <p className="text-xs text-default-400 mt-0.5">${item?.price}</p>
                                            </div>
                                            <span className={`text-xs font-semibold rounded-full px-2 py-0.5 shrink-0 text-white ${item?.stock <= 0 ? 'bg-red-500' : 'bg-emerald-600'}`}>
                                                {item?.stock >= 100 ? '+99' : roundValue(item?.stock, 0, '-')}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                    }
                </div>

            </div>
            <ProductDetail
                isMobile={true}
                targeProduct={targeProduct}
                isOpen={isOpen}
                onClose={onClose}
                setTargetProduct={setTargetProduct}
            />
        </section>
    )
}
