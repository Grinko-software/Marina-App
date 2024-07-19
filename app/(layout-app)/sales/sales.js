/* eslint-disable no-unused-vars */
'use client'
import React, { useState, useEffect } from 'react'
import SaleList from '@/app/(layout-app)/sales/components/SalesList'
import { Button, Tab, Tabs, useDisclosure } from '@nextui-org/react'
import TableInventory from './components/tableProduct/tableProduct'
import PayPage from './components/payPage/payPage'
import useSalesStore from './store'
import PayDetailed from './components/payDetailed'
import { PlusIcon } from '@heroicons/react/24/solid'
import LoadingSale from './components/loadingSale'
import SalePrinterModal from './components/printerModal/printerModal'
const SalesMenu = () => {
    /* Este estado muestra la pantalla de pago */
    const [payment, setPayment] = useState(null)
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [openLoadingSale, setOpenLoadingSale] = useState(false)
    const [searchInput, setSearchInput] = useState(null)
    const [payDetailed, setPayDetailed] = useState(null)
    const [paymentTargetValue, setPaymentTargetValue] = useState(null)
    const [voucherTargetValue, setVoucherTargetValue] = useState(null)
    const [keyFocus, setKeyFocus] = useState(null)
    const [totalPrice, setTotalPrice] = useState(null)

    const {
        listSales,
        loadingSale,
        saleIdActive,
        setSelectedSaleId,
        listSalesActives,
        addNewSaleActive,
        setPaymentTarget,
        setVoucherTarget
    } = useSalesStore()
    const onCloseLoadingSale = () => {
        setOpenLoadingSale(false)
    }
    const onOpenLoadingSale = () => {
        setOpenLoadingSale(true)
    }

    useEffect(() => {
        const sale = listSalesActives?.find((sale) => sale.id === saleIdActive)
        setPaymentTargetValue(sale.paymentTarget)
        setVoucherTargetValue(sale.voucherTarget)
        setKeyFocus(sale.keyFocus)
        // Verificar descuentos agregados a la venta en %
        if (sale?.discount) {
            const newTotal = sale?.totalPrice - sale?.discount
            setTotalPrice(newTotal)
        } else {
            setTotalPrice(sale.totalPrice)
        }
    }, [saleIdActive, listSalesActives, useSalesStore.getState()])
    return (
        <section className='h-full w-full flex md:flex-col'>
            <div className="flex h-full w-full space-x-2">
                <section className="w-full flex-1">
                    {payment
                        ? <PayPage setPayment={setPayment}
                            paymentTarget={paymentTargetValue}
                            setPaymentTarget={setPaymentTarget}
                            voucherTarget={voucherTargetValue}
                            setVoucherTarget={setVoucherTarget}
                        />
                        : <TableInventory setSearchInput={setSearchInput} searchInput={searchInput}/>
                    }
                </section>
                <section className="flex flex-col w-[30%]">
                    <section className='w-full flex justify-end'>
                        <section className='flex px-2 space-x-2 items-center bg-secondary-50 rounded-t-[12px] dark:bg-secondary-450'>

                            <Tabs
                                aria-label="Options"
                                items={listSalesActives}
                                selectedKey={saleIdActive.toString()}
                                onSelectionChange={setSelectedSaleId}
                                className="py-2 "
                                classNames={{
                                    cursor: 'bg-green-400 dark:bg-green-400',
                                    tabContent: 'group-data-[selected=true]:text-primary-50'
                                }}
                            >
                                {listSalesActives
                                    ? listSalesActives.map(
                                        (item, index) => (
                                            <Tab key={item.id} size={'lg'} title={`Venta ${index + 1}`}/>
                                        )
                                    )
                                    : null}

                            </Tabs>
                            <Button isDisabled={listSalesActives?.length > 2} isIconOnly>
                                <PlusIcon className='w-5 h-5'
                                    onClick={() => addNewSaleActive(listSalesActives)}/>
                            </Button>
                        </section>
                    </section>

                    <SaleList
                        loadingSale={loadingSale} // loading al efectuar una venta
                        payment={payment}
                        setPayment={setPayment}
                        setSearchInput={setSearchInput}
                        searchInput={searchInput}
                        paymentTarget={paymentTargetValue}
                        voucherTarget={voucherTargetValue}
                        keyFocus={keyFocus}
                    />

                </section>
                <PayDetailed
                    payment={payment}
                    isOpen={isOpen}
                    onClose={onClose}
                    onOpen={onOpen}
                    totalPay={totalPrice}
                    setPayDetailed={setPayDetailed}
                    payDetailed={payDetailed}
                    listSales={listSales}
                    paymentTarget={paymentTargetValue}
                    voucherTarget={voucherTargetValue}
                    setPayment={setPayment}
                    loadingSale={loadingSale}
                    setPaymentTarget={setPaymentTarget}
                    setSearchInput={setSearchInput}
                    setPaymentTargetValue={setPaymentTargetValue}
                    setVoucherTargetValue={setVoucherTargetValue}
                    onOpenLoadingSale={onOpenLoadingSale}
                />
                {/* Modal loading sale from debit/credit card */}
                <LoadingSale
                    payment={payment}
                    isOpen={openLoadingSale}
                    onClose={onCloseLoadingSale}
                    onOpen={onOpenLoadingSale}
                    totalPay={totalPrice}
                    setPayDetailed={setPayDetailed}
                    payDetailed={payDetailed}
                    listSales={listSales}
                    paymentTarget={paymentTargetValue}
                    voucherTarget={voucherTargetValue}
                    setPayment={setPayment}
                    loadingSale={loadingSale}
                    setPaymentTarget={setPaymentTarget}
                    setSearchInput={setSearchInput}
                    setPaymentTargetValue={setPaymentTargetValue}
                    setVoucherTargetValue={setVoucherTargetValue}
                />
                <SalePrinterModal/>
            </div>
        </section>
    )
}

export default SalesMenu
