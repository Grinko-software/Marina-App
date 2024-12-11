/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import { getPaymentList } from '../../service'

const useFilterStorePayment = create((set) => ({
    data: null,
    totalPayment: null,
    totalStar: null,
    loading: false,
    totalpage: undefined,
    selectionUser: null,
    fromDate: null,
    toDate: null,
    setSelectionUser: (value) => set({ selectionUser: value }),
    setFromDate: (value) => set({ fromDate: value }),
    setToDate: (value) => set({ toDate: value }),
    setLoading: (value) => set({ loading: value }),
    requestData: ({ userId, fromDate, toDate }) => {
        try {
            set({ loading: true })
            getPaymentList({ userId, fromDate, toDate })
                .then((data) => {
                    if (data?.data?.task?.length > 0) {
                        set({
                            totalPayment: data?.data?.total_payment,
                            totalStar: data?.data?.total_star,
                            data: data?.data?.task?.map(({ id, name, rating }) => {
                                return {
                                    id,
                                    name,
                                    rating
                                }
                            })
                        })
                    } else {
                        set({
                            data: []
                        })
                    }
                }).catch((error) => {
                    console.debug(error)
                }).finally(() => {
                    set({ loading: false })
                })
        } catch (e) {
            set({ loading: false })
        }
    }
}))

export default useFilterStorePayment
