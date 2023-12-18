'use client'
import { useEffect, useState } from 'react'
import useLastSalesStore from './store'
import { Button, Modal, ModalBody, ModalContent, ModalHeader, Spinner, useDisclosure } from '@nextui-org/react'
import { generatePdfDocument } from '@/app/(layout-app)/sales/components/voucher/services'

export default function SaleDetail (params) {
    const { target, setTarget } = params
    const [targetValue, setTargetValue] = useState(null)
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false)
    const [dataModel, setDataModel] = useState(null)
    const { requestSaleDetail } = useLastSalesStore()

    useEffect(() => {
        if (target) {
            setTargetValue(target?.target)
        } else {
            setTargetValue(null)
        }
    }, [target])

    useEffect(() => {
        if (targetValue) {
            onOpen()
            fetchData()
        } else {
            setDataModel(null)
            closeModal()
        }
    }, [targetValue])

    useEffect(() => {
        if (dataModel && target) {
            printTicket()
        }
    }, [dataModel, target])

    const closeModal = () => {
        setTarget(null)
        if (isOpen) {
            onClose()
        }
    }

    const fetchData = async () => {
        setIsLoading(true)
        const data = await requestSaleDetail({ saleId: targetValue })
        const modelData = data?.data?.SaleDetailed?.map((item) => {
            return {
                name: item?.Name?.toUpperCase(),
                quantity: item?.quantity,
                total: item?.total
            }
        })
        setDataModel(modelData || null)
        setIsLoading(false)
    }

    const printTicket = () => {
        if (dataModel && target) {
            generatePdfDocument({
                listSales: dataModel,
                totalPay: target?.total,
                discount: target?.discount,
                datetime: target?.datetime,
                iva: target?.iva,
                totalTaxFree: target?.totalTaxFree,
                netTotal: target?.total - target?.iva
            })
        }
    }

    return <section>
        <Modal
            isOpen={isOpen}
            size={'md'}
            backdrop='opaque'
            onClose={closeModal}
        >
            <ModalContent>

                <ModalHeader>
                    <p>Fecha de venta: {target?.datetime.format('YYYY-MM-DD HH:mm:ss')}</p>
                </ModalHeader>
                <ModalBody>
                    {
                        isLoading
                            ? <Spinner>Cargando boleta...</Spinner>
                            : <div>
                                <Button className='w-full m-auto text-md' onPress={() => printTicket()}>
                                    Imprimir Ticket
                                </Button>
                            </div>
                    }
                </ModalBody>
            </ModalContent>
        </Modal>
    </section>
}
