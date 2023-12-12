import { fetchGetReportsLastSales } from '@/services/reports'

export const requestDataSales = async (from, rangeType, periodQuantity) => {
    try {
        return fetchGetReportsLastSales()
    } catch (error) {
        console.log(error)
    }
}
