import { create } from 'zustand'

const today = new Date()
today.setHours(0, 0, 0, 0)

const oneWeekAgo = new Date(today)
oneWeekAgo.setDate(today.getDate() - 7)

const useFilterStore = create((set) => ({
    fromDate: undefined,
    toDate: undefined,
    rangeType: undefined,
    periodQuantity: undefined,
    error: null,
    loading: false,
    setRangeType: (value) => set({ rangeType: value }),
    setFromDate: (value) => set({ fromDate: value }),
    setToDate: () => (value) => set({ toDate: value }),
    setPeriodQuantity: (value) => set({ periodQuantity: value })
}))

export default useFilterStore
