import { create } from 'zustand'
import { requestDataSales, requestDataSaleDetail } from './service'

const useLastSalesStore = create((set) => ({
    data: undefined,
    loading: false,
    requestData: async () => {
        set({ loading: true })
        const [data] = await Promise.all([requestDataSales()])
        if (data) {
            set({ data: data?.data })
        }
        set({ loading: false })
    },
    requestSaleDetail: async ({ saleId }) => {
        const [data] = await Promise.all([requestDataSaleDetail(saleId)])
        return undefined || data
    }
}))

export default useLastSalesStore
