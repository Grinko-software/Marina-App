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
    setPeriodQuantity: () => set((state) => ({ periodQuantity: state }))
}))

export default useFilterStore
