import { create } from 'zustand'
import { requestSupplierList } from './service'

const useSupplierStore = create((set) => ({
    data: undefined,
    loading: false,
    requestData: async () => {
        set({ loading: true })
        const [data] = await Promise.all([requestSupplierList()])
        if (data) {
            set({ data: data?.data })
        }
        set({ loading: false })
    }
    /* requestDataDetail: async ({ saleId }) => {
        const [data] = await Promise.all([requestSupplierList(saleId)])
        return undefined || data
    } */
}))

export default useSupplierStore
