/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Text } from '@nextui-org/react'
import toast, { Toaster } from 'react-hot-toast'
import { formatter } from '@/utils/number'
import useSalesStore from '../store'
import InvoiceDetailed from './invoice/invoice'
import useInvoiceStore from './invoice/store'
export default function PayDetailed ({ payment, setPageTarget, setPayment, isOpen, onClose, setGoPay, totalPay, payDetailed, setPayDetailed, listSales, createSale, paymentTarget, voucherTarget, clearList, pageTarget, onOpen, setPaymentTarget, setSearchInput, setVoucherTargetValue, onOpenLoadingSale }) {
    const [openModal, setOpenModal] = useState(false)
    const { targetCustomer, setTargetCustomer } = useInvoiceStore(({ targetCustomer, setTargetCustomer }) => ({ targetCustomer, setTargetCustomer }))
    const notify = (text) => toast(text)
    const {
        loadingSale,
        listSalesActives,
        saleIdActive,
        removeSale,
        createSaleTicket,
        createSaleInvoice,
        createSaleVoucher
    } = useSalesStore()

    const [changeValue, setChangeValue] = useState(null)
    const [isSuccessCompleted, setIsSuccessCompleted] = useState(null)
    const [isDisableButtonPay, setIsDisableButtonPay] = useState(null)

    useEffect(() => {
        if (paymentTarget === 1) {
            onOpen()
        } else if (paymentTarget === 2) {
            // nOpenLoadingSale()
            setSearchInput(null)
            setPaymentTarget(listSalesActives, saleIdActive, paymentTarget)
            generateSale()
            setPaymentTarget(listSalesActives, saleIdActive, null)
        }
    }, [paymentTarget])
    useEffect(() => {
        if (voucherTarget === 2 && payment) {
            // es factura open modal para agregar el cliente
            setOpenModal(true)
        }
    }, [voucherTarget])

    useEffect(() => {
        setPayDetailed(0)
    }, [])

    useEffect(() => {
        if (totalPay >= 0 && payDetailed >= 0) {
            const value = payDetailed - totalPay
            setChangeValue(value)
        }
    }, [totalPay, payDetailed])

    useEffect(() => {
        if (changeValue >= 0) {
            setIsDisableButtonPay(false)
        } else {
            setIsDisableButtonPay(true)
        }
    }, [changeValue])

    useEffect(() => {
        if (isNaN(payDetailed)) {
            setPayDetailed(0)
        }
    }, [payDetailed])

    const onSuccessSaleWithCash = () => {
        setIsSuccessCompleted(true)
        setPayment(false)
    }
    const onSuccessSaleWithCard = () => {
        setPayment(false)
    }
    const finishSale = () => {
        setPayDetailed(null)
        setSearchInput(null)
        setIsSuccessCompleted(false)
        setPaymentTarget(listSalesActives, saleIdActive, null)
        if (isOpen) {
            onClose()
        }
        setGoPay(false)
    }

    const generateSale = () => {
        setIsDisableButtonPay(true)
        const isCardPay = paymentTarget !== 1
        if (voucherTarget === 3) {
            createSaleTicket({
                sales: listSalesActives,
                saleId: saleIdActive,
                notify,
                removeSale,
                onSuccessSale: isCardPay ? onSuccessSaleWithCard : onSuccessSaleWithCash
            })
        } else if (voucherTarget === 2) {
            createSaleInvoice({
                sales: listSalesActives,
                saleId: saleIdActive,
                notify,
                removeSale,
                targetCustomer,
                isCardPayment: isCardPay,
                onSuccessSale: isCardPay ? onSuccessSaleWithCard : onSuccessSaleWithCash
            })
        } else {
            createSaleVoucher({
                sales: listSalesActives,
                saleId: saleIdActive,
                notify,
                removeSale,
                isCardPayment: isCardPay,
                onSuccessSale: isCardPay ? onSuccessSaleWithCard : onSuccessSaleWithCash
            })
            // createSale(listSalesActives, saleIdActive, notify, onSuccessSale, setPayment, onClose, setGoPay, setPageTarget, paymentTarget, removeSale, voucherTarget, targetCustomer, setTargetCustomer, onSuccessSale)
        }
    }

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
                }}
            />
            <Modal
                size='5xl'
                className='h-[40rem]'
                isOpen={isOpen}
                backdrop='opaque'
                scrollBehavior={'inside'}
                closeButton={<></>}
            >
                <ModalContent className='items-center content-center py-10' >
                    <ModalHeader className="flex flex-col text-primary-500 dark:text-primary-200">
                        <section className="flex flex-row space-x-3">
                            <Button variant="shadow" className=' w-[10rem] h-[8rem] bg-green-700  text-white font-extrabold text-3xl'
                                onClick={() => setPayDetailed(payDetailed + 1000) }>
                                $1.000
                            </Button>
                            <Button variant="shadow" className=' w-[10rem] h-[8rem] bg-indigo-600 text-white font-extrabold text-3xl shadow-lg'
                                onClick={() => setPayDetailed(payDetailed + 2000) }>
                                $2.000
                            </Button>
                            <Button variant="shadow" className=' w-[10rem] h-[8rem] bg-red-600 text-white  font-extrabold text-3xl shadow-lg'
                                onClick={() => setPayDetailed(payDetailed + 5000) }>
                                $5.000
                            </Button>
                            <Button variant="shadow" className=' w-[10rem] h-[8rem] bg-blue-600 text-white  font-extrabold text-3xl shadow-lg'
                                onClick={() => setPayDetailed(payDetailed + 10000) }>
                                $10.000
                            </Button>
                            <Button variant="shadow" className=' w-[10rem] h-[8rem] bg-orange-600 text-white  font-extrabold text-3xl shadow-lg'
                                onClick={() => setPayDetailed(payDetailed + 20000) }>
                                $20.000
                            </Button>
                        </section>
                    </ModalHeader>
                    <ModalBody className='gap-4 w-8/12 items-center justify-around' >
                        <Input
                            size='lg'
                            type="number"
                            variant="faded"
                            labelPlacement={'outside'}
                            placeholder={
                                payDetailed === 0 || payDetailed === null ? 'Ingrese monto de pago' : payDetailed
                            }
                            startContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">$</span>
                                </div>}
                            min={totalPay}
                            onValueChange={(value) => {
                                setPayDetailed(parseInt(value))
                            }}
                        />

                        <div className='grid grid-rows-2 grid-flow-col py-4 w-8/12 content-end justify-between'>
                            <p className='text-3xl font-bold'>{'TOTAL:'}</p>
                            <p className={`text-3xl font-bold ${(changeValue) > 0 ? 'text-green-700' : 'text-red-700'}`}>{((changeValue) > 0 ? 'VUELTO:' : 'SALDO PENDIENTE:')}</p>
                            <p className='text-3xl font-bold '>{ formatter.format(totalPay)}</p>
                            <p className={`text-3xl font-bold ${(changeValue) > 0 ? 'text-green-700' : 'text-red-700'}`}>{((changeValue) > 0 ? formatter.format((Math.abs(changeValue))) : formatter.format((Math.abs(changeValue))))}</p>
                        </div>
                    </ModalBody>
                    <ModalFooter className='justify-center'>
                        {
                            isSuccessCompleted
                                ? <div>
                                    <Button color="danger" variant="shadow" className="w-[18rem] h-[6rem] text-2xl font-extrabold"
                                        onClick={() => {
                                            finishSale()
                                        }}
                                    >
                                        FINALIZAR
                                    </Button>
                                </div>
                                : <div>
                                    <Button variant="shadow" className =" bg-green-500 text-primary-50 w-[18rem] h-[6rem] text-2xl font-extrabold "
                                        isDisabled={isDisableButtonPay}
                                        onClick={() => { generateSale() }}
                                        isLoading={loadingSale}
                                    >
                                        {((changeValue) >= 0 || payDetailed === null ? 'PAGAR' : 'VERIFICANDO PAGO')}
                                    </Button>
                                    <Button color="danger" variant="shadow" className="w-[18rem] h-[6rem] text-2xl font-extrabold"
                                        onClick={() => {
                                            setPaymentTarget(listSalesActives, saleIdActive, null)
                                            setPayDetailed(null)
                                            onClose()
                                            setGoPay(false)
                                        }}
                                    >
                            CANCELAR
                                    </Button>
                                </div>
                        }
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <InvoiceDetailed
                openModal={openModal}
                setOpenModal={setOpenModal}
                setVoucherTargetValue={setVoucherTargetValue}
            />
        </>
    )
}
