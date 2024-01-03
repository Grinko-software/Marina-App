import { create } from 'zustand'
import { BASE_MARKET_API_URL } from '../settings/constants'
const useHttpStore = create(
    (set) => ({
        apiUrl: BASE_MARKET_API_URL,
        requestQueue: [],
        isRefreshing: false,
        setRequestQueue: (requestQueue, value) => {
            requestQueue.push(value)
            set({ requestQueue })
        },
        setIsRefreshing: (isRefreshing) => set({ isRefreshing })
    }),
    {
        name: 'scanner'
    }

)

export default useHttpStore
