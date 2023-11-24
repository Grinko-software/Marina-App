import { create } from 'zustand'

const useRangeDateStore = create((set) => ({
    valueFrom: undefined,
    valueTo: undefined,
    onChange: (dateFrom, dateTo) => {
        set({ valueFrom: dateFrom })
        set({ valueTo: dateTo })
    }
}))

export default useRangeDateStore
