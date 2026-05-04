'use client'
import { useEffect, useState } from 'react'
import useLastSalesStore from './store'
import {
    Button,
    Modal,
    ModalContent,
    Spinner,
    useDisclosure,
    ModalHeader
} from '@nextui-org/react'
import {
    fetchPrinterSaleTicket,
    generateDataToPrinterSaleTicket
} from '@/services/printer'
import toast from 'react-hot-toast'
import salePrintStore from '@/app/(layout-app)/sales/components/printerModal/store'

export default function SaleDetail (params) {
    const { target, setTarget, openModalToPrint, setOpenModalToPrint } = params
    const notify = (text) => toast(text)
    const [targetValue, setTargetValue] = useState(null)
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false)
    const [dataModel, setDataModel] = useState(null)
    const [customerInfo, setCustomerInfo] = useState(null)
    const [info, setInfo] = useState(null)
    const { requestSaleDetail } = useLastSalesStore()
    const { downdloadVoucher } = salePrintStore()

    useEffect(() => {
        if (openModalToPrint) {
            setTargetValue(target?.target)
        }
    }, [openModalToPrint])

    useEffect(() => {
        if (targetValue) {
            onOpen()
            fetchData()
        } else {
            setDataModel(null)
            setCustomerInfo(null)
            closeModal()
        }
    }, [targetValue])

    const closeModal = () => {
        setOpenModalToPrint(false)
        setTarget(null)
        setInfo(null)
        setTargetValue(null)
        if (isOpen) {
            onClose()
        }
    }

    const fetchData = async () => {
        setIsLoading(true)
        const data = await requestSaleDetail({ saleId: targetValue })
        setInfo(data?.data)
        const modelData = data?.data?.sales_detail?.map((item) => {
            return {
                name: item?.Name?.toUpperCase(),
                quantity: item?.quantity,
                total: item?.total
            }
        })
        setDataModel(modelData || null)
        if (data?.data?.customer) {
            setCustomerInfo(data?.data?.customer)
        }

        setIsLoading(false)
    }

    const printTicket = () => {
        if (dataModel && target) {
            const dataToPrint = generateDataToPrinterSaleTicket({
                products: dataModel,
                total: target?.total,
                discountOffers: target?.discount,
                datetime: target?.datetime,
                iva: target?.iva,
                totalTaxFree: target?.totalTaxFree,
                totalNet: target?.total - target?.iva,
                notify,
                userName: target.userName,
                cashRegisterName: target.cashRegisterName,
                stamp: info?.stamp,
                voucherNumber: info?.invoice_number,
                folioNumber: info?.invoice_number,
                saleType: info?.VoucherType?.name, // boleta ticket o factura
                customerDetail: customerInfo
            })

            fetchPrinterSaleTicket({ data: dataToPrint })
        }
    }

    const onDowndloadVoucher = () => {
        // cancelPrintSale()
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 1000)
        const data = generateDataToPrinterSaleTicket({
            products: dataModel,
            total: target?.total,
            discountOffers: target?.discount,
            datetime: target?.datetime,
            iva: target?.iva,
            totalTaxFree: target?.totalTaxFree,
            totalNet: target?.total - target?.iva,
            notify,
            userName: target.userName,
            cashRegisterName: target.cashRegisterName,
            stamp: info?.stamp,
            voucherNumber: info?.invoice_number,
            folioNumber: info?.invoice_number,
            saleType: info?.VoucherType?.name, // boleta ticket o factura
            customerDetail: customerInfo
        })

        downdloadVoucher({ printBodyLastSale: data })
    }

    return (
        <section>
            <Modal
                isOpen={isOpen}
                size="5xl"
                className="h-auto"
                backdrop="opaque"
                onClose={closeModal}
            >
                <ModalContent className="overflow-hidden py-10">
                    <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200 text-[2rem]">
                        <h4 className="flex flex-col items-center">
                            {'¿Desesa re-imprimir comprobante de venta?'}
                        </h4>
                    </ModalHeader>
                    <div className="flex flex-col items-center">
                        {isLoading
                            ? (
                                <Spinner>Cargando boleta...</Spinner>
                            )
                            : (
                                <div className="flex flex-row gap-2">
                                    <Button
                                        className="bg-blue-500 text-primary-50 text-[1.5rem] w-[17rem] h-[8rem]"
                                        onPress={() => {
                                            onDowndloadVoucher()
                                        }}
                                    >
                                        {'Descargar'}
                                    </Button>
                                    <Button
                                        className="bg-green-500 text-primary-50 text-[1.5rem] w-[17rem] h-[8rem]"
                                        onPress={() => {
                                            printTicket()
                                        }}
                                    >
                                        {'Imprimir'}
                                    </Button>
                                </div>
                            )}
                    </div>
                </ModalContent>
            </Modal>
        </section>
    )
}
