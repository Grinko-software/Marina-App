'use client'
import React, { useEffect, useRef, useState } from 'react'
import CardUi from '@/components/ui/Card'
import { useDisclosure, Input, Skeleton, ScrollShadow, Button } from '@nextui-org/react'
import useInventoryStore from './store'
import CreateProduct from './components/NewProduct/createProduct'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { SearchIcon } from '@/components/ui/SearchIcon'
import useSalesStore from '../sales/store'
import ProductDetail from './components/productDetail'
import LoadingCard from '@/components/ui/Loading'
import Offers from './components/Offer/offers'
import CreateCategory from './components/NewCategory/newCategory'
import TabsCustom from '@/components/ui/Tabs'
import { useIsInViewport } from '@/utils/viewportObserver'
import SearchBar from '@/components/ui/SearchBar'
// import toast from 'react-hot-toast'

const LIMIT_PRODUCTS_VIEW = 50
// const notify = (text) => toast.success(text)

export default function Card () {
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
    const refShowMore = useRef(null)
    const onChange = (event) => {
        setSearchInput(event.target.value)
        console.log(event.target.value)
    }
    const onClear = () => {
        setSearchInput('')
    }
    const listEmpty = new Array(20).fill(null)
    const { listCategories, listInventory: list, getCategories, getStockTypes, getListInventory, loadingCategories, loading } = useInventoryStore(
        ({ listCategories, listInventory, getCategories, getStockTypes, getListInventory, loadingCategories, loading }) => (
            { listCategories, listInventory, getCategories, getStockTypes, getListInventory, loadingCategories, loading }))
    const onChangeValue = (event) => {
        setSearchInput(event.target.value)
    }
    const [filteredList, setFilteredList] = useState([])
    useIsInViewport({ ref: refShowMore, setStatus: setLastInViewPort })
    useEffect(() => {
        /* Add in the future refreshToken in this useEffect */
        getCategories()
        getStockTypes()
        getListInventory()
    }, [])

    useEffect(() => {
        if (selectedCategoryID) {
            const filteredLisInventory = list?.filter((item) => item.productCategoryId === parseInt(selectedCategoryID))
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
        if (lastInViewPort && (pageNumber * LIMIT_PRODUCTS_VIEW) < listInventoryComplete?.length) {
            // notify('Cargando más productos...')
            setTimeout(() => {
                setPageNumber(pageNumber + 1)
            }, 500)

            console.log(pageNumber)
        }
    }, [listInventoryComplete, lastInViewPort, pageNumber])

    useEffect(() => {
        if (selectedCategoryID) {
            setSectionSearch(false)
        }
    }, [selectedCategoryID])

    useEffect(() => {
        console.log(refShowMore)
    }, [refShowMore])

    useEffect(() => {
        if (targeProduct) {
            onOpen()
        }
    }, [targeProduct])

    useEffect(() => {
        if (isOpen) {
            useSalesStore.getState()?.disabledRedirectSales()
        } else {
            useSalesStore.getState()?.enabledRedirectSales()
        }
    }, [isOpen])

    useEffect(() => {
        const searchSize = searchInput?.length || 0
        if (searchSize >= 3) {
            let updatedList = [...list]
            // Include all elements which includes the search query
            updatedList = updatedList.filter((item) => {
                return item?.meta?.toLowerCase().indexOf(searchInput?.toLowerCase()) !== -1
            })
            // Trigger render with updated values
            if (!updatedList?.length) {
                setMessageSearch('Ups.. no lo hemos podido encontrar, intenta buscar otro producto.')
            } else {
                setMessageSearch(null)
            }
            setFilteredList(updatedList)
        } else if (searchSize >= 1) {
            setFilteredList([])
            setMessageSearch('Escribe al menos 3 carácteres para realizar una búsqueda.')
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

    return (
        <section className='w-11/12 items-center touch-none fixed' >
            <section className='flex flex-col gap-2'>
                <div className='flex flex-row gap-1 justify-between'>
                    <Offers isMobile={true}/>
                    <CreateProduct isMobile={true}/>
                    <CreateCategory isMobile={true}/>
                </div>
                <div >
                    <SearchBar onChange={onChangeValue} onClear={onClear} defaultValue={searchInput}/>
                    <section className="flex p-2 shadow-md hover:shadow-lg bg-secondary-50 dark:bg-secondary-450 rounded-b-md ">
                        { loadingCategories && loading
                            ? <ScrollShadow className="w-full pb-4">
                                <div className="gap-4 grid grid-cols-2 md:grid-cols-5 p-1">{listEmpty?.map((item, key) => (<LoadingCard key={key}/>))}</div> </ScrollShadow>
                            : sectionSearch
                                ? <section className='h-full w-full'>
                                    <Input
                                        label="Busqueda"
                                        autoFocus
                                        isClearable
                                        radius="lg"
                                        onChange={onChangeValue}
                                        onFocusChange={(value) =>
                                            value
                                                ? useSalesStore.getState()?.disabledRedirectSales()
                                                : useSalesStore.getState()?.enabledRedirectSales()
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
                                        className='my-4 w-full'
                                        placeholder="Toca para buscar un producto..."
                                        startContent={
                                            <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                                        }
                                    />
                                    <section style={{ scrollbarGutter: 'stable' }} className='max-h-[60vh] w-full overflow-y-auto flex flex-wrap snap-y snap-mandatory content-start'>
                                        {filteredList?.map((item, index) => (
                                            <div key={'productSearch' + index}
                                                className='w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 xlg:w-[12.5%] snap-start shrink-0'>
                                                <div className='mx-1 my-1 h-[90%] w-auto'>
                                                    <CardUi item={item} setTargetProduct={setTargetProduct}/>
                                                </div>
                                            </div>
                                        ))}
                                        {!listInventory?.length
                                            ? <div>No hay productos</div>
                                            : (!filteredList.length && messageSearch)
                                                ? <div>{messageSearch}</div>
                                                : null
                                        }
                                    </section>
                                </section>
                                : <section style={{ scrollbarGutter: 'stable' }} className='max-h-[60vh] w-full overflow-y-auto flex flex-wrap snap-y snap-mandatory content-start'>
                                    {listInventory?.map((item, index) => (
                                        <div ref={index + 1 === listInventory.length && showMoreEnable ? refShowMore : null} key={'productList' + index} className='w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 xlg:w-[12.5%] snap-start shrink-0'>
                                            <div className='mx-1 my-1'>
                                                <CardUi item={item} setTargetProduct={setTargetProduct}/>
                                            </div>
                                        </div>
                                    ))}

                                </section> }

                    </section>
                </div>
            </section>
            <ProductDetail targeProduct={targeProduct} isOpen={isOpen} onClose={onClose} setTargetProduct={setTargetProduct}/>
        </section>
    )
}
