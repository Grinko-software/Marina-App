import { create } from 'zustand'
import { requestDataSaleDetail } from './service'
import { fetchGetReportsLastSales } from '@/services/reports'
const useLastSalesStore = create((set) => ({
    data: undefined,
    loading: false,
    requestData: () => {
        set({ loading: true })
        fetchGetReportsLastSales().then((data) => {
            set({ data: data?.data })
        }).catch((error) => { console.debug(error) })
        set({ loading: false })
    },
    requestSaleDetail: async ({ saleId }) => {
        const [data] = await Promise.all([requestDataSaleDetail(saleId)])
        return undefined || data
    }
}))

export default useLastSalesStore
