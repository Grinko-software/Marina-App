import { GET, getDataMultiple } from '@/services/http'
import { TYPE_VOUCHER_API_URL, TYPE_PAYMENT_API_URL, CUSTOMER_API_URL } from '@/settings/constants'

export const getMultiDataRequest = async () => getDataMultiple([
    { url: TYPE_VOUCHER_API_URL, method: GET },
    { url: TYPE_PAYMENT_API_URL, method: GET },
    { url: CUSTOMER_API_URL, method: GET }
])

export const reMapData = (data) => {
    if (data?.length > 0) {
        return { typeVoucher: data[0], typePayment: data[1], customers: data[2] }
    } else {
        return null
    }
}
