import { GET, getDataMultiple } from '@/services/http'
import { CATEGORIES_API_URL, PRODUCT_OFFER } from '@/settings/constants'

export const getMultiDataRequest = async () => {
    return getDataMultiple([
        { url: CATEGORIES_API_URL, method: GET },
        { url: PRODUCT_OFFER, method: GET }
    ])
}
export const getMultiDataRequestWithImage = async () =>
    getDataMultiple([
        { url: CATEGORIES_API_URL, method: GET },
        { url: PRODUCT_OFFER, method: GET }
    ])

export const reMapData = (data) => {
    if (data?.length > 0) {
        return { categories: data[0], offers: data[1] }
    } else {
        return null
    }
}
