/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { create } from 'zustand'
import { TYPE_PAYMENT_API_URL, TYPE_VOUCHER_API_URL, SALE_TICKET_CREATE } from '@/settings/constants'
import { fetchPost } from '@/services/sales'
import { generatePdfDocument } from './components/voucher/services'

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
                    listSales = [...newList, { product, quantity: searhProduct?.quantity + units, offers: offersOfProduct, discount: offersOfProduct > 0 ? total : 0, total: product?.price * quantitySale }]
                } else {
                    const quantitySale = units
                    const offersOfProduct = Math.trunc(quantitySale / offersProduct.quantity)
                    const total = ((product?.price * offersProduct?.quantity) - (offersProduct?.quantity * offersProduct?.unitPrice)) * offersOfProduct
                    listSales = [...listSales, { product, quantity: units, offers: offersOfProduct, discount: offersOfProduct > 0 ? total : 0, total: product?.price * quantitySale }]
                }
            } else {
                if (!searhProduct) {
                    listSales = [...listSales, { product, quantity: parseFloat(units), discount: 0, total: product?.price * 1 }]
                } else {
                    const newList = listSales?.filter((item) => item?.product?.id !== product?.id)
                    listSales = [...newList, { product, quantity: searhProduct?.quantity + parseFloat(units), discount: 0, total: product?.price * (searhProduct?.quantity + units) }]
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
        createSale: (sales, saleId, notify, setPayment, onClose, setGoPay, setPageTarget, pageTarget, removeSale) => {
            const saleIndex = sales?.findIndex((sale) => sale.id === saleId)
            const sale = sales[saleIndex]
            const saleProductsList = sale.saleProductsList
            const paymentTarget = sale.paymentTarget
            const voucherTarget = sale.voucherTarget
            const totalPay = sale.totalPrice

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
            try {
                fetchPost(SALE_TICKET_CREATE, body).then(result => {
                    setPageTarget(false)
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

                        onClose()
                        setGoPay(false)
                        setPageTarget(null)
                    }
                })
            } catch {
                set({ loadingSale: false })
            }
        }
    }),
    {
        name: 'sales'
    }

)

export default useSalesStore
