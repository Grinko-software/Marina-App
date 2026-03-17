/* eslint-disable n/handle-callback-err */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { create } from 'zustand'
import {
    GET_DOCUMENT_HAULMER,
    SALE_TICKET_CREATE,
    CREATE_PAYMENT_POSMACHINE,
    GET_STATE_SALE_POSMACHINE
} from '@/settings/constants'
import { getData, POST } from '@/services/http'
import { roundPrice, roundValueWithMath } from '@/utils/number'
import {
    getStateSaleMachine,
    createSaleOnHaulmer,
    saveTicketOnDatabase,
    generateDTEBody,
    getTotalDiscountOffers,
    cancelSaleOnDatabase
} from './services'
import { getDeviceTuu } from '@/services/settings'
import { setStateMachine } from '@/services/machine'
import { errorsMachine } from '@/utils/machine'
import { getCashRegister } from '@/services/cashRegister'
import { VOUCHER_TYPE, saveDataToPrinterSaleTicket } from '@/services/printer'
import { getIdUser } from '@/services/account'
import useSettingsStore from '@/stores/settings'
import { persist } from 'zustand/middleware'

const structSaleEmpty = () => {
    return {
        id: 1,
        keyFocus: null,
        totalPrice: 0,
        saleProductsList: [],
        paymentTarget: null,
        voucherTarget: 1,
        discount: null,
        totalTaxFree: 0,
        paymentViewEnabled: false
    }
}

