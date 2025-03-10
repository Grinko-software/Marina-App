import { create } from 'zustand'

const today = new Date()
today.setHours(0, 0, 0, 0)

const oneWeekAgo = new Date(today)
oneWeekAgo.setDate(today.getDate() - 7)

const useFilterStore = create((set) => ({
    fromDate: oneWeekAgo,
    toDate: today,
    periodQuantity: Math.ceil((today.getTime() - oneWeekAgo.getTime()) / (1000 * 3600 * 24)),
    periodRange: 'Day',
    setFromDate: (value) => set((state) => {
        const newFromDate = new Date(value)
        newFromDate.setHours(0, 0, 0, 0)
        return {
            fromDate: newFromDate,
            periodQuantity: Math.ceil((state.toDate.getTime() - newFromDate.getTime()) / (1000 * 3600 * 24))
        }
    }),
    setToDate: (value) => set((state) => {
        const newToDate = new Date(value)
        newToDate.setHours(0, 0, 0, 0)
        return {
            toDate: newToDate,
            periodQuantity: Math.ceil((newToDate.getTime() - state.fromDate.getTime()) / (1000 * 3600 * 24))
        }
    }),
    setPeriodQuantity: (value) => set({ periodQuantity: value })
}))

export default useFilterStore
