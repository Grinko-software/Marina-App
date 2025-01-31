/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Text
} from '@nextui-org/react'
import Lottie from 'lottie-react'
import useInvoiceStore from './invoice/store'
import useMachineStore from './store/machine'
import cardloading from '@/assets/gifs/card-loading.json'
import useSalesStore from '../store'
import { CreditIcon } from '@/components/ui/CreditIcon'
import toast from 'react-hot-toast'
export default function LoadingSale ({
    isOpen,
    onClose,
    setPayDetailed,
    paymentTarget,
    onOpen,
    setPaymentTarget,
    setSearchInput
}) {
    const notify = (text) => toast(text)
    const [methodPage, setMethodPage] = useState(null)
    const { status, setStatus } = useMachineStore(({ status, setStatus }) => ({
        status,
        setStatus
    }))
    const { targetCustomer, setTargetCustomer } = useInvoiceStore(
        ({ targetCustomer, setTargetCustomer }) => ({
            targetCustomer,
            setTargetCustomer
        })
    )
    const { listSalesActives, saleIdActive, removeSale, setLoadingSale } =
		useSalesStore()
    const handleCancelSale = () => {
        setPaymentTarget(listSalesActives, saleIdActive, null)
        setPayDetailed(null)
        onClose()
        setLoadingSale(false)
    }
    const handleButton = (value) => {
        setMethodPage(value)
        setSearchInput(null)
        setPaymentTarget(listSalesActives, saleIdActive, paymentTarget)
        setPaymentTarget(listSalesActives, saleIdActive, null)
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
            size="5xl"
            className="h-[35rem] w-6/12"
            isOpen={isOpen}
            backdrop="opaque"
            scrollBehavior={'inside'}
            closeButton={<></>}
        >
            <ModalContent>
                {status
                    ? (
                        <ModalBody>
                            <section className="flex flex-col items-center py-[3.5rem]">
                                <section className="h-[10rem] w-[15rem] rounded-full border border-primary-200 bg-primary-100 ">
                                    <Lottie animationData={cardloading} loop={true} />
                                </section>
                            </section>
                            <section className="flex flex-col items-center pt-10  h-full">
                                <section className="flex flex-col items-center space-y-10">
                                    <section className="flex flex-col items-center h-[11rem] space-y-3">
                                        <Button
                                            isLoading={true}
                                            className="text-2xl w-[15rem] h-[5rem] bg-transparent text-primary-500"
                                        >
                                            {status}
                                        </Button>
                                        <Button
                                            color="danger"
                                            variant="shadow"
                                            className="text-2xl h-[5rem] w-[15rem] "
                                            onClick={handleCancelSale}
                                        >
										Cancelar
                                        </Button>
                                    </section>
                                </section>
                            </section>
                        </ModalBody>
                    )
                    : (
                        <ModalBody>
                            <section className="flex flex-col items-center py-[6rem]">
                                <h5 className="text-4xl font-bold leading-none text-gray-900 dark:text-white">
								Seleccione Débito o Crédito
                                </h5>
                            </section>
                            <section className="flex flex-col items-center h-full space-y-10">
                                <section className="flex flex-col items-center space-y-3">
                                    <section className="flex flex-wrap space-x-3">
                                        <Button
                                            color="success"
                                            size="lg"
                                            className="flex flex-col border dark:border-secondary-200 w-44 h-44 bg-green-500"
                                            isIconOnly
                                            variant="solid"
                                            aria-label=""
                                            onClick={() => {
                                                handleButton(2)
                                            }}
                                        >
                                            <CreditIcon />
                                            <p className="dark:text-white/60 text-black uppercase  text-xl font-bold ">
                                                {'Débito'}
                                            </p>
                                        </Button>
                                        <Button
                                            color="success"
                                            size="lg"
                                            className="flex flex-col border dark:border-secondary-200 w-44 h-44 bg-green-500"
                                            isIconOnly
                                            variant="solid"
                                            aria-label=""
                                            onClick={() => {
                                                handleButton(1)
                                            }}
                                        >
                                            <CreditIcon />
                                            <p className="dark:text-white/60 text-black uppercase  text-xl font-bold ">
                                                {'Crédito'}
                                            </p>
                                        </Button>
                                    </section>
                                </section>
                                <Button
                                    color="danger"
                                    variant="shadow"
                                    className="text-2xl h-[5rem] w-[15rem]"
                                    onClick={handleCancelSale}
                                >
								Cancelar
                                </Button>
                            </section>
                        </ModalBody>
                    )}
            </ModalContent>
        </Modal>
    )
}
/*
<section>
                                <section className="h-[10rem] w-[15rem] rounded-full border border-primary-200 bg-primary-100 ">
                                    <Lottie animationData={cardloading} loop={true} />
                                </section>
                                <section className="flex flex-col items-center h-[11rem] space-y-3">
                                    <Button isLoading={true} className='text-2xl w-[15rem] h-[5rem] bg-green-600 text-white'>{status}</Button>
                                    <Button
                                        color="danger"
                                        variant="shadow"
                                        className="text-2xl h-[5rem] w-[15rem] "
                                        onClick={handleCancelSale}
                                    >
                            Cancelar
                                    </Button>
                                </section>
                            </section>
*/
