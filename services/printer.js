import { getData, POST } from '@/services/http'
import { PRINTER_TICKET_API_URL } from '@/settings/constants'
import { formatNumberWithPoints } from '@/utils/number'

const VOUCHER_TYPE = {
    1: 'voucher',
    2: 'invoice',
    3: 'ticket'
}

export const fetchPrinterTicket = async ({
    saleType,
    datetime,
    paymentType,
    folioNumber,
    total,
    discount,
    discountPctg,
    stamp,
    totalTaxFree,
    totalNet,
    iva,
    cardDetail,
    customerDetail,
    products,
    notify
}) => {
    const data = {
        datetime,
        saleType: VOUCHER_TYPE[saleType],
        // paymentType: paymentType || 'card',
        voucherNumber: folioNumber || '',
        stamp: stamp || '',
        total: formatNumberWithPoints(total, ''),
        discount: formatNumberWithPoints(discount || null, ''),
        totalTaxFree: formatNumberWithPoints(totalTaxFree, ''),
        totalNet: formatNumberWithPoints(totalNet, ''),
        iva: formatNumberWithPoints(iva, ''),
        cardDetail: cardDetail || null,
        discountPctg: formatNumberWithPoints(discountPctg, ''),
        customerDetail: customerDetail || null,
        productList: products?.map(
            ({ name, quantity, total }) => {
                return {
                    name,
                    quantity: quantity?.toString(),
                    total: formatNumberWithPoints(total, '')
                }
            })
    }

    try {
        return getData(`${PRINTER_TICKET_API_URL}`, POST, data, true)
            .then(response => {
                try {
                    if (response?.code !== 200) {
                        notify('❌ Ocurrió un error al imprimir la boleta.')
                    }
                } catch {
                    notify('❌ Ocurrió un error al imprimir la boleta.')
                    return null
                }
            })
    } catch {
        return null
    }
}
