import React, { useState } from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Textarea,
    Popover,
    PopoverTrigger,
    PopoverContent
} from '@nextui-org/react'
import { notify } from '@/services/notify'

import useSalesStore from '../../store'

export default function ModalCancelSale ({ isOpen, onClose, onComplete }) {
    const {
        loadingSale,
        listSalesActives,
        saleIdActive,
        removeSale,
        cancelSale,
        setPaymentTarget
    } = useSalesStore()

    const [detailCancel, setDetailCancel] = useState(null)
    const [isButtonEnabled, setIsButtonEnabled] = useState(false)

    const handleTextareaChange = (e) => {
        const value = e.target.value
        setDetailCancel(value)
        setIsButtonEnabled(value.trim().length > 0)
    }

    const handleCancelSale = async () => {
        cancelSale({
            sales: listSalesActives,
            saleId: saleIdActive,
            notify,
            removeSale,
            isCardPayment: false,
            onSuccessCancelSale,
            detailCancel
        })
    }

    const onSuccessCancelSale = () => {
        setPaymentTarget(listSalesActives, saleIdActive, null)
        onComplete()
        onClose()
        onComplete()
    }

    return (
        <section>
            <Modal
                size="5xl"
                className={'h-[40rem]'}
                isOpen={isOpen}
                backdrop="opaque"
                scrollBehavior={'inside'}
                closeButton={<></>}
            >
                <ModalContent className="items-center content-center py-10">
                    <ModalHeader className="flex flex-col text-primary-500 dark:text-primary-200  text-4xl font-extrabold ">
						Venta cancelada
                    </ModalHeader>
                    <ModalBody className="justify-center">
                        <Textarea
                            label={
                                <p className="text-xl">
                                    {
                                        'Por favor, agregue un motivo detallado para la cancelación de esta venta'
                                    }
                                </p>
                            }
                            placeholder=""
                            className="w-[50rem]"
                            maxRows={10}
                            minRows={10}
                            onChange={handleTextareaChange}
                        />
                    </ModalBody>
                    <ModalFooter className="justify-center">
                        <div className="space-x-3">
                            <Button
                                variant="shadow"
                                className="w-[18rem] h-[6rem] text-2xl font-extrabold bg-primary-400 text-primary-50"
                                isDisabled={loadingSale}
                                onClick={() => {
                                    onClose()
                                }}
                            >
								Volver
                            </Button>
                            {isButtonEnabled
                                ? (
                                    <Button
                                        color="danger"
                                        variant="shadow"
                                        className="w-[18rem] h-[6rem] text-2xl font-extrabold"
                                        isDisabled={loadingSale}
                                        onClick={() => {
                                            handleCancelSale()
                                        }}
                                    >
									Notificar
                                    </Button>
                                )
                                : (
                                    <Popover
                                        placement="top"
                                        radius="lg"
                                        showArrow={true}
                                        color="warning"
                                        size="lg"
                                    >
                                        <PopoverTrigger>
                                            <Button
                                                color="danger"
                                                variant="shadow"
                                                className="w-[18rem] h-[6rem] text-2xl font-extrabold"
                                                isDisabled={loadingSale}
                                            >
											Notificar
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <div className="flex flex-col px-1 py-2 items-center content-center ">
                                                <div className=" text-primary-500 dark:text-primary-200  text-xl font-extrabold">
												ADVERTENCIA
                                                </div>
                                                <div className="text-primary-500 dark:text-primary-200  text-lg font-normal">
												Para continuar, debe ingresar el motivo{' '}
                                                </div>
                                                <div className="text-primary-500 dark:text-primary-200  text-lg font-normal">
												por el cual desea cancelar la venta.
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                )}
                        </div>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </section>
    )
}
