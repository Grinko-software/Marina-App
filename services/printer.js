import { getData, POST } from '@/services/http'
import { PRINTER_TICKET_API_URL } from '@/settings/constants'
import { today } from '@/utils/date'
import { formatNumberWithPoints } from '@/utils/number'
import { notify } from './notify'

export const VOUCHER_TYPE = {
    VOUCHER: 'voucher',
    INVOICE: 'invoice',
    TICKET: 'ticket'
}

export const fetchPrinterTicket = async ({
    saleType,
    datetime,
    folioNumber,
    total,
    discountOffers,
    discountExtra,
    stamp,
    totalTaxFree,
    totalNet,
    iva,
    cardDetail,
    customerDetail,
    products
}) => {
    const discountTotal = (discountOffers || 0) + (discountExtra || 0)
    const data = {
        datetime: (datetime || today()).format('DD-MM-YYYY HH:mm:ss'),
        saleType: saleType || VOUCHER_TYPE.TICKET,
        voucherNumber: formatNumberWithPoints(folioNumber || null) || null,
        stamp: stamp || null,
        total: formatNumberWithPoints(total, ''),
        discountOffers: formatNumberWithPoints(discountOffers || null, null),
        totalTaxFree: formatNumberWithPoints(totalTaxFree || null, null),
        totalNet: formatNumberWithPoints(totalNet, ''),
        iva: formatNumberWithPoints(iva, ''),
        cardDetail: cardDetail || null,
        discountExtra: formatNumberWithPoints(discountExtra || null, null),
        discountTotal: formatNumberWithPoints(discountTotal || null, null),
        customerDetail: customerDetail || null,
        productList: products?.map(
            (item) => {
                return {
                    name: item?.product?.name || item?.name,
                    quantity: item?.quantity?.toString(),
                    total: formatNumberWithPoints(item?.total, '')
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
