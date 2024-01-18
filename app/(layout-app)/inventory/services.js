import { GET, getDataMultiple } from '@/services/http'
import { CATEGORIES_API_URL, TYPE_STOCK_API_URL } from '@/settings/constants'

export const getMultiDataRequest = async () => getDataMultiple([
    { url: CATEGORIES_API_URL, method: GET },
    { url: TYPE_STOCK_API_URL, method: GET }
])

export const reMapData = (data) => {
    if (data?.length > 0) {
        return { categories: data[0], stockTypes: data[1] }
    } else {
        return null
    }
}
