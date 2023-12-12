/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { create } from 'zustand'
import { GET_DOCUMENT_HAULMER, SALE_TICKET_CREATE } from '@/settings/constants'
import { fetchPost } from '@/services/sales'
import { generatePdfDocument } from './components/voucher/services'
import { today } from '@/utils/date'
import { roundPrice, roundValueWithMath } from '@/utils/number'
import { getStateSaleMachine } from './services'
import { getDeviceTuu } from '@/services/settings'
const useSalesStore = create(
    (set) => ({
        loadingSale: false,
        error: null,
        units: 1,
        saleIdActive: 1,
        listSalesActives: [{
            id: 1,
            keyFocus: null,
            totalPrice: 0,
            saleProductsList: [],
            paymentTarget: null,
            voucherTarget: 1
        }],
        scannerEnabled: false,
        enabledRedirect: false,
        enabledScanner: (value) => set({ scannerEnabled: true, enabledRedirect: false }),
        disabledScanner: (value) => set({ scannerEnabled: false }),
        enabledRedirectSales: (value) => set({ enabledRedirect: true }),
        disabledRedirectSales: (value) => set({ enabledRedirect: false }),

        setUnits: (value) => set({ units: parseInt(value) }),
        setSelectedSaleId: (value) => set({ saleIdActive: parseInt(value) }),
        addNewSaleActive: (sales) => {
            const size = sales?.length
            const newSaleId = size + 1
            if (size < 3) {
                sales.push({
                    id: size + 1,
                    keyFocus: null,
                    totalPrice: 0,
                    saleProductsList: [],
                    paymentTarget: null,
                    voucherTarget: 1
                })
                set({ listSalesActives: sales })
                set({ saleIdActive: newSaleId })
            }
        },
        setTotalPrice: (sales, saleId, value) => {
            const saleIndex = sales?.findIndex((sale) => sale.id === saleId)
            sales[saleIndex].totalPrice = value
            set({ listSalesActives: sales })
        },
        addFromNewSales: (sales, saleId, product, units, offers, onCompleteFunction) => {
            units = units || 1
            const saleIndex = sales?.findIndex((sale) => sale.id === saleId)
            let listSales = sales[saleIndex].saleProductsList

            const searhProduct = listSales?.find((item) => { return item?.product?.id === product?.id })
            const offersProduct = offers?.find((item) => { return item?.productId === product?.id })
            if (offersProduct) {
                // agregar el arreglo de las ofertas en el list sales
                if (searhProduct) {
                    const quantitySale = searhProduct?.quantity + units
                    const offersOfProduct = Math.trunc(quantitySale / offersProduct.quantity)
                    const newList = listSales?.filter((item) => item?.product?.id !== product?.id)
                    const total = ((product?.price * offersProduct?.quantity) - (offersProduct?.quantity * offersProduct?.unitPrice)) * offersOfProduct
                    const currentTotal = roundValueWithMath(product?.price * quantitySale, 0, 0)
                    listSales = [...newList, { product, quantity: searhProduct?.quantity + units, offers: offersOfProduct, discount: offersOfProduct > 0 ? (roundValueWithMath(total, 0, null) || total) : 0, total: roundPrice(currentTotal) || currentTotal }]
                } else {
                    const quantitySale = units
                    const offersOfProduct = Math.trunc(quantitySale / offersProduct.quantity)
                    const total = ((product?.price * offersProduct?.quantity) - (offersProduct?.quantity * offersProduct?.unitPrice)) * offersOfProduct
                    const currentTotal = roundValueWithMath(product?.price * quantitySale, 0, 0)
                    listSales = [...listSales, { product, quantity: units, offers: offersOfProduct, discount: offersOfProduct > 0 ? (roundValueWithMath(total, 0, null) || total) : 0, total: roundPrice(currentTotal) || currentTotal }]
                }
            } else {
                if (!searhProduct) {
                    const currentTotal = roundValueWithMath(product?.price * parseFloat(units), 0, 0)
                    listSales = [...listSales, { product, quantity: parseFloat(units), discount: 0, total: roundPrice(currentTotal) || currentTotal }]
                } else {
                    const newList = listSales?.filter((item) => item?.product?.id !== product?.id)
                    const currentTotal = roundValueWithMath(product?.price * (searhProduct?.quantity + units), 0, 0)
                    listSales = [...newList, { product, quantity: searhProduct?.quantity + parseFloat(units), discount: 0, total: roundPrice(currentTotal) || currentTotal }]
                }
            }

            sales[saleIndex].saleProductsList = listSales
            sales[saleIndex].keyFocus = product?.code

            set({ listSalesActives: sales })
            set({ units: 1 })

            if (onCompleteFunction) {
                onCompleteFunction()
            }
        },
        removeProduct: (sales, saleId, productId) => {
            const saleIndex = sales?.findIndex((sale) => sale.id === saleId)
            const listSales = sales[saleIndex].saleProductsList

            const newList = listSales?.filter((item) => item?.product?.id !== productId)

            sales[saleIndex].saleProductsList = newList
            set({ listSalesActives: sales })
        },
        removeSale: (sales, saleId) => {
            const saleIndex = sales?.findIndex((sale) => sale.id === saleId)
            const newSaleList = sales?.filter((sale) => sale.id !== saleId)
            if (newSaleList?.length) {
                newSaleList?.forEach((_, index) => {
                    newSaleList[index].id = index + 1
                })
                set({ saleIdActive: newSaleList[0].id })
                set({ listSalesActives: newSaleList })
            } else {
                sales[saleIndex].saleProductsList = []
                sales[saleIndex].totalPrice = 0
                set({ listSalesActives: sales })
            }
        },
        setPaymentTarget: (sales, saleId, value) => {
            const saleIndex = sales?.findIndex((sale) => sale.id === saleId)
            sales[saleIndex].paymentTarget = value
            set({ listSalesActives: sales })
        },
        setVoucherTarget: (sales, saleId, value) => {
            const saleIndex = sales?.findIndex((sale) => sale.id === saleId)
            sales[saleIndex].voucherTarget = value
            set({ listSalesActives: sales })
        },
        /* Create sale */
        createSale: (sales, saleId, notify, setPayment, onClose, setGoPay, setPageTarget, pageTarget, removeSale, targetGeneral, targetCustomer, setTargetCustomer) => {
            const saleIndex = sales?.findIndex((sale) => sale.id === saleId)
            const sale = sales[saleIndex]
            const saleProductsList = sale?.saleProductsList
            const paymentTarget = sale?.paymentTarget || pageTarget
            const voucherTarget = sale?.voucherTarget || targetGeneral
            /*  DTEMITE */
            const totalPay = sale?.totalPrice
            const date = today().format('YYYY-MM-DD')
            const netTotal = roundValueWithMath(totalPay / 1.19, 0, 0)
            /* 1: Boleta model  2: factura model */

            // TODO:integrar factura
            const modelBody = voucherTarget === 1
                ? {
                    response: [
                        'PDF', 'TIMBRE'
                    ],
                    dte: {
                        Encabezado: {
                            IdDoc: {
                                TipoDTE: 39,
                                Folio: 0,
                                FchEmis: '2023-12-08',
                                IndServicio: '3'
                            },
                            Emisor: {
                                RUTEmisor: '77426986-K',
                                RznSocEmisor: 'MARINA MARKET',
                                GiroEmisor: 'MINIMARKET',
                                DirOrigen: 'LA MARINA 200 #11001101',
                                CmnaOrigen: 'COQUIMBO',
                                CiudadOrigen: 'COQUIMO'
                            },
                            Receptor: {
                                RUTRecep: '66666666-6'
                            },
                            Totales: {
                                MntNeto: netTotal,
                                MntExe: '0',
                                IVA: totalPay - netTotal,
                                MntTotal: totalPay,
                                TotalPeriodo: totalPay,
                                VlrPagar: totalPay
                            }
                        },

                        Detalle: saleProductsList?.map((item, index) => {
                            const priceItem = item?.discount > 0
                                ? roundValueWithMath(((item?.total - item?.discount) / item?.quantity), 0, 0)
                                : roundValueWithMath(item?.product?.price, 0, 0)
                            const totalItem = roundValueWithMath(item?.discount > 0 ? (item?.total - item?.discount) : item?.total, 0, 0)
                            const quantityItem = roundValueWithMath((totalItem / priceItem) * 1000, 3, 0) / 1000
                            return {
                                NroLinDet: index + 1,
                                NmbItem: item?.product?.name,
                                QtyItem: quantityItem,
                                PrcItem: priceItem,
                                MontoItem: totalItem
                            }
                        })
                    }
                }
                : {

                    response: [
                        'PDF', 'TIMBRE'
                    ],
                    dte: {
                        Encabezado: {
                            IdDoc: {
                                TipoDTE: 33,
                                Folio: 0,
                                FchEmis: '2023-12-08',
                                IndServicio: '3'
                            },
                            Emisor: {
                                RUTEmisor: '77426986-K',
                                RznSocEmisor: 'MARINA MARKET',
                                GiroEmisor: 'MINIMARKET',
                                DirOrigen: 'LA MARINA 200 #11001101',
                                CmnaOrigen: 'COQUIMBO',
                                CiudadOrigen: 'COQUIMO'
                            },
                            Receptor: {
                                RUTRecep: targetCustomer?.rut,
                                CdgIntRecep: targetCustomer?.code,
                                RznSocRecep: targetCustomer?.business_name,
                                DirRecep: targetCustomer?.address,
                                CmnaRecep: targetCustomer?.commune,
                                CiudadRecep: targetCustomer?.commune
                            },
                            Totales: {
                                MntNeto: netTotal,
                                MntExe: '0',
                                IVA: totalPay - netTotal,
                                MntTotal: totalPay,
                                TotalPeriodo: totalPay,
                                VlrPagar: totalPay
                            }
                        },

                        Detalle: saleProductsList?.map((item, index) => {
                            const priceItem = item?.discount > 0
                                ? roundValueWithMath(((item?.total - item?.discount) / item?.quantity), 0, 0)
                                : roundValueWithMath(item?.product?.price, 0, 0)
                            const totalItem = roundValueWithMath(item?.discount > 0 ? (item?.total - item?.discount) : item?.total, 0, 0)
                            const quantityItem = roundValueWithMath((totalItem / priceItem) * 1000, 3, 0) / 1000
                            return {
                                NroLinDet: index + 1,
                                NmbItem: item?.product?.name,
                                QtyItem: quantityItem,
                                PrcItem: priceItem,
                                MontoItem: totalItem
                            }
                        })
                    }
                }
            /* Model to send endpoint our bd */
            const body = {
                sales_receipt: saleProductsList?.map((item) => {
                    return {
                        product_id: item?.product?.id,
                        quantity: item?.quantity,
                        total_price: item?.total,
                        total_discount: item?.discount
                    }
                }),
                payment_type_id: paymentTarget,
                voucher_type_id: voucherTarget
            }
            set({ loadingSale: true, error: null })
            if (pageTarget === 1 && (voucherTarget === 1 || voucherTarget === 2)) {
                try {
                    fetchPost(GET_DOCUMENT_HAULMER, modelBody, true).then(resultDtemite => {
                        try {
                            fetchPost(SALE_TICKET_CREATE, body).then(result => {
                                setPageTarget(false)
                                // setPaymentTarget(sales, saleId, null)
                                set({ loadingSale: false })
                                if (result?.code === 200) {
                                    const stamp = resultDtemite.data.TIMBRE
                                    generatePdfDocument({ listSales: saleProductsList, totalPay, stamp })
                                    // window.open(resultDtemite?.LinkPDF, 'Boleta.pdf')
                                    notify('✅ Pago con éxito')
                                    setPayment(false)
                                    onClose()
                                    setGoPay(false)
                                    removeSale(sales, saleId)
                                    setPageTarget(false)
                                    setPayment(false)
                                    onClose()
                                    setGoPay(false)
                                    set({ loadingSale: false })
                                    setTargetCustomer(null)
                                    // clearList()
                                } else {
                                    if (pageTarget) {
                                        notify('❌ Problemas con el pago con la tarjeta')
                                    } else {
                                        notify('❌ Problemas con el pago, intente efectuar el pago nuevamente')
                                    }
                                    set({ loadingSale: false })
                                    onClose()
                                }
                            })
                        } catch {
                            set({ loadingSale: false })
                        }
                    })
                } catch {
                    set({ loadingSale: false })
                    onClose()
                }
            } else if (pageTarget === 2 || voucherTarget === 3) {
                /* Its is when pageTarget is Debit or Credit */
                try {
                    const device = getDeviceTuu()
                    const bodyPosMachine = {
                        device,
                        amount: totalPay,
                        dteType: 48,
                        extraData: {
                            taxIdnValidation: '77426986-K',
                            sourceName: 'Marina APP',
                            sourceVersion: '2023.01.20-6',
                            method: 0,
                            customFields: [
                                {
                                    name: 'idXX',
                                    value: '245023-2342-2',
                                    print: true
                                }
                            ]
                        }
                    }
                    fetchPost(CREATE_PAYMENT_POSMACHINE, bodyPosMachine).then(result => {
                        setPageTarget(null)
                        // setPaymentTarget(sales, saleId, null)
                        // set({ loadingSale: false })
                        if (result?.code === 200 && result?.data?.paymentRequestId !== 0) {
                            const idSale = result?.data?.paymentRequestId
                            getStateSaleMachine(GET_STATE_SALE_POSMACHINE.replace(':id', idSale)).then(data => {
                                console.log('Estado confirmado:', data)
                                fetchPost(SALE_TICKET_CREATE, body).then(result => {
                                    setPageTarget(null)
                                    set({ loadingSale: false })
                                    if (result?.code === 200) {
                                        generatePdfDocument({ listSales: saleProductsList, totalPay })
                                        if (pageTarget) {
                                            notify('✅ Pago con tarjeta con éxito')
                                        } else {
                                            notify('✅ Pago con éxito')
                                        }
                                        setPayment(false)
                                        onClose()
                                        setGoPay(false)
                                        removeSale(sales, saleId)
                                    } else {
                                        notify('❌ Problemas al guardar la venta, pero si se efectuo el cobro')
                                        onClose()
                                        setGoPay(false)
                                    }
                                })
                            })
                                .catch(error => {
                                    if (pageTarget) {
                                        notify('❌ Problemas con el pago con la tarjeta')
                                        console.error('Error al consultar el endpoint:', error)
                                    } else {
                                        notify('❌ Problemas con el pago, intente efectuar el pago nuevamente')
                                    }
                                    set({ loadingSale: false })
                                })
                        // clearList()
                        } else {
                            if (pageTarget) {
                                notify('❌ Problemas con el pago con la tarjeta')
                            } else {
                                notify('❌ Problemas con el pago, intente efectuar el pago nuevamente')
                            }
                            set({ loadingSale: false })
                            // onClose()
                            // setGoPay(false)
                        }
                    })
                } catch {
                    set({ loadingSale: false })
                }
            }
        }
    }),
    {
        name: 'sales'
    }

)

export default useSalesStore
