import { create } from 'zustand'
import { requestDataSaleDetail } from './service'
import { fetchGetReportsLastSales } from '@/services/reports'
const useLastSalesStore = create((set) => ({
    data: undefined,
    loading: false,
    totalpage: undefined,
    requestData: (limitPage, currentPage) => {
        set({ loading: true })
        fetchGetReportsLastSales(limitPage, currentPage).then((data) => {
            set({
                data: data?.data?.last_sales_response,
                totalpage: data?.data?.total_page
            })
        }).catch((error) => { console.debug(error) })
        set({ loading: false })
    },
    requestSaleDetail: async ({ saleId }) => {
        const [data] = await Promise.all([requestDataSaleDetail(saleId)])
        return undefined || data
    }
}))

export default useLastSalesStore
