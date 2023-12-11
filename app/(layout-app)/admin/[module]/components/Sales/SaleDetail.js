'use client'
import { useEffect, useState } from 'react'
import useLastSalesStore from './store'
import { Modal, ModalBody, ModalContent, ModalHeader, Spinner, useDisclosure } from '@nextui-org/react'

export default function SaleDetail (params) {
    const { target, setTarget } = params
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false)
    const [dataModel, setDataModel] = useState(null)
    const { requestSaleDetail } = useLastSalesStore()

    useEffect(() => {
        if (target) {
            onOpen()
            setIsLoading(true)
            const data = requestSaleDetail({ saleId: target })
            setDataModel(data)
            setIsLoading(false)
        } else {
            onClose()
            setDataModel(null)
        }
    }, [target])

    const closeModal = () => {
        setTarget(null)
        onClose()
    }

    return <section>
        <Modal
            isOpen={isOpen}
            size={'2xl'}
            backdrop='opaque'
            onClose={closeModal}
        >
            <ModalContent>

                <ModalHeader>
                    <p>Fecha: -</p>
                </ModalHeader>
                <ModalBody>
                    {
                        isLoading
                            ? <Spinner>Cargando boleta...</Spinner>
                            : <div>{target}</div>
                    }
                </ModalBody>
            </ModalContent>
        </Modal>
    </section>
}
