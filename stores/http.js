import { create } from 'zustand';
import { BASE_MARKET_API_URL } from '../settings/constants';
const useHttpStore = create(
	(set) => ({
		apiUrl: BASE_MARKET_API_URL,
		isRefreshing: false,
		setIsRefreshing: (isRefreshing) => set({ isRefreshing })
	}),
	{
		name: 'scanner'
	}
);

export default useHttpStore;
