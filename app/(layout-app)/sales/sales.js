/* eslint-disable no-unused-vars */
'use client'
import React, { useState, useEffect } from 'react'
import SaleList from '@/app/(layout-app)/sales/components/SalesList'
import { Button, Tab, Tabs, useDisclosure } from '@nextui-org/react'
import TableInventory from './components/tableProduct'
import PayPage from './payPage'
import useSalesStore from './store'
import PayDetailed from './components/payDetailed'
import { PlusIcon } from '@heroicons/react/24/solid'
const SalesMenu = () => {
    const [payment, setPayment] = useState(null)
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [searchInput, setSearchInput] = useState(null)
    const [goPay, setGoPay] = useState(false)
    const [payDetailed, setPayDetailed] = useState(null)
    const [pageTarget, setPageTarget] = useState(null)
    const [paymentTargetValue, setPaymentTargetValue] = useState(null)
    const [voucherTargetValue, setVoucherTargetValue] = useState(null)
    const [keyFocus, setKeyFocus] = useState(null)
    const [totalPrice, setTotalPrice] = useState(null)

    const {
        listSales,
        createSale,
        loadingSale,
        saleIdActive,
        setSelectedSaleId,
        listSalesActives,
        addNewSaleActive,
        setPaymentTarget,
        setVoucherTarget
    } = useSalesStore()

    useEffect(() => {
        setPayment(false)
    }, [saleIdActive])

    useEffect(() => {
        const sale = listSalesActives?.find((sale) => sale.id === saleIdActive)
        setPaymentTargetValue(sale.paymentTarget)
        setVoucherTargetValue(sale.voucherTarget)
        setKeyFocus(sale.keyFocus)
        setTotalPrice(sale.totalPrice)
    }, [saleIdActive, listSalesActives, useSalesStore.getState()])

    /*
    useEffect(() => {
        console.log(selectedId, saleIdActive)
        if (selectedId !== saleIdActive.toString()) {
            setSelectedId(saleIdActive)
        }
    }, [saleIdActive])
 */
    useEffect(() => {
        console.log('payment' + paymentTargetValue)
    }, [paymentTargetValue])
    return (
        <section className='h-full w-full flex md:flex-col'>
            <div className="flex h-full w-full space-x-2">
                <section className="w-full flex-1">
                    {payment
                        ? <PayPage setPayment={setPayment}
                            paymentTarget={paymentTargetValue}
                            setPaymentTarget={setPaymentTarget}
                            voucherTarget={voucherTargetValue} setVoucherTarget={setVoucherTarget}
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
                                    cursor: 'bg-green-400',
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
                            <Button isDisabled={listSalesActives?.length > 2} isIconOnly><PlusIcon className='w-5 h-5'
                                onClick={() => addNewSaleActive(listSalesActives)}/></Button>
                        </section>
                    </section>
                    <SaleList
                        loadingSale={loadingSale}
                        setPageTarget={setPageTarget}
                        payment={payment} setPayment={setPayment}
                        setSearchInput={setSearchInput}
                        paymentTarget={paymentTargetValue}
                        voucherTarget={voucherTargetValue}
                        setGoPay={setGoPay}
                        keyFocus={keyFocus}
                    />
                </section>
                <PayDetailed isOpen={isOpen}
                    onClose={onClose}
                    onOpen={onOpen}
                    totalPay={totalPrice}
                    setGoPay={setGoPay}
                    setPayDetailed={setPayDetailed}
                    payDetailed={payDetailed}
                    listSales={listSales}
                    createSale={createSale}
                    paymentTarget={paymentTargetValue}
                    voucherTarget={voucherTargetValue}
                    setPayment={setPayment}
                    loadingSale={loadingSale}
                    pageTarget={pageTarget}
                    setPageTarget={setPageTarget}
                    setPaymentTarget={setPaymentTarget}
                    setSearchInput={setSearchInput}
                    setPaymentTargetValue={setPaymentTargetValue}
                    setVoucherTargetValue={setVoucherTargetValue}

                />
            </div>
        </section>
    )
}

export default SalesMenu
