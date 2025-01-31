/* eslint-disable no-unused-vars */
'use client'
import React, { useEffect, useState } from 'react'
import CardUi from '@/components/ui/Card'
import { Tabs, Tab, useDisclosure, Skeleton, Divider } from '@nextui-org/react'
import useSalesStore from '../../store'
import useInventoryStore from '../../../inventory/store'
import LoadingCard from '@/components/ui/Loading'
import WeighingScaleModal from '../weighingScaleModal'
import useOffersStore from '@/stores/offers'
import useSyncStore from '@/stores/common/sync'
import { upgradeVersion } from '@/services/sync'
import useStore from './store'
export default function tableProducts (props) {
    const { getData, error, loading, setLoading, data, triggerAction } = useStore(
        (state) => state
    )
    const { searchInput, setSearchInput } = props
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [targeProduct, setTargetProduct] = useState(null)
    const [selectedProductWithKG, setSelectedProductWithKG] = useState(null)
    const [categoryTabSelected, setCategoryTabSelected] = useState()
    const [listInventory, setListInventory] = useState([])
    const {
        listCategories,
        listInventory: list,
        getCategories,
        getListInventory,
        loadingCategories,
        handleProductRequest
    } = useInventoryStore(
        ({
            listCategories,
            listInventory: list,
            getCategories,
            getListInventory,
            loadingCategories,
            handleProductRequest
        }) => ({
            listCategories,
            listInventory: list,
            getCategories,
            getListInventory,
            loadingCategories,
            handleProductRequest
        })
    )
    const [filteredList, setFilteredList] = useState([])
    const {
        addFromNewSales,
        setTotalPrice,
        units,
        listSalesActives,
        saleIdActive
    } = useSalesStore()
    const { offers, getOffers } = useOffersStore()
    const listEmpty = new Array(20).fill(null)

    const [listSales, setListSales] = useState([])
    const { lastUpdate, setLastUpdate } = useSyncStore()
    useEffect(() => {
        const sale = listSalesActives?.find((sale) => sale.id === saleIdActive)
        setListSales(sale.saleProductsList)
    }, [saleIdActive, listSalesActives, useSalesStore.getState()])

    useEffect(() => {
        if (categoryTabSelected) {
            setSearchInput(null)
            setListInventory(
                list?.filter(
                    (item) => item.productCategoryId === parseInt(categoryTabSelected)
                )
            )
        }
    }, [categoryTabSelected, list])

    const onCompleteFunction = () => {
        setTargetProduct(null)
        setSelectedProductWithKG(null)
    }

    useEffect(() => {
        if (targeProduct) {
            // agregar a la lista de venstas
            if (targeProduct?.stockTypeId === 1) {
                setSelectedProductWithKG(targeProduct)
            } else {
                addFromNewSales(
                    listSalesActives,
                    saleIdActive,
                    targeProduct,
                    units,
                    offers,
                    onCompleteFunction
                )
            }
        }
    }, [targeProduct])

    useEffect(() => {
        if (selectedProductWithKG != null) {
            onOpen()
        }
    }, [selectedProductWithKG])

    useEffect(() => {
        if (!isOpen) {
            setTargetProduct(null)
            setSelectedProductWithKG(null)
        }
    }, [isOpen])

    useEffect(() => {
        if (listSales?.length > 0) {
            let currentTotal = 0
            let currentTotalTaxFree = 0
            listSales?.forEach((item) => {
                if (item.product.taxFree) {
                    currentTotalTaxFree += item?.total - (item?.discount || 0)
                }
                currentTotal += item?.total - (item?.discount || 0)
            })
            setTotalPrice(
                listSalesActives,
                saleIdActive,
                Math.round(currentTotal / 10) * 10,
                Math.round(currentTotalTaxFree / 10) * 10
            )
        }
    }, [listSales])
    useEffect(() => {
        const searchSize = searchInput?.length || 0
        if (searchSize >= 3) {
            let updatedList = [...list]
            // Include all elements which includes the search query
            updatedList = updatedList.filter((item) => {
                return item?.meta?.toLowerCase().includes(searchInput?.toLowerCase())
                // return item?.meta?.toLowerCase().indexOf(searchInput?.toLowerCase()) !== -1
            })
            // Trigger render with updated values
            setFilteredList(updatedList)
        } else if (searchSize >= 1) {
            setFilteredList([])
        } else {
            setFilteredList([])
        }
    }, [searchInput])
    useEffect(() => {
        if (data) {
            getCategories(data?.categories)
            getOffers(data?.offers)
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
        <section className="animation-fade-in  w-full flex flex-col">
            <div
                style={{ scrollbarGutter: 'stable', scrollbarWidth: 0 }}
                className="rounded-t-[12px] top-[0px] overflow-x-auto overflow-y-hidden flex items-center w-[8rem] s:w-[14rem] sm:w-[20rem] md:w-full"
            >
                {loadingCategories ? (
                    <section className="pt-3 px-3  flex bg-secondary-50 rounded-t-[12px] dark:bg-secondary-450">
                        <Skeleton className="w-[6rem] m-1 h-8 rounded-lg"></Skeleton>
                        <Skeleton className="w-[6rem] m-1 h-8 rounded-lg"></Skeleton>
                        <Skeleton className="w-[6rem] m-1 h-8 rounded-lg"></Skeleton>
                        <Skeleton className="w-[6rem] m-1 h-8 rounded-lg"></Skeleton>
                        <Skeleton className="w-[6rem] m-1 h-8 rounded-lg"></Skeleton>
                        <Skeleton className="w-[6rem] m-1 h-8 rounded-lg"></Skeleton>
                        <Skeleton className="w-[6rem] m-1 h-8 rounded-lg"></Skeleton>
                        <Skeleton className="w-[6rem] m-1 h-8 rounded-lg"></Skeleton>
                        <Skeleton className="w-[6rem] m-1 h-8 rounded-lg"></Skeleton>
                        <Skeleton className="w-[6rem] m-1 h-8 rounded-lg"></Skeleton>
                    </section>
                ) : (
                    <Tabs
                        color="success"
                        aria-label="Options"
                        // items={listCategories?.length > 0 ? listCategories : []}
                        items={
                            listCategories?.length > 0
                                ? listCategories?.filter(
                                    (element) =>
                                        element?.label === 'FRUTAS' ||
											element?.label === 'VERDURAS' ||
											element?.label === 'CARNES' ||
											element?.label === 'PAN' ||
											element?.label === 'MASCOTAS' ||
											element?.label === 'CAFETERÍA' ||
											element?.label === 'BAZAR' ||
											element?.label === 'OTROS' ||
											element?.label === 'PROMOS' ||
											element?.label === 'REMEDIOS'
								  )
                                : []
                        }
                        selectedKey={categoryTabSelected}
                        onSelectionChange={setCategoryTabSelected}
                        variant={'solid'}
                        className="pt-3 px-3 bg-secondary-50 rounded-t-[12px] dark:bg-secondary-450"
                        classNames={{
                            cursor: 'w-full bg-green-400',
                            tabContent:
								'group-data-[selected=true]:text-primary-50 font-extrabold'
                        }}
                        onClick={() => setSearchInput('')}
                    >
                        {(item) => (
                            <Tab
                                color="primary"
                                variant="shadow"
                                key={item.id}
                                size="xl"
                                title={item.label}
                            ></Tab>
                        )}
                    </Tabs>
                )}
            </div>
            <section className="flex-1 rounded-xl rounded-tl-[0px] p-[1rem] bg-secondary-50 dark:bg-secondary-450">
                <section
                    style={{ scrollbarGutter: 'stable' }}
                    className="w-full flex flex-wrap no-select custom-scrollbar h-[calc(100vh-17.5rem)] overflow-y-auto"
                >
                    {loading && listInventory?.length < 0
                        ? (
                            <div className="gap-4 grid grid-cols-2 md:grid-cols-5 p-1 w-full">
                                {listEmpty?.map((item, key) => (
                                    <LoadingCard key={key} />
                                ))}
                            </div>
                        )
                        : (
                            <section
                                style={{ scrollbarGutter: 'stable' }}
                                className="w-full flex flex-wrap h-[calc(100vh-20rem)]  no-select custom-scrollbar overflow-y-auto content-start snap-mandatory snap-y"
                            >
                                {(filteredList.length ? filteredList : listInventory)?.length > 0
                                    ? (filteredList.length ? filteredList : listInventory)?.map(
                                        (item, index) => (
                                            <div
                                                key={'productList' + index}
                                                className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
                                            >
                                                <div className="h-full p-2">
                                                    <CardUi
                                                        className
                                                        key={index}
                                                        item={item}
                                                        index={index}
                                                        isFromSales={true}
                                                        setTargetProduct={setTargetProduct}
                                                    />
                                                </div>
                                            </div>
                                        )
								  )
                                    : null}
                            </section>
                        )}
                </section>
            </section>
            <WeighingScaleModal
                isOpen={isOpen}
                onClose={onClose}
                product={selectedProductWithKG}
            />
        </section>
    )
}
