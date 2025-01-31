import { create } from 'zustand';

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
}));

export default useFilterStore;
