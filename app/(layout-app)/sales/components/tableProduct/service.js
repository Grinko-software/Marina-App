import { GET, getDataMultiple } from '@/services/http'
import { PRODUCT_API_URL, CATEGORIES_API_URL, PRODUCT_OFFER } from '@/settings/constants'

/* export const getDataRequest = () => getData(PRODUCT_API_URL) */
export const getMultiDataRequest = async () => getDataMultiple([
    { url: PRODUCT_API_URL, method: GET },
    { url: CATEGORIES_API_URL, method: GET },
    { url: PRODUCT_OFFER, method: GET }
])

export const reMapData = (data) => {
    if (data?.length > 0) {
        return { inventory: data[0], categories: data[1], offers: data[2] }
    } else {
        return null
    }
}
