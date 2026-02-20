/* eslint-disable no-unused-vars */
'use client'
import React, { useEffect, useRef, useState } from 'react'
import CardUi from '@/components/ui/Card'
import {
    useDisclosure,
    Input,
    ScrollShadow,
    Skeleton
} from '@nextui-org/react'
import useInventoryStore from './store'
import CreateProduct from './components/NewProduct/createProduct'
import { SearchIcon } from '@/components/ui/SearchIcon'
import ProductDetail from './components/productDetail'
import LoadingCard from '@/components/ui/Loading'
import TabsCustom from '@/components/ui/Tabs'
import { useIsInViewport } from '@/utils/viewportObserver'
import useScannerStore from '@/stores/scanner'
import useStore from './store/store'
import { upgradeVersion } from '@/services/sync'
import useSyncStore from '@/stores/common/sync'
import Camera from './components/Camera/camera'
const LIMIT_PRODUCTS_VIEW = 50
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

    // Open CreateProduct modal when camera returns a result
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
            // notify('Cargando más productos...')
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
        <section className="w-11/12 items-center touch-none fixed">
            <section className="flex flex-col gap-2">
                <div className="flex flex-row gap-1 justify-between">
                    {loading
                        ? (
                            <section className="w-full">
                                <Skeleton className="w-full rounded-lg bg-slate-600"></Skeleton>
                            </section>
                        )
                        : (
                            <TabsCustom
                                items={listCategories}
                                selectedKey={selectedCategoryID}
                                onSelectionChange={setSelectedCategoryID}
                            />
                        )}
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
                <div>
                    <section className="flex flex-col p-2 shadow-md hover:shadow-lg bg-secondary-50 dark:bg-secondary-450 rounded-md ">
                        <Input
                            label="Busqueda"
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
                            className="my-4 w-full"
                            placeholder="Toca para buscar un producto..."
                            startContent={
                                <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                            }
                            onClear={() => setSearchInput('')}
                        />
                        {loading
                            ? (
                                <div>
                                    <ScrollShadow className="w-full pb-4">
                                        <div className="gap-4 grid grid-cols-2 md:grid-cols-5 p-1">
                                            {listEmpty?.map((item, key) => (
                                                <LoadingCard key={key} />
                                            ))}
                                        </div>
                                    </ScrollShadow>
                                </div>
                            )
                            : searchInput
                                ? (
                                    <section className="h-full w-full">
                                        <section
                                            style={{ scrollbarGutter: 'stable' }}
                                            className="max-h-[60vh] w-full overflow-y-auto flex flex-wrap snap-y snap-mandatory content-start"
                                        >
                                            {filteredList?.map((item, index) => (
                                                <div
                                                    key={'productSearch' + index}
                                                    className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 xlg:w-[12.5%] snap-start shrink-0"
                                                >
                                                    <div className="mx-1 my-1 h-[90%] w-auto">
                                                        <CardUi
                                                            item={item}
                                                            setTargetProduct={setTargetProduct}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                            {!listInventory?.length
                                                ? (
                                                    <div>No hay productos</div>
                                                )
                                                : !filteredList.length && messageSearch
                                                    ? (
                                                        <div>{messageSearch}</div>
                                                    )
                                                    : null}
                                        </section>
                                    </section>
                                )
                                : (
                                    <section
                                        style={{ scrollbarGutter: 'stable' }}
                                        className="max-h-[60vh] w-full overflow-y-auto flex flex-wrap snap-y snap-mandatory content-start"
                                    >
                                        {listInventory?.map((item, index) => (
                                            <div
                                                ref={
                                                    index + 1 === listInventory.length && showMoreEnable
                                                        ? refShowMore
                                                        : null
                                                }
                                                key={'productList' + index}
                                                className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 xlg:w-[12.5%] snap-start shrink-0"
                                            >
                                                <div className="mx-1 my-1">
                                                    <CardUi item={item} setTargetProduct={setTargetProduct} />
                                                </div>
                                            </div>
                                        ))}
                                    </section>
                                )}
                    </section>
                </div>
            </section>
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
