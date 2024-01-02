import { create } from 'zustand'

const useHttpStore = create(
    (set) => ({
        apiUrl: 'https://marina-market-api.up.railway.app',
        requestQueue: [],
        isRefreshing: false,
        setRequestQueue: (requestQueue) => set({ requestQueue }),
        setIsRefreshing: (isRefreshing) => set({ isRefreshing })
    }),
    {
        name: 'scanner'
    }

)

export default useHttpStore
