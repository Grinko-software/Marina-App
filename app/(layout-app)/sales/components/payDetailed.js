/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Text } from '@nextui-org/react'
import toast, { Toaster } from 'react-hot-toast'
import { formatter } from '@/utils/number'
import useSalesStore from '../store'

export default function PayDetailed ({ loadingSale, setPageTarget, setPayment, isOpen, onClose, setGoPay, totalPay, payDetailed, setPayDetailed, listSales, createSale, paymentTarget, voucherTarget, clearList, pageTarget, onOpen, setPaymentTarget, setSearchInput }) {
    const notify = (text) => toast(text)
    const {
        listSalesActives,
        saleIdActive,
        removeSale
    } = useSalesStore()

    useEffect(() => {
        if (paymentTarget === 1) {
            onOpen()
            // createSale(paymentTarget, voucherTarget, listSales, notify, setPayment, onClose, setGoPay, clearList, setPageTarget, pageTarget, totalPay)
        } else if (paymentTarget === 2) {
            setSearchInput(null)
            setPaymentTarget(listSalesActives, saleIdActive, null)
            createSale(listSalesActives, saleIdActive, notify, setPayment, onClose, setGoPay, setPageTarget, pageTarget, removeSale)
        }
    }, [paymentTarget])

    useEffect(() => {
        setPayDetailed(0)
    }, [])

    useEffect(() => {
        if (isNaN(payDetailed)) {
            setPayDetailed(0)
        }
    }, [payDetailed])
    return (
        <>
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
            <div className="flex flex-wrap gap-3">
            </div>
            <Modal size={'2xl'}
                isOpen={isOpen}
                backdrop='opaque'
                onClose={() => {
                    onClose()
                    setGoPay()
                    setPaymentTarget(listSalesActives, saleIdActive, null)
                }}
                scrollBehavior={'inside'}
                closeButton={<></>}
            >
                <ModalContent>

                    <ModalHeader className="flex flex-col gap-3 text-primary-500 dark:text-primary-200 gap-y-7">
                        <h1 className='text-4xl font-bold'>CALCULAR PAGO EN EFECTIVO</h1>
                        <section className="flex flex-row items-center justify-center content-between gap-5">
                            <Button className=' w-[8rem] h-[4rem] bg-green-600 text-white font-bold text-lg'
                                onClick={() => setPayDetailed(payDetailed + 1000) }>
                                $1.000
                            </Button>
                            <Button className=' w-[8rem] h-[4rem] bg-indigo-600 text-white font-bold text-lg'
                                onClick={() => setPayDetailed(payDetailed + 2000) }>
                                $2.000
                            </Button>
                            <Button className=' w-[8rem] h-[4rem] bg-red-600 text-white  font-bold text-lg'
                                onClick={() => setPayDetailed(payDetailed + 5000) }>
                                $5.000
                            </Button>
                            <Button className=' w-[8rem] h-[4rem] bg-blue-600 text-white  font-bold text-lg'
                                onClick={() => setPayDetailed(payDetailed + 10000) }>
                                $10.000
                            </Button>
                            <Button className=' w-[8rem] h-[4rem] bg-orange-600 text-white  font-bold text-lg'
                                onClick={() => setPayDetailed(payDetailed + 20000) }>
                                $20.000
                            </Button>
                        </section>
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col space-y-6 items-start justify-start content-between">
                            <Input
                                size='lg'
                                autoFocus={true}
                                type="number"
                                variant={'underlined'}
                                label={ <h1 className='text-2xl'>Monto en efectivo</h1>}
                                labelPlacement={'outside'}
                                placeholder={payDetailed === 0 ? 'Ingrese monto de pago' : payDetailed}
                                endContent={<div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">$</span>
                                </div>}
                                min={totalPay}
                                className='text-2xl'
                                onValueChange={(value) => {
                                    setPayDetailed(parseInt(value))
                                }}
                            />
                            <div className='grid grid-rows-2 grid-flow-col gap-4 '>
                                <h1 className='text-2xl font-bold'>{'Pago total:'}</h1>
                                <h1 className={`text-2xl font-bold ${(totalPay - payDetailed) < 0 ? 'text-green-700' : 'text-red-700'}`}>{((totalPay - payDetailed) < 0 ? 'Vuelto:' : 'Saldo pendiente:')}</h1>
                                <h1 className='text-2xl font-bold '>{ formatter.format(totalPay)}</h1>
                                <h1 className={`text-2xl font-bold ${(totalPay - payDetailed) < 0 ? 'text-green-700' : 'text-red-700'}`}>{((totalPay - payDetailed) < 0 ? formatter.format((payDetailed - totalPay)) : formatter.format((totalPay - payDetailed)))}</h1>
                            </div>
                        </div>

                    </ModalBody>
                    <ModalFooter>

                        <Button className =" bg-green-500 text-primary-50"
                            onClick={
                                () => {
                                    const result = totalPay - payDetailed
                                    if (result <= 0) {
                                        setPayDetailed(null)
                                        setSearchInput(null)
                                        setPaymentTarget(listSalesActives, saleIdActive, null)
                                        createSale(listSalesActives, saleIdActive, notify, setPayment, onClose, setGoPay, setPageTarget, pageTarget, removeSale)
                                        // createSale(paymentTarget, voucherTarget, listSales, notify, setPayment, onClose, setGoPay, clearList, setPayment, totalPay)
                                    } else {
                                        setSearchInput(null)
                                        setPayDetailed(null)
                                        setPaymentTarget(listSalesActives, saleIdActive, null)
                                    }
                                }

                            }
                            isLoading={loadingSale}>
                            {((totalPay - payDetailed) <= 0 ? 'Pagar' : 'Verificar pago')}
                        </Button>

                        <Button color="danger" variant="flat"
                            onClick={() => {
                                setPaymentTarget(listSalesActives, saleIdActive, null)
                                setPayDetailed(null)
                                onClose()
                                setGoPay(false)
                            }}
                        >
                            Cancelar
                        </Button>
                    </ModalFooter>
                </ModalContent>

            </Modal>
        </>
    )
}
