import { create } from 'zustand'
import { requestGetAssociationSupplier, requestSupplierList } from './service'

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
    },
    requestSupplierDetail: async ({ supplierId }) => {
        const [data] = await Promise.all([requestGetAssociationSupplier({ supplierId })])
        return undefined || data
    }
}))

export default useSupplierStore
