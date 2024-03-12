/* eslint-disable no-unused-vars */
'use client'
import React, { useEffect, useState } from 'react'
import SaleListItem from '../../../../components/ui/SalesListItem'
import { Divider, ScrollShadow, Button, Input, Skeleton } from '@nextui-org/react'
import SearchBar from '../../../../components/ui/SearchBar'
import useSalesStore from '@/app/(layout-app)/sales/store'
import { motion } from 'framer-motion'
import useInventoryStore from '../../inventory/store'
import { formatter } from '@/utils/number'
import useScannerStore from '@/stores/scanner'
import useSettingsStore from '@/stores/settings'
import { notify } from '@/services/notify'
/* Get status cash register */
import { getStatus } from '@/components/SettingsNav/services'
export default function SaleList (props) {
    const {
        setPayment, payment, setSearchInput, searchInput,
        paymentTarget,
        voucherTarget, setGoPay, keyFocus,
        setPageTarget, loadingSale
    } = props
    const { disabled, selectedCashRegister } = useSettingsStore(({ disabled, selectedCashRegister }) => ({ disabled, selectedCashRegister }))
    const {
        units,
        setUnits,
        removeSale,
        listSalesActives,
        saleIdActive
    } = useSalesStore()

    const [listSales, setListSales] = useState([])
    const [totalPrice, setTotalPrice] = useState([])
    const [discount, setDiscount] = useState(null)

    useEffect(() => {
        const sale = listSalesActives?.find((sale) => sale.id === saleIdActive)
        setListSales(sale.saleProductsList)
        setTotalPrice(sale.totalPrice)
        if (sale?.discount) {
            const totalDiscount = sale?.totalPrice - (sale?.totalPrice * (sale?.discount / 100))
            setDiscount(totalDiscount)
        }
    }, [saleIdActive, listSalesActives, useSalesStore.getState()])

    useEffect(() => {
        onClear()
    }, [totalPrice])

    const { loading } = useInventoryStore()
    const [inputValue, setInputValue] = useState(1)
    useEffect(() => {
        if (!isNaN(units)) {
            setInputValue(units)
        }
    }, [units])

    const onChange = (event) => {
        setSearchInput(event.target.value)
    }

    const onClear = () => {
        setSearchInput('')
        setDiscount(null)
    }
    const IncreaseUnit = () => {
        const Units = inputValue + 1
        setUnits(Units)
    }
    const DecreaseUnit = () => {
        const Units = inputValue - 1
        if (Units > 0) {
            setUnits(Units)
        }
    }

    const handleButton = () => {
        removeSale(listSalesActives, saleIdActive)
        setPayment(false)
    }
    const handleButtonClick = () => {
        getStatus(selectedCashRegister?.ID).then((status) => {
            if (!status) {
                notify('❌ Error: Se debe iniciar primero la caja para poder efectuar una venta!')
            } else {
                if (!payment) {
                    setPayment(true)
                } else if (paymentTarget === 1 && voucherTarget) {
                    setGoPay(true)
                } else if (paymentTarget === 2 && voucherTarget) {
                    // Create sale
                    setPageTarget(true)
                } else {
                    setGoPay(false)
                }
            }
        })
    }
    useEffect(() => {
        if (keyFocus) {
            const focusKey = document.getElementById(keyFocus)
            focusKey?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }, [keyFocus])
    return (
        <section className='flex mt-[-4.2px] flex-1 flex-col items-center w-full animation-fade-in'>
            <section className='w-full h-full rounded-xl rounded-tr-[0px] bg-primary-50 shadow  dark:bg-secondary-450'>
                <section className='flex flex-row px-1'>
                    <SearchBar onChange={onChange} onClear={onClear} defaultValue={searchInput}/>
                    <Input
                        onFocus={''}
                        className='w-auto mt-3 px-1'
                        label="Unidades"
                        value={inputValue}
                        min={1}
                        onFocusChange={(value) => {
                            if (value) {
                                useScannerStore.getState().setScanFromInputUnits(true)
                            } else {
                                useScannerStore.getState().setScanFromInputUnits(false)
                            }
                        }}
                        onPaste={(e) => { e.preventDefault() }}
                        placeholder={1}
                        defaultValue={1}
                        labelPlacement="inside"
                        onValueChange={(value) => {
                            setTimeout(() => {
                                if (useScannerStore.getState().enabledSetUnits) {
                                    setUnits(value)
                                }
                            }, 100)
                        }}>
                    </Input>
                    <div className='flex flex-col m-3 space-y-1'>
                        <Button size="sm" color='success' className='font-bold text-lg h-[1.6rem] text-white'
                            onClick={() => (IncreaseUnit())}>
                            +
                        </Button>
                        <Button size="sm" color='danger' className='font-bold text-lg h-[1.6rem] text-white'
                            onClick={() => (DecreaseUnit())}>
                        -
                        </Button>
                    </div>
                </section>
                <section className='mb-4'>
                    {listSales.length > 0
                        ? <div className="flex items-center justify-between px-3">
                            <h5 className=" animation-fade-in text-2xl font-bold leading-none text-gray-900 dark:text-white pt-2">Productos</h5>
                            <Button className='animation-fade-in' color="danger" variant="bordered" onClick={() => (handleButton())}>
                                cancelar
                            </Button>
                        </div>

                        : <h5 className="animation-fade-in m-5 text-2xl font-bold leading-none text-gray-900 dark:text-white">{loading ? 'Espere un momento...' : 'Escanee un producto para comenzar la venta...'}</h5>
                    }
                </section>

                <section className="flow-root px-3 max-h-[44rem]">
                    <ul className="divide-y divide-gray-200 dark:divide-white">
                        <ScrollShadow className="w-full h-[31rem] pr-1 ">
                            {listSales?.map((product, index) =>
                                <section key={index} id={product?.product?.code}>
                                    <Divider orientation="horizontal" />
                                    <SaleListItem product={product} />
                                    <Divider orientation="horizontal" />
                                </section>
                            )}
                        </ScrollShadow>

                    </ul>
                </section>

            </section>
            <section className='w-full'>
                {totalPrice
                    ? <Button color="success" variant="shadow" className='text-white mt-2 mb-2 h-[4rem] w-full font-bold text-2xl'
                        onClick={() => {
                            // Verificar si se hizo primero el inicio de caja
                            handleButtonClick()
                        } }>
                        <div className="text-2xl font-bol flex flex-row gap-4 items-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.2,
                                    ease: [0, 0.71, 0.2, 1.01]
                                }}>
                                {loadingSale ? 'Cargando pago ... ' : paymentTarget && voucherTarget ? 'PAGAR  ' : 'TOTAL '}
                                { discount ? formatter.format(discount) : formatter.format(totalPrice) }

                            </motion.div>
                        </div>

                    </Button>
                    : <></>}
            </section>
        </section>
    )
}
