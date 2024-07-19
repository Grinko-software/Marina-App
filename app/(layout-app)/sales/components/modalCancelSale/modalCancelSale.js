import React, { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Textarea } from '@nextui-org/react'
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
                size='5xl'
                className={'h-[40rem]'}
                isOpen={isOpen}
                backdrop='opaque'
                scrollBehavior={'inside'}
                closeButton={<></>}
            >
                <ModalContent className='items-center content-center py-10' >
                    <ModalHeader className="flex flex-col text-primary-500 dark:text-primary-200  text-4xl font-extrabold ">
                       Venta cancelada
                    </ModalHeader>
                    <ModalBody className='justify-center'>
                        <Textarea
                            label={<p className='text-xl'>{'Por favor, agregue un motivo detallado para la cancelación de esta venta'}</p>}
                            placeholder=""
                            className="w-[50rem]"
                            maxRows={10}
                            minRows={10}
                            onChange={(e) => setDetailCancel(e.target.value)}
                        />
                    </ModalBody>
                    <ModalFooter className='justify-center'>
                        <div className='space-x-3'>
                            <Button variant="shadow" className="w-[18rem] h-[6rem] text-2xl font-extrabold bg-primary-400 text-primary-50"
                                isDisabled={loadingSale}
                                onClick={() => {
                                    onClose()
                                }}
                            >
                            Volver
                            </Button>
                            <Button color="danger" variant="shadow" className="w-[18rem] h-[6rem] text-2xl font-extrabold"
                                isDisabled={loadingSale}
                                onClick={() => {
                                    handleCancelSale()
                                }}
                            >
                            Notificar
                            </Button>
                        </div>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </section>
    )
}
