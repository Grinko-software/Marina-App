import { create } from 'zustand'
import { requestDataSales } from './service'

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
    }
}))

export default useLastSalesStore
