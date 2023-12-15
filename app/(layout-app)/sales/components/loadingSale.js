/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Text } from '@nextui-org/react'
import Lottie from 'lottie-react'
import useInvoiceStore from './invoice/store'
import useMachineStore from './store/machine'
import cardloading from '@/assets/gifs/card-loading.json'
import useSalesStore from '../store'
export default function LoadingSale ({ payment, loadingSale, setPageTarget, setPayment, isOpen, onClose, setGoPay, totalPay, payDetailed, setPayDetailed, listSales, createSale, paymentTarget, voucherTarget, clearList, pageTarget, onOpen, setPaymentTarget, setSearchInput, setVoucherTargetValue }) {
    const { status, setStatus } = useMachineStore(({ status, setStatus }) => ({ status, setStatus }))
    const { targetCustomer, setTargetCustomer } = useInvoiceStore(({ targetCustomer, setTargetCustomer }) => ({ targetCustomer, setTargetCustomer }))
    const {
        listSalesActives,
        saleIdActive,
        removeSale,
        setLoadingSale
    } = useSalesStore()
    const handleCancelSale = () => {
        setPaymentTarget(listSalesActives, saleIdActive, null)
        setPayDetailed(null)
        onClose()
        setGoPay(false)
        setLoadingSale(false)
    }
    useEffect(() => {
        if (status) {
            onOpen()
        } else {
            onClose()
        }
    }, [status])
    return (

        <Modal
            size='5xl'
            className='h-[40rem]'
            isOpen={isOpen}
            backdrop='opaque'
            scrollBehavior={'inside'}
            closeButton={<></>}
        >
            <ModalContent className='items-center content-center py-2' >
                <ModalBody className='gap-4 w-6/12 items-center justify-around' >
                    <section className="h-[10rem] w-[15rem] rounded-full border border-primary-200 bg-primary-100 ">
                        <Lottie animationData={cardloading} loop={true} />
                    </section>
                    <section className="flex flex-col items-center h-[11rem] space-y-3">
                        <Button isLoading={true} className='text-2xl w-[15rem] h-[5rem] bg-green-600 text-white'>{'pendiente'}</Button>
                        <Button
                            color="danger"
                            variant="shadow"
                            className="text-2xl h-[5rem] w-[15rem] "
                            onClick={handleCancelSale}
                        >
                            Cancelar
                        </Button>
                    </section>

                </ModalBody>

            </ModalContent>
        </Modal>

    )
}
