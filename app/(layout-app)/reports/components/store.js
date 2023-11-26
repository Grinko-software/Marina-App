import { create } from 'zustand'

const useReportsStore = create((set) => ({
    periodIndicators: undefined,
    pieChart: undefined,
    barChart: undefined,
    areaChart: undefined,
    table: undefined,
    updatePieChart: (value) => {
        set({ pieChart: value })
    },
    updatePeriodIndicators: (value) => {
        set({ periodIndicators: value })
    },
    updateAreaChart: (value) => {
        set({ areaChart: value })
    }
}))

export default useReportsStore
