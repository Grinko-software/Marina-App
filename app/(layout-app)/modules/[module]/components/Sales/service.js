import {
    fetchGetReportsLastSales,
    fetchGetSaleDatailById
} from '@/services/reports'

export const requestDataSales = async () => {
    try {
        return fetchGetReportsLastSales()
    } catch (error) {
        console.log(error)
    }
}

export const requestDataSaleDetail = async (saleId) => {
    try {
        return fetchGetSaleDatailById(saleId)
    } catch (error) {
        console.log(error)
    }
}