const useSalesStore = create(
    persist(
        (set) => ({
            loadingSale: false,
            error: null,
            units: 1,
            saleIdActive: 1,
            listSalesActives: [structSaleEmpty()],
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
            addFromNewSales: (
                sales,
                saleId,
                product,
                units,
                offers,
                onCompleteFunction
            ) => {
                units = units || 1
                units = roundValueWithMath(units * 1000, 3, 0) / 1000
                const saleIndex = sales?.findIndex((sale) => sale.id === saleId)
                let listSales = sales[saleIndex].saleProductsList

                const searhProduct = listSales?.find((item) => {
                    return item?.product?.id === product?.id
                })
                const offersProduct = offers?.find((item) => {
                    return item?.productId === product?.id
                })
                if (offersProduct) {
                    // agregar el arreglo de las ofertas en el list sales
                    if (searhProduct) {
                        const quantitySale = searhProduct?.quantity + units
                        const offersOfProduct = Math.trunc(
                            quantitySale / offersProduct.quantity
                        )
                        const newList = listSales?.filter(
                            (item) => item?.product?.id !== product?.id
                        )
                        const total =
							(product?.price * offersProduct?.quantity -
								offersProduct?.quantity * offersProduct?.unitPrice) *
							offersOfProduct
                        const currentTotal = roundValueWithMath(
                            product?.price * quantitySale,
                            0,
                            0
                        )
                        listSales = [
                            ...newList,
                            {
                                product,
                                quantity: searhProduct?.quantity + units,
                                offers: offersOfProduct,
                                discount:
									offersOfProduct > 0
									    ? roundValueWithMath(total, 0, null) || total
									    : 0,
                                total: roundPrice(currentTotal) || currentTotal
                            }
                        ]
                    } else {
                        const quantitySale = units
                        const offersOfProduct = Math.trunc(
                            quantitySale / offersProduct.quantity
                        )
                        const total =
							(product?.price * offersProduct?.quantity -
								offersProduct?.quantity * offersProduct?.unitPrice) *
							offersOfProduct
                        const currentTotal = roundValueWithMath(
                            product?.price * quantitySale,
                            0,
                            0
                        )
                        listSales = [
                            ...listSales,
                            {
                                product,
                                quantity: units,
                                offers: offersOfProduct,
                                discount:
									offersOfProduct > 0
									    ? roundValueWithMath(total, 0, null) || total
									    : 0,
                                total: roundPrice(currentTotal) || currentTotal
                            }
                        ]
                    }
                } else {
                    if (!searhProduct) {
                        const currentTotal = roundValueWithMath(
                            product?.price * parseFloat(units),
                            0,
                            0
                        )
                        const total = roundPrice(currentTotal) || currentTotal
                        let quantitySale = total / product?.price
                        quantitySale =
							roundValueWithMath(quantitySale * 100000, 5, 0) / 100000
                        listSales = [
                            ...listSales,
                            {
                                product,
                                quantity: parseFloat(quantitySale),
                                discount: 0,
                                total
                            }
                        ]
                    } else {
                        const newList = listSales?.filter(
                            (item) => item?.product?.id !== product?.id
                        )
                        const currentTotal = roundValueWithMath(
                            product?.price * (searhProduct?.quantity + units),
                            0,
                            0
                        )
                        const total = roundPrice(currentTotal) || currentTotal
                        let quantitySale = total / product?.price
                        quantitySale =
							roundValueWithMath(quantitySale * 100000, 5, 0) / 100000
                        listSales = [
                            ...newList,
                            {
                                product,
                                quantity: parseFloat(quantitySale),
                                discount: 0,
                                total
                            }
                        ]
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

                const newList = listSales?.filter(
                    (item) => item?.product?.id !== productId
                )

                sales[saleIndex].saleProductsList = newList
                /* No puede remover productos en la vista de los pagos */
                set({ listSalesActives: sales })
            },
            /*
            Borra la venta y si solo hay una venta, crea una venta vacía

            */
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
                    sales[saleIndex] = structSaleEmpty()
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
            createSaleVoucher: async ({
                sales,
                saleId,
                notify,
                onSuccessSale,
                removeSale,
                isCardPayment
            }) => {
                set({ loadingSale: true, error: null })
                const saleIndex = sales?.findIndex((sale) => sale.id === saleId)
                const sale = sales[saleIndex]
                const saleType = VOUCHER_TYPE.VOUCHER

                const saleProductsList = sale?.saleProductsList
                const paymentTarget = sale?.paymentTarget

                const discountTotalPctg = sale?.discountPctg
                    ? sale?.discountPctg >= 0 && sale?.discountPctg <= 100
                        ? sale?.discountPctg / 100
                        : null
                    : null
                const totalDiscountExtra = sale?.discount
                const totalPay = discountTotalPctg
                    ? sale?.totalPrice - totalDiscountExtra
                    : sale?.totalPrice // add general discount

                const totalTaxFreePay = sale?.totalTaxFree || 0
                const totalWithOutTaxFree = totalPay - totalTaxFreePay
                const netTotal = roundValueWithMath(totalWithOutTaxFree / 1.19, 0, 0)
                const iva = totalWithOutTaxFree - netTotal

                const totalDiscountOffers = getTotalDiscountOffers({
                    products: saleProductsList
                })

                /* Model to send endpoint our bd */
                const cashRegister = getCashRegister()
                let totalTaxFree = 0
                const body = {
                    sales_receipt: saleProductsList?.map((item) => {
                        if (item?.product?.taxFree) {
                            totalTaxFree += item?.product?.price
                        }
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
                    user_id: getIdUser(),
                    is_done: true,
                    total: totalPay
                }
                const device = getDeviceTuu()
                if (isCardPayment && device) {
                    try {
                        const bodyPosMachine =
							totalTaxFree > 0
							    ? {
							        device,
							        amount: totalPay,
							        dteType: totalTaxFree < totalPay ? 48 : 99,
							        printVoucherOnApp: false,
							        extraData: {
							            exemptAmount: totalTaxFree,
							            taxIdnValidation: '77426986-K',
							            sourceName: 'Marina APP'
							        }
								  }
							    : {
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
                        await getData(CREATE_PAYMENT_POSMACHINE, POST, bodyPosMachine).then(
                            (result) => {
                                if (result?.code === 200 && result?.data?.paymentRequestId) {
                                    setStateMachine('Pendiente')
                                    const idSale = result?.data?.paymentRequestId
                                    getStateSaleMachine(
                                        GET_STATE_SALE_POSMACHINE.replace(':id', idSale)
                                    )
                                        .then((data) => {
                                            getData(SALE_TICKET_CREATE, POST, body).then((result) => {
                                                setStateMachine(null)
                                                set({ loadingSale: false })
                                                if (result?.code === 200) {
                                                    const printEnabled =
														useSettingsStore.getState()?.printEnabled || true
                                                    if (printEnabled) {
                                                        saveDataToPrinterSaleTicket({
                                                            saleType,
                                                            products: saleProductsList,
                                                            total: totalPay,
                                                            totalNet: netTotal,
                                                            iva,
                                                            totalTaxFree: totalTaxFreePay,
                                                            discountExtra: totalDiscountExtra,
                                                            discountOffers: totalDiscountOffers,
                                                            cardDetail: data,
                                                            openCashRegister: false
                                                        })
                                                    }
                                                    // generatePdfDocument({ listSales: saleProductsList, totalPay, netTotal, iva, totalTaxFree: totalTaxFreePay, discountPctg: discount, dataCard: data })
                                                    notify('✅ Pago con tarjeta con éxito')
                                                    removeSale(sales, saleId)
                                                } else {
                                                    notify(
                                                        '❌ Problemas al guardar la venta, pero si se efectuo el cobro'
                                                    )
                                                }
                                            })
                                        })
                                        .catch((error) => {
                                            notify('❌ Problemas con el pago con la tarjeta')
                                            set({ loadingSale: false })
                                            setStateMachine(null)
                                        })
                                } else {
                                    notify('❌ ' + errorsMachine.get(result?.data?.code))
                                    set({ loadingSale: false })
                                    setStateMachine(null)
                                }
                            }
                        )
                    } catch {
                        set({ loadingSale: false })
                        /// /setStateMachine(null)
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
                        const dteBody = generateDTEBody({
                            discount: discountTotalPctg,
                            isInvoice: false,
                            iva,
                            netTotal,
                            saleProductsList,
                            totalPay,
                            totalTaxFreePay
                        })
                        await createSaleOnHaulmer(GET_DOCUMENT_HAULMER, POST, dteBody)
                            .then((data) => {
                                if (data?.data?.TIMBRE) {
                                    try {
                                        const newBody = {
                                            ...body,
                                            invoice_number: data?.data?.FOLIO,
                                            stamp: data?.data?.TIMBRE
                                        }
                                        getData(SALE_TICKET_CREATE, POST, newBody).then(
                                            (result) => {
                                                set({ loadingSale: false })
                                                if (result?.code === 200) {
                                                    console.log(result)
                                                    const stamp = data?.data?.TIMBRE
                                                    const folio = data?.data?.FOLIO
                                                    const printEnabled =
														useSettingsStore.getState()?.printEnabled || true
                                                    if (printEnabled) {
                                                        saveDataToPrinterSaleTicket({
                                                            saleType,
                                                            products: saleProductsList,
                                                            total: totalPay,
                                                            stamp,
                                                            folioNumber: folio,
                                                            totalNet: netTotal,
                                                            iva,
                                                            totalTaxFree: totalTaxFreePay,
                                                            discountExtra: totalDiscountExtra,
                                                            discountOffers: totalDiscountOffers,
                                                            openCashRegister: true
                                                        })
                                                    }
                                                    // generatePdfDocument({ listSales: saleProductsList, totalPay, stamp, netTotal, iva, totalTaxFree: totalTaxFreePay, discountPctg: discount })
                                                    notify('✅ Pago con éxito')
                                                    if (onSuccessSale) {
                                                        onSuccessSale()
                                                    }
                                                    removeSale(sales, saleId)
                                                    set({ loadingSale: false })
                                                } else {
                                                    notify(
                                                        '❌ Problemas con el pago, intente efectuar el pago nuevamente'
                                                    )
                                                    set({ loadingSale: false })
                                                }
                                            }
                                        )
                                    } catch {
                                        set({ loadingSale: false })
                                    }
                                } else {
                                    set({ loadingSale: false })
                                }
                            })
                            .catch((error) => {
                                notify('❌ ' + error?.message)
                                // console.log(error)
                                set({ loadingSale: false })
                            })
                    } catch {
                        set({ loadingSale: false })
                    }
                }

                set({ loadingSale: false })
                /// /setStateMachine(null)
            },
            createSaleInvoice: async ({
                sales,
                saleId,
                notify,
                onSuccessSale,
                removeSale,
                isCardPayment,
                targetCustomer
            }) => {
                set({ loadingSale: true, error: null })
                const saleIndex = sales?.findIndex((sale) => sale.id === saleId)
                const sale = sales[saleIndex]
                const saleType = VOUCHER_TYPE.INVOICE

                const saleProductsList = sale?.saleProductsList
                const paymentTarget = sale?.paymentTarget

                const discountTotalPctg = sale?.discountPctg
                    ? sale?.discountPctg >= 0 && sale?.discountPctg <= 100
                        ? sale?.discountPctg / 100
                        : null
                    : null
                const totalDiscountExtra = sale?.discount
                const totalPay = discountTotalPctg
                    ? sale?.totalPrice - totalDiscountExtra
                    : sale?.totalPrice // add general discount

                const totalTaxFreePay = sale?.totalTaxFree || 0
                const totalWithOutTaxFree = totalPay - totalTaxFreePay

                const netTotal = roundValueWithMath(totalWithOutTaxFree / 1.19, 0, 0)
                const iva = totalWithOutTaxFree - netTotal

                const totalDiscountOffers = getTotalDiscountOffers({
                    products: saleProductsList
                })

                /* Model to send endpoint our bd */
                const cashRegister = getCashRegister()
                const body = {
                    is_done: true,
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
                    user_id: getIdUser(),
                    total: totalPay
                }

                const device = getDeviceTuu()
                if (isCardPayment && device) {
                    try {
                        const bodyPosMachine = {
                            device,
                            amount: totalPay,
                            dteType: 99, // 33: factura afecta y 34:factura excenta, lo vamos a dejar con 34 y luego tiramoshacia haulmer la factura nomas, vale HAULMER CTM
                            printVoucherOnApp: false,
                            extraData: {
                                exemptAmount: totalPay,
                                taxIdnValidation: '77426986-K',
                                sourceName: 'Marina APP',
                                // Datos del cliente para la factura
                                customerName: targetCustomer?.business_name,
                                customerTaxIdn: targetCustomer?.rut,
                                customerAddress: targetCustomer?.address,
                                customerEmail: targetCustomer?.email,
                                customerPhone: targetCustomer?.phone,
                                giroEmisor: targetCustomer?.business_line || 'Comercio al por menor',
                                comunaReceptor: targetCustomer?.commune,
                                ciudadReceptor: targetCustomer?.region
                            }
                        }
                        setStateMachine('Enviando')
                        getData(CREATE_PAYMENT_POSMACHINE, POST, bodyPosMachine).then(
                            (result) => {
                                if (result?.code === 200 && result?.data?.paymentRequestId) {
                                    setStateMachine('Pendiente')
                                    const idSale = result?.data?.paymentRequestId
                                    getStateSaleMachine(
                                        GET_STATE_SALE_POSMACHINE.replace(':id', idSale)
                                    )
                                        .then(async (machineData) => {
                                            try {
                                                const dteBody = generateDTEBody({
                                                    discount: discountTotalPctg,
                                                    isInvoice: true,
                                                    targetCustomer,
                                                    iva,
                                                    netTotal,
                                                    saleProductsList,
                                                    totalPay,
                                                    totalTaxFreePay
                                                })
                                                await createSaleOnHaulmer(GET_DOCUMENT_HAULMER, POST, dteBody)
                                                    .then((data) => {
                                                        if (data?.data?.TIMBRE) {
                                                            const newBody = {
                                                                ...body,
                                                                invoice_number: data?.data?.FOLIO,
                                                                stamp: data?.data?.TIMBRE
                                                            }
                                                            console.log(newBody)
                                                            try {
                                                                getData(SALE_TICKET_CREATE, POST, newBody).then(
                                                                    (result) => {
                                                                        set({ loadingSale: false })
                                                                        if (result?.code === 200) {
                                                                            console.log(result)
                                                                            const stamp = data?.data?.TIMBRE
                                                                            const folio = data?.data?.FOLIO // enviar
                                                                            const printEnabled =
														useSettingsStore.getState()?.printEnabled || true
                                                                            if (printEnabled) {
                                                                                saveDataToPrinterSaleTicket({
                                                                                    saleType,
                                                                                    products: saleProductsList,
                                                                                    total: totalPay,
                                                                                    stamp,
                                                                                    folioNumber: folio,
                                                                                    totalNet: netTotal,
                                                                                    iva,
                                                                                    cardDetail: machineData,
                                                                                    totalTaxFree: totalTaxFreePay,
                                                                                    discountExtra: totalDiscountExtra,
                                                                                    discountOffers: totalDiscountOffers,
                                                                                    customerDetail: targetCustomer,
                                                                                    openCashRegister: true
                                                                                })
                                                                            }
                                                                            // generatePdfDocument({ listSales: saleProductsList, totalPay, stamp, netTotal, iva, totalTaxFree: totalTaxFreePay, discountPctg: discount, targetCustomer })
                                                                            // window.open(resultDtemite?.LinkPDF, 'Boleta.pdf')
                                                                            notify('✅ Pago con éxito')
                                                                            if (onSuccessSale) {
                                                                                onSuccessSale()
                                                                            }
                                                                            removeSale(sales, saleId)
                                                                            set({ loadingSale: false })
                                                                        } else {
                                                                            notify(
                                                                                '❌ Problemas con el pago, intente efectuar el pago nuevamente'
                                                                            )
                                                                            set({ loadingSale: false })
                                                                        }
                                                                    }
                                                                )
                                                            } catch {
                                                                set({ loadingSale: false })
                                                            }
                                                        } else {
                                                            set({ loadingSale: false })
                                                        }
                                                    })
                                                    .catch((error) => {
                                                        const message = error?.message || 'Error en Haulmer'
                                                        notify('❌ ' + message)
                                                        set({ loadingSale: false })
                                                    })
                                            } catch {
                                                set({ loadingSale: false })
                                            }
                                            /*   getData(SALE_TICKET_CREATE, POST, body).then((result) => {
                                                set({ loadingSale: false })
                                                if (result?.code === 200) {
                                                    const printEnabled =
														useSettingsStore.getState()?.printEnabled || true
                                                    if (printEnabled) {
                                                        saveDataToPrinterSaleTicket({
                                                            saleType,
                                                            products: saleProductsList,
                                                            total: totalPay,
                                                            totalNet: netTotal,
                                                            iva,
                                                            totalTaxFree: totalTaxFreePay,
                                                            discountExtra: totalDiscountExtra,
                                                            discountOffers: totalDiscountOffers,
                                                            cardDetail: data,
                                                            customerDetail: targetCustomer,
                                                            openCashRegister: false
                                                        })
                                                    }
                                                    // generatePdfDocument({ listSales: saleProductsList, totalPay, netTotal, iva, totalTaxFree: totalTaxFreePay, discountPctg: discount, dataCard: data, targetCustomer })
                                                    notify('✅ Pago con tarjeta con éxito')
                                                    // setStateMachine(null)
                                                    removeSale(sales, saleId)
                                                } else {
                                                    console.log(result)
                                                    notify(
                                                        '❌ Problemas al guardar la venta, pero si se efectuo el cobro'
                                                    )
                                                    // setStateMachine(null)
                                                }
                                            }) */
                                        })
                                        .catch((error) => {
                                            notify('❌ Problemas con el pago con la tarjeta')
                                            set({ loadingSale: false })
                                            // setStateMachine(null)
                                        })
                                } else {
                                    notify('❌ ' + errorsMachine.get(result?.data?.code))
                                    set({ loadingSale: false })
                                    // setStateMachine(null)
                                }
                            }
                        )
                    } catch {
                        set({ loadingSale: false })
                        // setStateMachine(null)
                    }
                    /* } else if (isCardPayment) {
                    // agregamos la logica para mandar la factura hacia haulmer, pero no iria la logica hacia la maquina TUU, ya que el roro está usando la machian de santander para estos casos
                    */
                    /*  await saveTicketOnDatabase({
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
                    }) */
                } else {
                    try {
                        const dteBody = generateDTEBody({
                            discount: discountTotalPctg,
                            isInvoice: true,
                            targetCustomer,
                            iva,
                            netTotal,
                            saleProductsList,
                            totalPay,
                            totalTaxFreePay
                        })
                        await createSaleOnHaulmer(GET_DOCUMENT_HAULMER, POST, dteBody)
                            .then((data) => {
                                if (data?.data?.TIMBRE) {
                                    const newBody = {
                                        ...body,
                                        invoice_number: data?.data?.FOLIO,
                                        stamp: data?.data?.TIMBRE
                                    }
                                    console.log(newBody)
                                    try {
                                        getData(SALE_TICKET_CREATE, POST, newBody).then(
                                            (result) => {
                                                set({ loadingSale: false })
                                                if (result?.code === 200) {
                                                    console.log(result)
                                                    const stamp = data?.data?.TIMBRE
                                                    const folio = data?.data?.FOLIO // enviar
                                                    const printEnabled =
														useSettingsStore.getState()?.printEnabled || true
                                                    if (printEnabled) {
                                                        saveDataToPrinterSaleTicket({
                                                            saleType,
                                                            products: saleProductsList,
                                                            total: totalPay,
                                                            stamp,
                                                            folioNumber: folio,
                                                            totalNet: netTotal,
                                                            iva,
                                                            totalTaxFree: totalTaxFreePay,
                                                            discountExtra: totalDiscountExtra,
                                                            discountOffers: totalDiscountOffers,
                                                            customerDetail: targetCustomer,
                                                            openCashRegister: true
                                                        })
                                                    }
                                                    // generatePdfDocument({ listSales: saleProductsList, totalPay, stamp, netTotal, iva, totalTaxFree: totalTaxFreePay, discountPctg: discount, targetCustomer })
                                                    // window.open(resultDtemite?.LinkPDF, 'Boleta.pdf')
                                                    notify('✅ Pago con éxito')
                                                    if (onSuccessSale) {
                                                        onSuccessSale()
                                                    }
                                                    removeSale(sales, saleId)
                                                    set({ loadingSale: false })
                                                } else {
                                                    notify(
                                                        '❌ Problemas con el pago, intente efectuar el pago nuevamente'
                                                    )
                                                    set({ loadingSale: false })
                                                }
                                            }
                                        )
                                    } catch {
                                        set({ loadingSale: false })
                                    }
                                } else {
                                    set({ loadingSale: false })
                                }
                            })
                            .catch((error) => {
                                const message = error?.message || 'Error en Haulmer'
                                notify('❌ ' + message)
                                set({ loadingSale: false })
                            })
                    } catch {
                        set({ loadingSale: false })
                    }
                }

                set({ loadingSale: false })
                // setStateMachine(null)
            },
            createSaleTicket: async ({
                sales,
                saleId,
                notify,
                onSuccessSale,
                removeSale,
                isCardPayment
            }) => {
                set({ loadingSale: true, error: null })
                const saleIndex = sales?.findIndex((sale) => sale.id === saleId)
                const sale = sales[saleIndex]
                const saleType = VOUCHER_TYPE.TICKET

                const saleProductsList = sale?.saleProductsList
                const paymentTarget = sale?.paymentTarget

                const discountTotalPctg = sale?.discountPctg
                    ? sale?.discountPctg >= 0 && sale?.discountPctg <= 100
                        ? sale?.discountPctg / 100
                        : null
                    : null
                const totalDiscountExtra = sale?.discount
                const totalPay = discountTotalPctg
                    ? sale?.totalPrice - totalDiscountExtra
                    : sale?.totalPrice // add general discount

                const totalTaxFreePay = sale?.totalTaxFree || 0
                const totalWithOutTaxFree = totalPay - totalTaxFreePay

                const netTotal = roundValueWithMath(totalWithOutTaxFree / 1.19, 0, 0)
                const iva = totalWithOutTaxFree - netTotal

                const totalDiscountOffers = getTotalDiscountOffers({
                    products: saleProductsList
                })

                /* Model to send endpoint our bd */
                const cashRegister = getCashRegister()
                const body = {
                    is_done: true,
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
                    user_id: getIdUser(),
                    total: totalPay
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
                // setStateMachine(null)
            },
            cancelSale: async ({
                sales,
                saleId,
                notify,
                onSuccessCancelSale,
                removeSale,
                isCardPayment,
                detailCancel
            }) => {
                set({ loadingSale: true, error: null })
                const saleIndex = sales?.findIndex((sale) => sale.id === saleId)
                const sale = sales[saleIndex]
                const saleType = VOUCHER_TYPE.TICKET

                const saleProductsList = sale?.saleProductsList
                const paymentTarget = 1

                const discountTotalPctg = sale?.discountPctg
                    ? sale?.discountPctg >= 0 && sale?.discountPctg <= 100
                        ? sale?.discountPctg / 100
                        : null
                    : null
                const totalDiscountExtra = sale?.discount
                const totalPay = discountTotalPctg
                    ? sale?.totalPrice - totalDiscountExtra
                    : sale?.totalPrice // add general discount

                const totalTaxFreePay = sale?.totalTaxFree || 0
                const totalWithOutTaxFree = totalPay - totalTaxFreePay

                const netTotal = roundValueWithMath(totalWithOutTaxFree / 1.19, 0, 0)
                const iva = totalWithOutTaxFree - netTotal

                const totalDiscountOffers = getTotalDiscountOffers({
                    products: saleProductsList
                })

                /* Model to send endpoint our bd */
                const cashRegister = getCashRegister()
                const body = {
                    is_done: false,
                    detail: detailCancel,
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
                    user_id: getIdUser(),
                    total: totalPay
                }

                await cancelSaleOnDatabase({
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
                        if (onSuccessCancelSale) {
                            onSuccessCancelSale()
                        }
                        removeSale(sales, saleId)
                        set({ loadingSale: false })
                    }
                })

                set({ loadingSale: false })
                // setStateMachine(null)
            },
            createSaleMixed: async ({
                sales,
                saleId,
                notify,
                onSuccessSale,
                removeSale,
                cashAmount,
                cardAmount
            }) => {
                set({ loadingSale: true, error: null })
                const saleIndex = sales?.findIndex((sale) => sale.id === saleId)
                const sale = sales[saleIndex]
                const saleType = VOUCHER_TYPE.VOUCHER

                const saleProductsList = sale?.saleProductsList

                const discountTotalPctg = sale?.discountPctg
                    ? sale?.discountPctg >= 0 && sale?.discountPctg <= 100
                        ? sale?.discountPctg / 100
                        : null
                    : null
                const totalDiscountExtra = sale?.discount
                const totalPay = discountTotalPctg
                    ? sale?.totalPrice - totalDiscountExtra
                    : sale?.totalPrice

                const totalTaxFreePay = sale?.totalTaxFree || 0
                const totalWithOutTaxFree = totalPay - totalTaxFreePay
                const netTotal = roundValueWithMath(totalWithOutTaxFree / 1.19, 0, 0)
                const iva = totalWithOutTaxFree - netTotal

                const totalDiscountOffers = getTotalDiscountOffers({ products: saleProductsList })
                const cashRegister = getCashRegister()
                const body = {
                    is_done: true,
                    sales_receipt: saleProductsList?.map((item) => ({
                        product_id: item?.product?.id,
                        quantity: item?.quantity,
                        total_price: item?.total,
                        total_discount: item?.discount
                    })),
                    payment_type_id: 7,
                    voucher_type_id: 1,
                    cash_register_id: cashRegister?.ID,
                    user_id: getIdUser(),
                    total: totalPay
                }

                const device = getDeviceTuu()

                const finalizeSale = async ({ cardData = null, hasCash = false }) => {
                    try {
                        // La boleta se emite solo por la porción en efectivo.
                        // El TUU genera su propio DTE por la porción de tarjeta.
                        const cashTaxFreePay = totalTaxFreePay > 0
                            ? roundValueWithMath(totalTaxFreePay * (cashAmount / totalPay), 0, 0)
                            : 0
                        const cashWithOutTaxFree = cashAmount - cashTaxFreePay
                        const cashNetTotal = roundValueWithMath(cashWithOutTaxFree / 1.19, 0, 0)
                        const cashIva = cashWithOutTaxFree - cashNetTotal

                        // Item sintético para que el Detalle calce con los totales del efectivo.
                        // Haulmer valida sum(MontoItem) contra MntTotal del Encabezado.
                        const cashSaleItem = [{
                            product: { name: 'PAGO EFECTIVO - MIXTO', price: cashAmount, taxFree: false },
                            quantity: 1,
                            discount: 0,
                            total: cashAmount
                        }]

                        const dteBody = generateDTEBody({
                            discount: null,
                            isInvoice: false,
                            iva: cashIva,
                            netTotal: cashNetTotal,
                            saleProductsList: cashSaleItem,
                            totalPay: cashAmount,
                            totalTaxFreePay: cashTaxFreePay
                        })
                        await createSaleOnHaulmer(GET_DOCUMENT_HAULMER, POST, dteBody)
                            .then((data) => {
                                if (data?.data?.TIMBRE) {
                                    const newBody = {
                                        ...body,
                                        invoice_number: data?.data?.FOLIO,
                                        stamp: data?.data?.TIMBRE
                                    }
                                    getData(SALE_TICKET_CREATE, POST, newBody).then((result) => {
                                        set({ loadingSale: false })
                                        if (result?.code === 200) {
                                            const printEnabled =
                                                useSettingsStore.getState()?.printEnabled || true
                                            if (printEnabled) {
                                                saveDataToPrinterSaleTicket({
                                                    saleType,
                                                    products: cashSaleItem,
                                                    total: cashAmount,
                                                    stamp: data?.data?.TIMBRE,
                                                    folioNumber: data?.data?.FOLIO,
                                                    totalNet: cashNetTotal,
                                                    iva: cashIva,
                                                    totalTaxFree: cashTaxFreePay,
                                                    discountExtra: totalDiscountExtra,
                                                    discountOffers: totalDiscountOffers,
                                                    cardDetail: cardData,
                                                    openCashRegister: hasCash
                                                })
                                            }
                                            notify('✅ Pago mixto con éxito')
                                            if (onSuccessSale) onSuccessSale()
                                            removeSale(sales, saleId)
                                        } else {
                                            notify('❌ Problemas al guardar la venta, pero el cobro fue efectuado')
                                        }
                                    })
                                } else {
                                    set({ loadingSale: false })
                                }
                            })
                            .catch((error) => {
                                notify('❌ ' + (error?.message || 'Error en Haulmer'))
                                set({ loadingSale: false })
                            })
                    } catch {
                        set({ loadingSale: false })
                    }
                }

                const hasCash = cashAmount > 0

                if (device) {
                    try {
                        const bodyPosMachine = {
                            device,
                            amount: cardAmount,
                            dteType: 48,
                            printVoucherOnApp: false,
                            extraData: {
                                taxIdnValidation: '77426986-K',
                                sourceName: 'Marina APP'
                            }
                        }
                        setStateMachine('Enviando')
                        await getData(CREATE_PAYMENT_POSMACHINE, POST, bodyPosMachine).then(
                            (result) => {
                                if (result?.code === 200 && result?.data?.paymentRequestId) {
                                    setStateMachine('Pendiente')
                                    const idSale = result?.data?.paymentRequestId
                                    getStateSaleMachine(
                                        GET_STATE_SALE_POSMACHINE.replace(':id', idSale)
                                    )
                                        .then(async (cardData) => {
                                            setStateMachine(null)
                                            await finalizeSale({ cardData, hasCash })
                                        })
                                        .catch(() => {
                                            notify('❌ Problemas con el pago con tarjeta')
                                            set({ loadingSale: false })
                                            setStateMachine(null)
                                        })
                                } else {
                                    notify('❌ ' + errorsMachine.get(result?.data?.code))
                                    set({ loadingSale: false })
                                    setStateMachine(null)
                                }
                            }
                        )
                    } catch {
                        set({ loadingSale: false })
                    }
                } else {
                    // Sin dispositivo TUU: la tarjeta se cobra manualmente en terminal externo
                    await finalizeSale({ cardData: null, hasCash })
                }

                set({ loadingSale: false })
            },
            /* Add discount */
            addDiscountSale: (listSalesActives, saleIdActive, value, cleanForm) => {
                const saleIndex = listSalesActives?.findIndex(
                    (sale) => sale.id === saleIdActive
                )
                listSalesActives[saleIndex].discount = value
                    ? listSalesActives[saleIndex].totalPrice * (value / 100)
                    : null
                listSalesActives[saleIndex].discountPctg = value
                    ? parseInt(value)
                    : null
                set({ listSalesActives })
                cleanForm()
            },
            /* Add discount */
            removeDiscountSale: (listSalesActives, saleIdActive) => {
                const saleIndex = listSalesActives?.findIndex(
                    (sale) => sale.id === saleIdActive
                )
                listSalesActives[saleIndex].discount = null
                listSalesActives[saleIndex].discountPctg = null
                set({ listSalesActives })
            },
            setPaymentViewEnabled: ({ sales, saleId, paymentViewEnabled }) => {
                const saleIndex = sales?.findIndex((sale) => sale.id === saleId)
                sales[saleIndex].paymentViewEnabled = paymentViewEnabled
                set({ listSalesActives: sales })
            }
        }),
        {
            name: 'sales'
        }
    )
)

export default useSalesStore
