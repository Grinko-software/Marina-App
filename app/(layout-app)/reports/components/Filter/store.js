import { fetchGetReports } from '@/services/reports'
import { create } from 'zustand'

const useFilterStore = create((set) => ({
    fromDate: undefined,
    toDate: undefined,
    rangeType: undefined,
    periodQuantity: undefined,
    error: null,
    loading: false,
    setRangeType: () => set(
        (state) => ({ rangeType: state })
    ),
    setFromDate: () => set((state) => ({ fromDate: state })),
    setToDate: () => set((state) => ({ toDate: state })),
    setPeriodQuantity: () => set((state) => ({ periodQuantity: state })),
    requestData: async (from, rangeType, periodQuantity) => {
        try {
            console.log('fetchData')
            return fetchGetReports({
                periodStart: from,
                periodType: rangeType,
                periodQuantity
            })
        } catch (error) {
            console.log(error)
        }
    }
}))

export default useFilterStore
