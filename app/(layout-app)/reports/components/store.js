import { create } from 'zustand'

const useReportsStore = create((set) => ({
    periodIndicators: {
        totalSales: 0,
        totalMoney: 0
    },
    pieChart: undefined,
    barChart: undefined,
    areaChart: undefined,
    table: undefined,
    updatePieChart: (value) => {
        set({ pieChart: value })
    }
}))

export default useReportsStore
