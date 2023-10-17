/* eslint-disable no-unused-vars */
'use client'
import React, { useState, useEffect } from 'react'
import { Button, Skeleton, Card } from '@nextui-org/react'
import PaymentButton from '@/components/ui/PaymentButton'
import { CashIcon } from '@/components/ui/CashIcon'
import { CreditIcon } from '@/components/ui/CreditIcon'
import { InvoiceIcon } from '@/components/ui/InvoiceIcon'
import { TicketIcon } from '@/components/ui/TicketIcon'
import { BillIcon } from '@/components/ui/BillIcon'
import useSalesStore from './store'
import usePaymentStore from '@/stores/payment'
import useVocuherStore from '@/stores/voucher'
export default function PayPage (props) {
    /* Change state to go back to sales table product */
    const {
        setPayment,
        paymentTarget,
        setPaymentTarget,
        voucherTarget,
        setVoucherTarget
    } = props
    /* Use states */

    const { payment, getPaymentType, loadingPayment } = usePaymentStore()
    const { voucher, getVoucherType, loadingVoucher } = useVocuherStore()
    const {
        listSalesActives,
        saleIdActive
    } = useSalesStore()
    const listEmpty = new Array(2).fill(null)
    const listEmpty3 = new Array(3).fill(null)
    useEffect(() => {
        /* Check token */
        getPaymentType()
        getVoucherType()
    }, [])
    return (
        <section className='animation-fade-in h-full w-full'>
            <section className="z-10 h-[6%] w-[7rem] top-[52px] rounded-t-[12px] bg-secondary-50 dark:bg-secondary-450">
                <Button size="lg" className="flex flex-col items-center h-full w-full font-bold" isIconOnly variant="ligth" aria-label="" onClick={() => {
                    setPaymentTarget(listSalesActives, saleIdActive, null)
                    setPayment(false)
                } }>Volver</Button>
            </section>
            <section className='flex flex-col h-3/4  sm:h-[93%] items-center px-5 py-[1rem] shadow-md hover:shadow-lg  rounded-tl-[0px]  bg-secondary-50 dark:bg-secondary-450 rounded-[14px]'>
                <div className='flex flex-col w-full h-full items-center mt-10'>
                    <h5 className="text-4xl font-bold leading-none text-gray-900 dark:text-white">Seleccione Boleta, factura o Ticket</h5>
                    <div className='flex flex-col items-center'>
                        <div className='flex flex-row mt-10 space-x-10  items-center '>

                            { loadingVoucher
                                ? <section className='flex flex-row space-x-10'>
                                    {listEmpty3?.map((element, index) => <Card key={index} className='animation-fade-in p-1 w-[176px] h-[176px]' shadow="sm">
                                        <Skeleton className="rounded-lg">
                                            <div className=" h-32 rounded-lg bg-default-300"></div>
                                        </Skeleton>
                                        <div className="flex flex-col items-center space-y-3 py-3">
                                            <Skeleton className="w-4/5 rounded-lg">
                                                <div className="h-2 w-4/5 rounded-lg bg-default-200"></div>
                                            </Skeleton>
                                            <Skeleton className="w-4/5 rounded-lg">
                                                <div className="h-2 w-4/5 rounded-lg bg-default-200"></div>
                                            </Skeleton>
                                        </div>
                                    </Card>)
                                    }
                                </section>
                                : voucher?.map((vouch) =>
                                    <PaymentButton
                                        key={vouch?.id}
                                        id={vouch?.id}
                                        icon = {vouch?.id === 1 ? <BillIcon/> : vouch?.id === 2 ? <InvoiceIcon/> : <TicketIcon/>} title={vouch?.name}
                                        voucherTarget={voucherTarget}
                                        setVoucherTarget={setVoucherTarget}
                                    />)
                            }
                        </div>
                    </div>
                </div>
                <div className='flex flex-col  w-full h-full mt-16 items-center'>
                    <h5 className="text-4xl font-bold leading-none text-gray-900 dark:text-white flex-initial">Seleccione el medio de pago</h5>
                    <div className='flex flex-col items-center'>
                        <div className='flex flex-row  space-x-10 mt-10 item-center'>
                            { loadingPayment
                                ? <section className='flex flex-row space-x-10'>
                                    {listEmpty?.map((element, index) => <Card key={index} className='animation-fade-in p-1 w-[176px] h-[176px]' shadow="sm">
                                        <Skeleton className="rounded-lg">
                                            <div className=" h-32 rounded-lg bg-default-300"></div>
                                        </Skeleton>
                                        <div className="flex flex-col items-center space-y-3 py-3">
                                            <Skeleton className="w-4/5 rounded-lg">
                                                <div className="h-2 w-4/5 rounded-lg bg-default-200"></div>
                                            </Skeleton>
                                            <Skeleton className="w-4/5 rounded-lg">
                                                <div className="h-2 w-4/5 rounded-lg bg-default-200"></div>
                                            </Skeleton>
                                        </div>
                                    </Card>)
                                    }
                                </section>
                                : payment?.map((pay) => <PaymentButton
                                    key={pay?.id}
                                    id={pay?.id}
                                    icon = {pay?.id === 1 ? <CashIcon/> : <CreditIcon/>} title={pay?.name}
                                    paymentTarget={paymentTarget}
                                    setPaymentTarget={setPaymentTarget}/>)
                            }
                        </div>
                    </div>
                </div>

            </section>
        </section>
    )
}
