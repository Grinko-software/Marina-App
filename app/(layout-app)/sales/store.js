/* eslint-disable n/handle-callback-err */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { create } from 'zustand'
import { GET_DOCUMENT_HAULMER, SALE_TICKET_CREATE, CREATE_PAYMENT_POSMACHINE, GET_STATE_SALE_POSMACHINE } from '@/settings/constants'
import { fetchPost } from '@/services/sales'
import { getData, GET, POST } from '@/services/http'
import { generatePdfDocument } from './components/voucher/services'
import { today } from '@/utils/date'
import { roundPrice, roundValueWithMath } from '@/utils/number'
import { getStateSaleMachine, createSaleOnHaulmer, saveTicketOnDatabase, generateDTEBody, getTotalDiscountOffers } from './services'
import { getDeviceTuu } from '@/services/settings'
import { setStateMachine } from '@/services/machine'
import { errorsMachine } from '@/utils/machine'
import { getCashRegister } from '@/services/cashRegister'
import { VOUCHER_TYPE, saveDataToPrinterSaleTicket } from '@/services/printer'
import { getIdUser } from '@/services/account'
import useSettingsStore from '@/stores/settings'
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
            voucherTarget: 1,
            discount: null,
            totalTaxFree: 0
        }],
        setLoadingSale: (value) => set({ loadingSale: value }),
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
        setTotalPrice: (sales, saleId, totalValue, taxFreeValue) => {
            const saleIndex = sales?.findIndex((sale) => sale.id === saleId)
            sales[saleIndex].totalPrice = totalValue
            sales[saleIndex].totalTaxFree = taxFreeValue
            set({ listSalesActives: sales })
        },
        addFromNewSales: (sales, saleId, product, units, offers, onCompleteFunction) => {
            units = units || 1
            units = roundValueWithMath((units) * 1000, 3, 0) / 1000
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
                    const total = roundPrice(currentTotal) || currentTotal
                    let quantitySale = total / product?.price
                    quantitySale = roundValueWithMath(quantitySale * 100000, 5, 0) / 100000
                    listSales = [...listSales, { product, quantity: parseFloat(quantitySale), discount: 0, total }]
                } else {
                    const newList = listSales?.filter((item) => item?.product?.id !== product?.id)
                    const currentTotal = roundValueWithMath(product?.price * (searhProduct?.quantity + units), 0, 0)
                    const total = roundPrice(currentTotal) || currentTotal
                    let quantitySale = total / product?.price
                    quantitySale = roundValueWithMath(quantitySale * 100000, 5, 0) / 100000
                    listSales = [...newList, { product, quantity: parseFloat(quantitySale), discount: 0, total }]
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
                sales[saleIndex].discount = null
                sales[saleIndex].voucherTarget = 1
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
        createSale: (sales, saleId, notify, onSuccessSale, setPayment, onClose, setGoPay, setPageTarget, pageTarget, removeSale, targetGeneral, targetCustomer, setTargetCustomer, methodPage, setMethodPage) => {
            const saleIndex = sales?.findIndex((sale) => sale.id === saleId)
            const sale = sales[saleIndex]
            const saleProductsList = sale?.saleProductsList
            const paymentTarget = sale?.paymentTarget || pageTarget
            const voucherTarget = sale?.voucherTarget || targetGeneral
            /*  DTEMITE */
            const discount = sale?.discount ? sale?.discount >= 0 && sale?.discount <= 100 ? sale?.discount / 100 : null : null
            const totalPay = discount ? (sale?.totalPrice - (sale?.totalPrice * discount)) : sale?.totalPrice// add general discount
            const totalTaxFreePay = sale?.totalTaxFree || 0
            const totalWithOutTaxFree = totalPay - totalTaxFreePay
            const date = today().format('YYYY-MM-DD')
            const netTotal = roundValueWithMath((totalWithOutTaxFree) / 1.19, 0, 0)
            const iva = totalWithOutTaxFree - netTotal
            /* 1: Boleta model  2: factura model */
            const modelBody = voucherTarget === 1
                ? {
                    response: [
                        'FOLIO', 'TIMBRE'
                    ],
                    dte: {
                        Encabezado: {
                            IdDoc: {
                                TipoDTE: 39,
                                Folio: 0,
                                FchEmis: date,
                                IndServicio: '3'
                            },
                            Emisor: {
                                RUTEmisor: '77426986-K'
                            },
                            Receptor: {
                                RUTRecep: '66666666-6'
                            },
                            Totales: {
                                MntNeto: netTotal,
                                MntExe: totalTaxFreePay,
                                IVA: iva,
                                MntTotal: totalPay,
                                TotalPeriodo: totalPay,
                                VlrPagar: totalPay
                            }
                        },

                        Detalle: saleProductsList?.map((item, index) => {
                            let indexTaxFree = 0
                            const priceItem = item?.discount > 0
                                ? roundValueWithMath(((item?.total - item?.discount) / item?.quantity), 0, 0)
                                : roundValueWithMath(item?.product?.price, 0, 0)
                            const totalItem = roundValueWithMath(item?.discount > 0 ? (item?.total - item?.discount) : item?.total, 0, 0)
                            const quantityItem = roundValueWithMath((totalItem / priceItem) * 1000, 3, 0) / 1000
                            if (item?.product?.taxFree) {
                                indexTaxFree++
                                return {
                                    NroLinDet: index + 1,
                                    IndExe: indexTaxFree,
                                    NmbItem: item?.product?.name,
                                    QtyItem: quantityItem,
                                    PrcItem: discount ? (priceItem - (priceItem * discount)) : priceItem,
                                    MontoItem: discount ? (totalItem - (totalItem * discount)) : totalItem
                                }
                            } else {
                                return {
                                    NroLinDet: index + 1,
                                    NmbItem: item?.product?.name,
                                    QtyItem: quantityItem,
                                    PrcItem: discount ? (priceItem - (priceItem * discount)) : priceItem,
                                    MontoItem: discount ? (totalItem - (totalItem * discount)) : totalItem
                                }
                            }
                        })
                    }
                }
                : {

                    response: [
                        'FOLIO', 'TIMBRE'
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
                                RznSoc: 'MARINA MARKET',
                                GiroEmis: 'MINIMARKET',
                                DirOrigen: 'LA MARINA 200 #11001101',
                                CmnaOrigen: 'COQUIMBO',
                                CiudadOrigen: 'COQUIMBO',
                                Telefono: '0 0',
                                CorreoEmisor: '0000',
                                Acteco: '951100'
                            },
                            Receptor: {
                                GiroRecep: targetCustomer?.business_line,
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
                                TasaIVA: '19',
                                MntTotal: totalPay,
                                VlrPagar: totalPay
                            }
                        },

                        Detalle: saleProductsList?.map((item, index) => {
                            const priceItem = item?.discount > 0
                                ? roundValueWithMath(((item?.total - item?.discount) / item?.quantity), 0, 0)
                                : roundValueWithMath(item?.product?.price, 0, 0)
                            const totalItem = roundValueWithMath(item?.discount > 0 ? (item?.total - item?.discount) : item?.total, 0, 0)
                            const quantityItem = roundValueWithMath((totalItem / priceItem) * 1000, 3, 0) / 1000
                            const netPrctIem = roundValueWithMath(priceItem / 1.19, 0, 0)
                            const netMontoItem = roundValueWithMath(totalItem / 1.19, 0, 0)
                            return {
                                NroLinDet: index + 1,
                                NmbItem: item?.product?.name,
                                QtyItem: quantityItem,
                                PrcItem: netPrctIem,
                                MontoItem: netMontoItem
                            }
                        })
                    }
                }
            /* Model to send endpoint our bd */
            const cashRegister = getCashRegister()
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
                voucher_type_id: voucherTarget,
                cash_register_id: cashRegister?.ID
            }
            set({ loadingSale: true, error: null })
            if (pageTarget === 1 && (voucherTarget === 1 || voucherTarget === 2)) {
                try {
                    createSaleOnHaulmer(GET_DOCUMENT_HAULMER, POST, modelBody).then(data => {
                        if (data?.data?.TIMBRE) {
                            try {
                                getData(SALE_TICKET_CREATE, POST, body).then(result => {
                                    setPageTarget(false)
                                    // setPaymentTarget(sales, saleId, null)
                                    set({ loadingSale: false })
                                    if (result?.code === 200) {
                                        console.log(result)
                                        const stamp = data?.data?.TIMBRE
                                        generatePdfDocument({ listSales: saleProductsList, totalPay, stamp, netTotal, iva, totalTaxFree: totalTaxFreePay, discountPctg: discount, targetCustomer })
                                        // window.open(resultDtemite?.LinkPDF, 'Boleta.pdf')
                                        notify('✅ Pago con éxito')
                                        if (onSuccessSale) {
                                            onSuccessSale()
                                        }
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
                            set({ loadingSale: false })
                            onClose()
                        }
                    })
                        .catch(error => {
                            console.log(error)
                            set({ loadingSale: false })
                            onClose()
                        })
                } catch {
                    set({ loadingSale: false })
                    onClose()
                }
            } else if (pageTarget === 2 && voucherTarget !== 3) {
                /* Its is when pageTarget is Debit or Credit */
                // setMethodPage(null)
                try {
                    const device = getDeviceTuu()
                    if (device) {
                        const bodyPosMachine = voucherTarget === 1
                            ? {
                                device,
                                amount: totalPay,
                                dteType: 48,
                                method: methodPage ?? 0,
                                printVoucherOnApp: false,
                                extraData: {
                                    taxIdnValidation: '77426986-K',
                                    sourceName: 'Marina APP'

                                }
                            }
                            : {
                                device,
                                amount: totalPay,
                                dteType: 33,
                                method: methodPage ?? 0,
                                printVoucherOnApp: false,
                                extraData: {
                                    // exemptAmount: totalPay,
                                    taxIdnValidation: '77426986-K',
                                    sourceName: 'Marina APP'
                                }
                            }
                        setStateMachine('Enviando')
                        getData(CREATE_PAYMENT_POSMACHINE, POST, bodyPosMachine).then(result => {
                            setPageTarget(null)
                            // setPaymentTarget(sales, saleId, null)
                            // set({ loadingSale: false })

                            if (result?.code === 200 && result?.data?.paymentRequestId) {
                                setStateMachine('Pendiente')
                                const idSale = result?.data?.paymentRequestId
                                getStateSaleMachine(GET_STATE_SALE_POSMACHINE.replace(':id', idSale)).then(data => {
                                    // console.log('Estado confirmado:', data)

                                    getData(SALE_TICKET_CREATE, POST, body).then(result => {
                                        setPageTarget(null)
                                        set({ loadingSale: false })
                                        if (result?.code === 200) {
                                            generatePdfDocument({ listSales: saleProductsList, totalPay, netTotal, iva, totalTaxFree: totalTaxFreePay, discountPctg: discount, dataCard: data, targetCustomer })
                                            if (pageTarget) {
                                                // setStateMachine('Confirmado')
                                                notify('✅ Pago con tarjeta con éxito')
                                            } else {
                                                notify('✅ Pago con éxito')
                                            }
                                            setStateMachine(null)
                                            setPayment(false)
                                            onClose()
                                            setGoPay(false)
                                            removeSale(sales, saleId)
                                        } else {
                                            console.log(result)
                                            notify('❌ Problemas al guardar la venta, pero si se efectuo el cobro')
                                            onClose()
                                            setGoPay(false)
                                            setStateMachine(null)
                                        }
                                    })
                                })
                                    .catch(error => {
                                        if (pageTarget) {
                                            notify('❌ Problemas con el pago con la tarjeta')
                                        } else {
                                            notify('❌ Problemas con el pago, intente efectuar el pago nuevamente')
                                        }
                                        set({ loadingSale: false })
                                        setStateMachine(null)
                                    })
                            // clearList()
                            } else {
                                notify('❌ ' + errorsMachine.get(result?.data?.code))
                                /*  if (pageTarget) {
                                    notify('❌ ' + errorsMachine.get(result?.data?.code))
                                } else {
                                    notify('❌ Problemas con el pago, intente efectuar el pago nuevamente')
                                } */
                                set({ loadingSale: false })
                                setStateMachine(null)
                            }
                        })
                    } else {
                        getData(SALE_TICKET_CREATE, POST, body).then(result => {
                            setPageTarget(null)
                            set({ loadingSale: false })
                            if (result?.code === 200) {
                                generatePdfDocument({ listSales: saleProductsList, totalPay, netTotal, iva, totalTaxFree: totalTaxFreePay, discountPctg: discount, targetCustomer })
                                if (pageTarget) {
                                    // setStateMachine('Confirmado')
                                    notify('✅ Pago con tarjeta con éxito')
                                } else {
                                    notify('✅ Pago con éxito')
                                }
                                setStateMachine(null)
                                setPayment(false)
                                onClose()
                                setGoPay(false)
                                removeSale(sales, saleId)
                            } else {
                                console.log(result)
                                notify('❌ Problemas al guardar la venta, pero si se efectuo el cobro')
                                onClose()
                                setGoPay(false)
                                setStateMachine(null)
                            }
                        })
                        set({ loadingSale: false })
                        setStateMachine(null)
                    }
                } catch {
                    set({ loadingSale: false })
                    setStateMachine(null)
                }
            } else {
                getData(SALE_TICKET_CREATE, POST, body).then(result => {
                    setPageTarget(null)
                    set({ loadingSale: false })
                    if (result?.code === 200) {
                        generatePdfDocument({ listSales: saleProductsList, totalPay, netTotal, iva, totalTaxFree: totalTaxFreePay, discountPctg: discount })
                        if (pageTarget) {
                            // setStateMachine('Confirmado')
                            notify('✅ Pago con tarjeta con éxito')
                        } else {
                            // efectivo
                            if (onSuccessSale) {
                                onSuccessSale()
                            }
                            notify('✅ Pago con éxito')
                        }
                        setStateMachine(null)
                        setPayment(false)
                        onClose()
                        setGoPay(false)
                        removeSale(sales, saleId)
                    } else {
                        console.log(result)
                        notify('❌ Problemas al guardar la venta, pero si se efectuo el cobro')
                        onClose()
                        setGoPay(false)
                        setStateMachine(null)
                    }
                })
                set({ loadingSale: false })
                setStateMachine(null)
            }
        },
        createSaleVoucher: async ({ sales, saleId, notify, onSuccessSale, removeSale, isCardPayment }) => {
            set({ loadingSale: true, error: null })
            const saleIndex = sales?.findIndex((sale) => sale.id === saleId)
            const sale = sales[saleIndex]
            const saleType = VOUCHER_TYPE.VOUCHER

            const saleProductsList = sale?.saleProductsList
            const paymentTarget = sale?.paymentTarget
            const date = today().format('YYYY-MM-DD')

            const discountTotalPctg = sale?.discount ? sale?.discount >= 0 && sale?.discount <= 100 ? sale?.discount / 100 : null : null
            const totalDiscountExtra = sale?.totalPrice * discountTotalPctg
            const totalPay = discountTotalPctg ? (sale?.totalPrice - (totalDiscountExtra)) : sale?.totalPrice// add general discount

            const totalTaxFreePay = sale?.totalTaxFree || 0
            const totalWithOutTaxFree = totalPay - totalTaxFreePay
            const netTotal = roundValueWithMath((totalWithOutTaxFree) / 1.19, 0, 0)
            const iva = totalWithOutTaxFree - netTotal

            const totalDiscountOffers = getTotalDiscountOffers({ products: saleProductsList })

            /* Model to send endpoint our bd */
            const cashRegister = getCashRegister()
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
                voucher_type_id: 1,
                cash_register_id: cashRegister?.ID,
                user_id: getIdUser()
            }

            const device = getDeviceTuu()
            if (isCardPayment && device) {
                try {
                    const bodyPosMachine = {
                        device,
                        amount: totalPay,
                        dteType: 48,
                        printVoucherOnApp: false,
                        extraData: {
                            taxIdnValidation: '77426986-K',
                            sourceName: 'Marina APP'

                        }
                    }
                    setStateMachine('Enviando')
                    await getData(CREATE_PAYMENT_POSMACHINE, POST, bodyPosMachine).then(result => {
                        if (result?.code === 200 && result?.data?.paymentRequestId) {
                            setStateMachine('Pendiente')
                            const idSale = result?.data?.paymentRequestId
                            getStateSaleMachine(GET_STATE_SALE_POSMACHINE.replace(':id', idSale)).then(data => {
                                getData(SALE_TICKET_CREATE, POST, body).then(result => {
                                    set({ loadingSale: false })
                                    if (result?.code === 200) {
                                        const printEnabled = useSettingsStore.getState()?.printEnabled || true
                                        if (printEnabled) saveDataToPrinterSaleTicket({ saleType, products: saleProductsList, total: totalPay, totalNet: netTotal, iva, totalTaxFree: totalTaxFreePay, discountExtra: totalDiscountExtra, discountOffers: totalDiscountOffers, cardDetail: data, openCashRegister: false })
                                        // generatePdfDocument({ listSales: saleProductsList, totalPay, netTotal, iva, totalTaxFree: totalTaxFreePay, discountPctg: discount, dataCard: data })
                                        notify('✅ Pago con tarjeta con éxito')
                                        setStateMachine(null)
                                        removeSale(sales, saleId)
                                    } else {
                                        console.log(result)
                                        notify('❌ Problemas al guardar la venta, pero si se efectuo el cobro')
                                        setStateMachine(null)
                                    }
                                })
                            }).catch(error => {
                                notify('❌ Problemas con el pago con la tarjeta')
                                set({ loadingSale: false })
                                setStateMachine(null)
                            })
                        } else {
                            notify('❌ ' + errorsMachine.get(result?.data?.code))
                            set({ loadingSale: false })
                            setStateMachine(null)
                        }
                    })
                } catch {
                    set({ loadingSale: false })
                    setStateMachine(null)
                }
            } else if (isCardPayment) {
                await saveTicketOnDatabase({
                    saleType,
                    listSales: saleProductsList,
                    totalPay,
                    netTotal,
                    iva,
                    totalTaxFree: totalTaxFreePay,
                    discountExtra: totalDiscountExtra,
                    discountOffers: totalDiscountOffers,
                    body,
                    notify,
                    onSuccessSale: () => {
                        if (onSuccessSale) {
                            onSuccessSale()
                        }
                        removeSale(sales, saleId)
                        set({ loadingSale: false })
                    }
                })
            } else {
                try {
                    const dteBody = generateDTEBody({ discount: discountTotalPctg, isInvoice: false, iva, netTotal, saleProductsList, totalPay, totalTaxFreePay })
                    await createSaleOnHaulmer(GET_DOCUMENT_HAULMER, POST, dteBody).then(data => {
                        if (data?.data?.TIMBRE) {
                            try {
                                getData(SALE_TICKET_CREATE, POST, body).then(result => {
                                    set({ loadingSale: false })
                                    if (result?.code === 200) {
                                        console.log(result)
                                        const stamp = data?.data?.TIMBRE
                                        const folio = data?.data?.FOLIO
                                        const printEnabled = useSettingsStore.getState()?.printEnabled || true
                                        if (printEnabled) saveDataToPrinterSaleTicket({ saleType, products: saleProductsList, total: totalPay, stamp, folioNumber: folio, totalNet: netTotal, iva, totalTaxFree: totalTaxFreePay, discountExtra: totalDiscountExtra, discountOffers: totalDiscountOffers, openCashRegister: true })
                                        // generatePdfDocument({ listSales: saleProductsList, totalPay, stamp, netTotal, iva, totalTaxFree: totalTaxFreePay, discountPctg: discount })
                                        notify('✅ Pago con éxito')
                                        if (onSuccessSale) {
                                            onSuccessSale()
                                        }
                                        removeSale(sales, saleId)
                                        set({ loadingSale: false })
                                    } else {
                                        notify('❌ Problemas con el pago, intente efectuar el pago nuevamente')
                                        set({ loadingSale: false })
                                    }
                                })
                            } catch {
                                set({ loadingSale: false })
                            }
                        } else {
                            set({ loadingSale: false })
                        }
                    })
                        .catch(error => {
                            notify('❌ ' + error?.message)
                            // console.log(error)
                            set({ loadingSale: false })
                        })
                } catch {
                    set({ loadingSale: false })
                }
            }

            set({ loadingSale: false })
            setStateMachine(null)
        },
        createSaleInvoice: async ({ sales, saleId, notify, onSuccessSale, removeSale, isCardPayment, targetCustomer }) => {
            set({ loadingSale: true, error: null })
            const saleIndex = sales?.findIndex((sale) => sale.id === saleId)
            const sale = sales[saleIndex]
            const saleType = VOUCHER_TYPE.INVOICE

            const saleProductsList = sale?.saleProductsList
            const paymentTarget = sale?.paymentTarget
            const date = today().format('YYYY-MM-DD')

            const discountTotalPctg = sale?.discount ? sale?.discount >= 0 && sale?.discount <= 100 ? sale?.discount / 100 : null : null
            const totalDiscountExtra = sale?.totalPrice * discountTotalPctg
            const totalPay = discountTotalPctg ? (sale?.totalPrice - (totalDiscountExtra)) : sale?.totalPrice// add general discount

            const totalTaxFreePay = sale?.totalTaxFree || 0
            const totalWithOutTaxFree = totalPay - totalTaxFreePay
            const netTotal = roundValueWithMath((totalWithOutTaxFree) / 1.19, 0, 0)
            const iva = totalWithOutTaxFree - netTotal

            const totalDiscountOffers = getTotalDiscountOffers({ products: saleProductsList })

            /* Model to send endpoint our bd */
            const cashRegister = getCashRegister()
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
                voucher_type_id: 2,
                cash_register_id: cashRegister?.ID,
                user_id: getIdUser()
            }

            const device = getDeviceTuu()
            if (isCardPayment && device) {
                try {
                    const bodyPosMachine = {
                        device,
                        amount: totalPay,
                        dteType: 33,
                        printVoucherOnApp: false,
                        extraData: {
                            taxIdnValidation: '77426986-K',
                            sourceName: 'Marina APP'

                        }
                    }
                    setStateMachine('Enviando')
                    getData(CREATE_PAYMENT_POSMACHINE, POST, bodyPosMachine).then(result => {
                        if (result?.code === 200 && result?.data?.paymentRequestId) {
                            setStateMachine('Pendiente')
                            const idSale = result?.data?.paymentRequestId
                            getStateSaleMachine(GET_STATE_SALE_POSMACHINE.replace(':id', idSale)).then(data => {
                                getData(SALE_TICKET_CREATE, POST, body).then(result => {
                                    set({ loadingSale: false })
                                    if (result?.code === 200) {
                                        const printEnabled = useSettingsStore.getState()?.printEnabled || true
                                        if (printEnabled) saveDataToPrinterSaleTicket({ saleType, products: saleProductsList, total: totalPay, totalNet: netTotal, iva, totalTaxFree: totalTaxFreePay, discountExtra: totalDiscountExtra, discountOffers: totalDiscountOffers, cardDetail: data, customerDetail: targetCustomer, openCashRegister: false })
                                        // generatePdfDocument({ listSales: saleProductsList, totalPay, netTotal, iva, totalTaxFree: totalTaxFreePay, discountPctg: discount, dataCard: data, targetCustomer })
                                        notify('✅ Pago con tarjeta con éxito')
                                        setStateMachine(null)
                                        removeSale(sales, saleId)
                                    } else {
                                        console.log(result)
                                        notify('❌ Problemas al guardar la venta, pero si se efectuo el cobro')
                                        setStateMachine(null)
                                    }
                                })
                            }).catch(error => {
                                notify('❌ Problemas con el pago con la tarjeta')
                                set({ loadingSale: false })
                                setStateMachine(null)
                            })
                        } else {
                            notify('❌ ' + errorsMachine.get(result?.data?.code))
                            set({ loadingSale: false })
                            setStateMachine(null)
                        }
                    })
                } catch {
                    set({ loadingSale: false })
                    setStateMachine(null)
                }
            } else if (isCardPayment) {
                await saveTicketOnDatabase({
                    saleType,
                    listSales: saleProductsList,
                    totalPay,
                    netTotal,
                    iva,
                    totalTaxFree: totalTaxFreePay,
                    discountExtra: totalDiscountExtra,
                    discountOffers: totalDiscountOffers,
                    body,
                    notify,
                    onSuccessSale: () => {
                        if (onSuccessSale) {
                            onSuccessSale()
                        }
                        removeSale(sales, saleId)
                        set({ loadingSale: false })
                    }
                })
            } else {
                try {
                    const dteBody = generateDTEBody({ discount: discountTotalPctg, isInvoice: true, targetCustomer, iva, netTotal, saleProductsList, totalPay, totalTaxFreePay })
                    await createSaleOnHaulmer(GET_DOCUMENT_HAULMER, POST, dteBody).then(data => {
                        if (data?.data?.TIMBRE) {
                            try {
                                getData(SALE_TICKET_CREATE, POST, body).then(result => {
                                    set({ loadingSale: false })
                                    if (result?.code === 200) {
                                        console.log(result)
                                        const stamp = data?.data?.TIMBRE
                                        const folio = data?.data?.FOLIO
                                        const printEnabled = useSettingsStore.getState()?.printEnabled || true
                                        if (printEnabled) saveDataToPrinterSaleTicket({ saleType, products: saleProductsList, total: totalPay, stamp, folioNumber: folio, totalNet: netTotal, iva, totalTaxFree: totalTaxFreePay, discountExtra: totalDiscountExtra, discountOffers: totalDiscountOffers, customerDetail: targetCustomer, openCashRegister: true })
                                        // generatePdfDocument({ listSales: saleProductsList, totalPay, stamp, netTotal, iva, totalTaxFree: totalTaxFreePay, discountPctg: discount, targetCustomer })
                                        // window.open(resultDtemite?.LinkPDF, 'Boleta.pdf')
                                        notify('✅ Pago con éxito')
                                        if (onSuccessSale) {
                                            onSuccessSale()
                                        }
                                        removeSale(sales, saleId)
                                        set({ loadingSale: false })
                                    } else {
                                        notify('❌ Problemas con el pago, intente efectuar el pago nuevamente')
                                        set({ loadingSale: false })
                                    }
                                })
                            } catch {
                                set({ loadingSale: false })
                            }
                        } else {
                            set({ loadingSale: false })
                        }
                    })
                        .catch(error => {
                            console.log(error)
                            set({ loadingSale: false })
                        })
                } catch {
                    set({ loadingSale: false })
                }
            }

            set({ loadingSale: false })
            setStateMachine(null)
        },
        createSaleTicket: async ({ sales, saleId, notify, onSuccessSale, removeSale, isCardPayment }) => {
            set({ loadingSale: true, error: null })
            const saleIndex = sales?.findIndex((sale) => sale.id === saleId)
            const sale = sales[saleIndex]
            const saleType = VOUCHER_TYPE.TICKET

            const saleProductsList = sale?.saleProductsList
            const paymentTarget = sale?.paymentTarget

            const discountTotalPctg = sale?.discount ? sale?.discount >= 0 && sale?.discount <= 100 ? sale?.discount / 100 : null : null
            const totalDiscountExtra = sale?.totalPrice * discountTotalPctg
            const totalPay = discountTotalPctg ? (sale?.totalPrice - (totalDiscountExtra)) : sale?.totalPrice// add general discount

            const totalTaxFreePay = sale?.totalTaxFree || 0
            const totalWithOutTaxFree = totalPay - totalTaxFreePay

            const netTotal = roundValueWithMath((totalWithOutTaxFree) / 1.19, 0, 0)
            const iva = totalWithOutTaxFree - netTotal

            const totalDiscountOffers = getTotalDiscountOffers({ products: saleProductsList })

            /* Model to send endpoint our bd */
            const cashRegister = getCashRegister()
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
                voucher_type_id: 3,
                cash_register_id: cashRegister?.ID,
                user_id: getIdUser()
            }

            await saveTicketOnDatabase({
                saleType,
                listSales: saleProductsList,
                totalPay,
                netTotal,
                iva,
                totalTaxFree: totalTaxFreePay,
                discountExtra: totalDiscountExtra,
                discountOffers: totalDiscountOffers,
                body,
                notify,
                openCashRegister: !isCardPayment,
                onSuccessSale: () => {
                    if (onSuccessSale) {
                        onSuccessSale()
                    }
                    removeSale(sales, saleId)
                    set({ loadingSale: false })
                }
            })

            set({ loadingSale: false })
            setStateMachine(null)
        },
        /* Add discount */
        addDiscountSale: (listSalesActives, saleIdActive, value, cleanForm) => {
            const saleIndex = listSalesActives?.findIndex((sale) => sale.id === saleIdActive)
            listSalesActives[saleIndex].discount = value ? parseInt(value) : null
            set({ listSalesActives })
            cleanForm()
        }
    }),
    {
        name: 'sales'
    }

)

export default useSalesStore
