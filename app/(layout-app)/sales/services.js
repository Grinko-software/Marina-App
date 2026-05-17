/* eslint-disable multiline-ternary */
import { POST, getData } from '@/services/http'
import { SALE_TICKET_CREATE } from '@/settings/constants'
import { roundValueWithMath } from '@/utils/number'
import { today } from '@/utils/date'
import { saveDataToPrinterSaleTicket } from '@/services/printer'
import useSettingsStore from '@/stores/settings'

export const getTotalDiscountOffers = ({ products }) => {
    const totalDiscount = products?.reduce(
        (accumulator, product) =>
            accumulator + (product?.discount > 0 ? product?.discount : 0),
        0
    )
    return totalDiscount
}

export const getStateSaleMachine = (url) => {
    return new Promise((resolve, reject) => {
        let limitTime = 0
        const intervalId = setInterval(() => {
            limitTime += 1000 // Incrementa el tiempo transcurrido en cada consulta
            // Realiza la solicitud al endpoint
            getData(url)
                .then((data) => {
                    const statusPayment = data?.data?.paymentRequest?.status ? data?.data?.paymentRequest?.status.toUpperCase() : ''
                    // console.log(statusPayment)
                    // Comprueba si el estado es confirmado
                    if (statusPayment === 'COMPLETED') {
                        clearInterval(intervalId)
                        resolve(data)
                    } else if (statusPayment === 'CANCELED') {
                        clearInterval(intervalId)
                        reject(new Error('Venta cancelada desde la máquina'))
                    }
                })
                .catch((error) => {
                    clearInterval(intervalId)
                    reject(error)
                })
            // Verifica si ha pasado más de 2 minutos y cancela la promesa si es así
            if (limitTime >= 120000) {
                clearInterval(intervalId)
                reject(new Error('Tiempo de espera agotado (más de 2 minutos).'))
            }
        }, 5000) // Consulta cada 1000ms
    })
}
export const createSaleOnHaulmer = (url, method, modelbody, retry = 0) => {
    return new Promise((resolve, reject) => {
        getData(url, method, modelbody)
            .then((data) => {
                retry = retry + 1
                if (data?.data?.TIMBRE) {
                    resolve(data)
                } else {
                    if (retry === 3) {
                        if (data?.data?.error?.message) {
                            const message =
								'Error en haulmer: ' +
								data?.data?.error?.code +
								' ' +
								data?.data?.error?.message
                            reject(new Error(message))
                        } else {
                            reject(new Error('Error al consultar en haulmer'))
                        }
                    } else {
                        return createSaleOnHaulmer(url, method, modelbody, retry)
                    }
                }
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const saveTicketOnDatabase = async ({
    body,
    notify,
    saleType,
    onSuccessSale,
    listSales,
    totalPay,
    netTotal,
    iva,
    totalTaxFree,
    discountExtra,
    discountOffers,
    openCashRegister = false
}) => {
    await getData(SALE_TICKET_CREATE, POST, body).then((result) => {
        if (result?.code === 200) {
            const printEnabled = useSettingsStore.getState()?.printEnabled || true
            if (printEnabled) {
                saveDataToPrinterSaleTicket({
                    saleType,
                    products: listSales,
                    total: totalPay,
                    totalNet: netTotal,
                    iva,
                    totalTaxFree,
                    discountExtra,
                    discountOffers,
                    openCashRegister
                })
            }
            notify('✅ Ticket generado con éxito')
            if (onSuccessSale) {
                onSuccessSale()
            }
        } else {
            notify('❌ Problemas al guardar la venta')
        }
    })
}

export const cancelSaleOnDatabase = async ({ body, notify, onSuccessSale }) => {
    await getData(SALE_TICKET_CREATE, POST, body).then((result) => {
        if (result?.code === 200) {
            notify('ℹ️ Venta cancelada')
            if (onSuccessSale) {
                onSuccessSale()
            }
        } else {
            notify('❌ Problemas al cancelar la venta')
        }
    })
}

export const generateDTEBody = ({
    isInvoice,
    totalTaxFreePay,
    targetCustomer,
    totalPay,
    netTotal,
    iva,
    saleProductsList,
    discount
}) => {
    const date = today().format('YYYY-MM-DD')

    const dteBody = {
        response: ['FOLIO', 'TIMBRE'],
        dte: {
            Encabezado: {
                IdDoc: {
                    TipoDTE: isInvoice ? (iva === 0 ? 34 : 33) : iva === 0 ? 41 : 39,
                    FchEmis: date,
                    IndServicio: '3'
                },
                Emisor: isInvoice
                    ? {
                        RUTEmisor: '77426986-K',
                        RznSoc: 'MARINA MARKET',
                        GiroEmis: 'MINIMARKET',
                        DirOrigen: 'LA MARINA 200 #11001101',
                        CmnaOrigen: 'COQUIMBO',
                        CiudadOrigen: 'COQUIMBO',
                        Telefono: '0 0',
                        CorreoEmisor: '0000',
                        Acteco: '951100'
					  }
                    : {
                        RUTEmisor: '77426986-K'
					  },
                Receptor: isInvoice
                    ? {
                        GiroRecep: targetCustomer?.business_line,
                        RUTRecep: targetCustomer?.rut,
                        CdgIntRecep: targetCustomer?.code,
                        RznSocRecep: targetCustomer?.business_name,
                        DirRecep: targetCustomer?.address,
                        CmnaRecep: targetCustomer?.commune,
                        CiudadRecep: targetCustomer?.commune
					  }
                    : {
                        RUTRecep: '66666666-6'
					  },
                Totales: isInvoice
                    ? {
                        MntNeto: netTotal,
                        MntExe: '0',
                        IVA: totalPay - netTotal,
                        TasaIVA: '19',
                        MntTotal: totalPay,
                        VlrPagar: totalPay
					  }
                    : iva === 0
                        ? {
                            MntExe: totalTaxFreePay,
                            MntTotal: totalPay,
                            TotalPeriodo: totalPay,
                            VlrPagar: totalPay
					  }
                        : {
                            MntNeto: netTotal,
                            MntExe: totalTaxFreePay,
                            IVA: iva,
                            MntTotal: totalPay,
                            TotalPeriodo: totalPay,
                            VlrPagar: totalPay
					  }
            },
            Detalle: isInvoice
                ? saleProductsList?.map((item, index) => {
                    const totalItem = roundValueWithMath(
                        item?.discount > 0 ? item?.total - item?.discount : item?.total,
                        0,
                        0
                    )
                    const netMontoItem = roundValueWithMath(totalItem / 1.19, 0, 0)
                    return {
                        NroLinDet: index + 1,
                        NmbItem: item?.product?.name + ' X ' + item?.quantity,
                        QtyItem: 1,
                        PrcItem: netMontoItem,
                        MontoItem: netMontoItem
                    }
				  })
                : saleProductsList?.map((item, index) => {
                    let indexTaxFree = 0
                    const priceItem =
							item?.discount > 0
							    ? roundValueWithMath(
							        (item?.total - item?.discount) / item?.quantity,
							        0,
							        0
								  )
							    : roundValueWithMath(item?.product?.price, 0, 0)
                    const totalItem = roundValueWithMath(
                        item?.discount > 0 ? item?.total - item?.discount : item?.total,
                        0,
                        0
                    )
                    const quantityItem = item?.quantity
                    if (item?.product?.taxFree) {
                        indexTaxFree++
                        return {
                            NroLinDet: index + 1,
                            IndExe: indexTaxFree,
                            NmbItem: item?.product?.name,
                            QtyItem: quantityItem,
                            PrcItem: discount
                                ? roundValueWithMath(priceItem - priceItem * discount, 0, 0)
                                : priceItem,
                            MontoItem: discount
                                ? roundValueWithMath(totalItem - totalItem * discount, 0, 0)
                                : totalItem
                        }
                    } else {
                        return {
                            NroLinDet: index + 1,
                            NmbItem: item?.product?.name,
                            QtyItem: quantityItem,
                            PrcItem: discount
                                ? roundValueWithMath(priceItem - priceItem * discount, 0, 0)
                                : priceItem,
                            MontoItem: discount
                                ? roundValueWithMath(totalItem - totalItem * discount, 0, 0)
                                : totalItem
                        }
                    }
				  })
        }
    }
    return dteBody
}
