/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import {
    changePriceStar,
    getValueByStar,
    getPaymentList,
    putStateTaskPaid
} from '../../service'
import { formatterNumber } from '@/utils/number'

const useFilterStorePayment = create((set) => ({
    totalPay: null,
    setTotalPay: (value) => set({ totalPay: value }),
    data: null,
    totalPayment: null,
    totalStar: null,
    loading: false,
    totalpage: undefined,
    selectionUser: null,
    fromDate: null,
    toDate: null,
    priceStar: null,
    newPriceStar: null,
    setNewPriceStar: (value) => set({ newPriceStar: value }),
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
                            totalPayment: formatterNumber(data?.data?.total_payment),
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
                            data: [],
                            totalPayment: null,
                            totalStar: null
                        })
                    }
                })
                .catch((error) => {
                    console.debug(error)
                })
                .finally(() => {
                    set({ loading: false })
                })
        } catch (e) {
            set({ loading: false })
        }
    },
    sendToPay: async ({ listPayments }) => {
        try {
            set({ loading: true })

            const promises = listPayments.map(async ({ id }) => {
                const response = await putStateTaskPaid({ taskId: id })
                // Handle response or errors here, e.g., log, display notifications
                return response
            })
            set({ loading: false })
            return await Promise.all(promises)

            // All payments have been processed, now make the final requestData call
            // requestData({ userId, fromDate, toDate })
        } catch (e) {
            console.error('Error processing payments:', e)
            set({ loading: false })
        }
    },
    getPriceForStar: async () => {
        try {
            set({ loading: true })
            const response = await getValueByStar()
            set({ priceStar: response?.data?.cash_bonus })
            set({ loading: false })
        } catch (e) {
            console.error('Error getting price for SAR:', e)
            set({ loading: false })
        }
        return null
    },
    updatePriceStar: async (newPriceStar) => {
        try {
            set({ loading: true })
            const response = await changePriceStar(newPriceStar)
            set({ loading: false })
            return response
        } catch (e) {
            console.error('Error getting price for SAR:', e)
            set({ loading: false })
        }
        return null
    }
}))

export default useFilterStorePayment
