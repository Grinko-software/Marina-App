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
import { BiSolidOffer } from 'react-icons/bi'
import useSalesStore from '../../store'
import usePaymentStore from '@/stores/payment'
import useVocuherStore from '@/stores/voucher'
import Discount from '../discount/discount'
import useStore from './store/store'
import useInvoiceStore from '../invoice/store'
import useInventoryStore from '@/app/(layout-app)/inventory/store'
import { MdPrint } from 'react-icons/md'
import useSettingsStore from '@/stores/settings'
export default function PayPage (props) {
    const {
        getData,
        error,
        loading,
        setLoading,
        data,
        triggerAction
    } = useStore((state) => state)
    /* Control list products on local */
    const { listInventory } = useInventoryStore(({ listInventory }) => ({ listInventory }))
    /* Change state to go back to sales table product */
    const {
        setPayment,
        paymentTarget,
        setPaymentTarget,
        voucherTarget,
        setVoucherTarget
    } = props
    /* Use states */
    const [openModal, setOpenModal] = useState(false)
    const { payment, getPaymentType } = usePaymentStore()
    const { voucher, getVoucherType } = useVocuherStore()
    const { customers, getCustomers } = useInvoiceStore()
    const { printEnabled: isPrintActived, setPrintEnabled } = useSettingsStore()
    const [activeSale, setActiveSale] = useState(null)
    const {
        listSalesActives,
        saleIdActive
    } = useSalesStore()
    const listEmpty = new Array(2).fill(null)
    const listEmpty3 = new Array(3).fill(null)
    const handleButton = () => {
        // removeSale(listSalesActives, saleIdActive)
        // setPayment(false)
        setOpenModal(!openModal)
    }
    useEffect(() => {
        if (data) {
            getPaymentType(data?.typePayment)
            getVoucherType(data?.typeVoucher)
            getCustomers(data?.customers)
        }
    }, [data])
    // Handle request
    /* Handle multiple request */
    useEffect(() => {
        if (!payment?.length || !voucher?.length || !customers?.length) {
            getData()
            return () => {
                setLoading(false)
            }
        }
    }, [])
    useEffect(() => {
        const sale = listSalesActives?.find((sale) => sale.id === saleIdActive)
        setActiveSale(sale)
    }, [listSalesActives])

    return (
        <section className='animation-fade-in h-full w-full'>
            {openModal ? <Discount openModal={openModal} setOpenModal={setOpenModal} handleButton={handleButton}/> : null}
            <section className="z-10 h-[3.5rem] w-[7rem] rounded-t-[12px] bg-secondary-50 dark:bg-secondary-450">
                <Button size="lg" className="flex flex-col items-center h-full w-full font-bold" isIconOnly variant="ligth" aria-label="" onClick={() => {
                    setPaymentTarget(listSalesActives, saleIdActive, null)
                    setPayment(false)
                } }>
                Volver
                </Button>
            </section>
            <section className='flex flex-col h-3/4 mt-[-0.2rem] sm:h-[93%] items-center px-5 shadow-md hover:shadow-lg  rounded-tl-[0px]  bg-secondary-50 dark:bg-secondary-450 rounded-[14px]'>
                <div className='flex flex-col w-full h-full'>
                    <div className='flex flex-row py-[0.7rem] items-end justify-end gap-5'>
                        {/*  <Button className='animation-fade-in h-[56px] text-lg font-semibold' variant="bordered" onClick={() => setPrintEnabled(!isPrintActived) } startContent={<MdPrint size={25}/>}>
                                Imprimir boleta: { isPrintActived ? 'Activado' : 'Desactivado'}
                        </Button> */}
                        <div className=''>
                            <Button className='animation-fade-in h-[56px] text-lg  bg-amber-400 dark:bg-amber-400 font-semibold' color='danger' variant="bordered" onClick={() => (handleButton()) } startContent={<BiSolidOffer size={25}/>}>
                                { activeSale?.discount ? ('$' + activeSale?.discount + ' DSC. aplicado (' + activeSale?.discountPctg + '%)') : ' Agregar Descuento'}
                            </Button>
                        </div>
                    </div>
                    <h5 className="text-4xl font-bold leading-none text-gray-900 dark:text-white">Seleccione Boleta, factura o Ticket</h5>
                    <div className='flex flex-col items-center'>
                        <div className='flex flex-row mt-10 space-x-10  items-center '>

                            { loading
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
                            { loading
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
                                            <Skeleton className="w-4/5 rounded-lg">
                                                <div className="h-2 w-4/5 rounded-lg bg-default-200"></div>
                                            </Skeleton>
                                        </div>
                                    </Card>)
                                    }
                                </section>
                                : payment?.map((pay) =>
                                    <PaymentButton
                                        key={pay?.id}
                                        id={pay?.id}
                                        icon = {
                                            pay?.id === 1
                                                ? <CashIcon/>
                                                : <CreditIcon/>}
                                        title={pay?.name}
                                        paymentTarget={paymentTarget}
                                        setPaymentTarget={setPaymentTarget}
                                    />
                                )
                            }
                        </div>
                    </div>
                </div>

            </section>
        </section>
    )
}
