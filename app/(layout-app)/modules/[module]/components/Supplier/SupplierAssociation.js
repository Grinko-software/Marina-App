'use client'
import { useEffect, useState } from 'react'
import { Button, Spinner } from '@nextui-org/react'
import useSupplierStore from './store'

export default function SupplierAssociation (params) {
    // eslint-disable-next-line no-unused-vars
    const { target, setTarget } = params
    const [isLoading, setIsLoading] = useState(false)
    const [dataModel, setDataModel] = useState(null)
    const { requestSaleDetail } = useSupplierStore()

    useEffect(() => {
        if (target) {
            fetchData()
        } else {
            setDataModel(null)
        }
    }, [target])

    useEffect(() => {
        if (dataModel && target) {
            printTicket()
        }
    }, [dataModel, target])

    const fetchData = async () => {
        setIsLoading(true)
        const data = await requestSaleDetail({ saleId: target })
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
        /*  if (dataModel && target) {
            generatePdfDocument({
                listSales: dataModel,
                totalPay: target?.total,
                discount: target?.discount,
                datetime: target?.datetime,
                iva: target?.iva,
                totalTaxFree: target?.totalTaxFree,
                netTotal: target?.total - target?.iva
            })
        } */
    }

    return <section>
        {
            isLoading
                ? <Spinner>Cargando productos...</Spinner>
                : <div>
                    <Button className='w-full m-auto text-md' onPress={() => printTicket()}>
                                    Imprimir Ticket
                    </Button>
                </div>
        }
    </section>
}
