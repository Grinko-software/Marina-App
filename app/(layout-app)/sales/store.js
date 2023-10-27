/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { create } from 'zustand'
import { GET_DOCUMENT_DTEMITE, SALE_TICKET_CREATE } from '@/settings/constants'
import { fetchPost } from '@/services/sales'
import { generatePdfDocument } from './components/voucher/services'
import { today } from '@/utils/date'
import { roundPrice, roundValue, roundValueWithMath } from '@/utils/number'
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
            console.log(newSaleList)
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
            const modelBody = voucherTarget === 1
                ? {
                    Sistema: {
                        nombre: 'rion',
                        rut: '77426986-K',
                        usuario: 'integrado_rion',
                        clave: 'cmlvbjIwMjM='
                    },
                    Documento: {
                        Encabezado: {
                            IdDoc: {
                                TipoDTE: '39',
                                Folio: 0,
                                FchEmis: date,
                                FchVenc: date
                            },
                            Emisor: {
                                RUTEmisor: '77426986-K',
                                RznSocEmisor: 'MARINA MARKET',
                                GiroEmisor: 'MINIMARKET',
                                DirOrigen: 'LA MARINA 200 #11001101',
                                CmnaOrigen: 'COQUIMBO',
                                CiudadOrigen: 'COQUIMO'
                            },
                            Receptor: { RUTRecep: '66666666-6' },
                            Totales: {
                                MntNeto: netTotal,
                                MntExe: '0',
                                IVA: totalPay - netTotal,
                                MntTotal: totalPay
                            }
                        },
                        Detalle: saleProductsList?.map((item, index) => {
                            const priceItem = item?.discount > 0
                                ? roundValueWithMath(((item?.total - item?.discount) / item?.quantity), 0, 0)
                                : roundValueWithMath(item?.product?.price, 0, 0)
                            const totalItem = roundValueWithMath(item?.discount > 0 ? (item?.total - item?.discount) : item?.total, 0, 0)
                            const quantityItem = roundValueWithMath((totalItem / priceItem) * 1000, 3, 0) / 1000
                            return {
                                NroLinDet: index,
                                CdgItem: {
                                    TpoCodigo: item?.product?.id,
                                    VlrCodigo: item?.product?.code
                                },
                                NmbItem: item?.product?.name,
                                QtyItem: quantityItem,
                                PrcItem: priceItem,
                                MontoItem: totalItem
                            }
                        })
                    }
                }
                : {
                    Sistema: {
                        nombre: 'rion',
                        rut: '77426986-K',
                        usuario: 'integrado_rion',
                        clave: 'cmlvbjIwMjM='
                    },
                    Documento: {
                        Encabezado: {
                            IdDoc: {
                                TipoDTE: '33',
                                Folio: 0,
                                FchEmis: date,
                                FchVenc: date
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
                                TasaIVA: '19',
                                IVA: totalPay - netTotal,
                                MntTotal: totalPay
                            }
                        },
                        Detalle: saleProductsList?.map((item, index) => {
                            return {
                                NroLinDet: index,
                                CdgItem: {
                                    TpoCodigo: item?.product?.id,
                                    VlrCodigo: item?.product?.code
                                },
                                NmbItem: item?.product?.name,
                                QtyItem: item?.quantity,
                                PrcItem: roundValueWithMath(item?.product?.price / 1.19, 0, 0),
                                MontoItem: roundValueWithMath(item?.total / 1.19, 0, 0)
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
                        total_price: item?.total
                    }
                }),
                payment_type_id: paymentTarget,
                voucher_type_id: voucherTarget
            }
            set({ loadingSale: true, error: null })
            if (pageTarget === 1 && (voucherTarget === 1 || voucherTarget === 2)) {
                try {
                    fetchPost(GET_DOCUMENT_DTEMITE, modelBody, true).then(resultDtemite => {
                        // Get result from DTEMITE
                        if (resultDtemite?.LinkPDF) {
                            try {
                                fetchPost(SALE_TICKET_CREATE, body).then(result => {
                                    setPageTarget(false)
                                    // setPaymentTarget(sales, saleId, null)
                                    set({ loadingSale: false })
                                    if (result?.code === 200) {
                                        // generatePdfDocument({ listSales: saleProductsList, totalPay })
                                        window.open(resultDtemite?.LinkPDF, 'Boleta.pdf')
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
                        } else {
                            notify('❌ ' + resultDtemite ? resultDtemite?.Mensaje : 'Error al generar la boleta o factura')
                            set({ loadingSale: false })
                            onClose()
                        }
                    })
                } catch {
                    set({ loadingSale: false })
                    onClose()
                }
            } else if (pageTarget === 2 || voucherTarget === 3) {
                try {
                    fetchPost(SALE_TICKET_CREATE, body).then(result => {
                        setPageTarget(null)
                        // setPaymentTarget(sales, saleId, null)
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
                        // clearList()
                        } else {
                            if (pageTarget) {
                                notify('❌ Problemas con el pago con la tarjeta')
                            } else {
                                notify('❌ Problemas con el pago, intente efectuar el pago nuevamente')
                            }
                            set({ loadingSale: false })
                            onClose()
                            setGoPay(false)
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
