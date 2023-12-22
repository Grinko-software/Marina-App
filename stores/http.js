import { create } from 'zustand'

const useHttpStore = create(
    (set) => ({
        apiUrl: 'https://marina-market-api.up.railway.app',
        requestQueue: [],
        isRefreshing: false,
        setRequestQueue: () => set((requestQueue) => ({ requestQueue })),
        setIsRefreshing: () => set((isRefreshing) => ({ isRefreshing }))
    }),
    {
        name: 'scanner'
    }

)

export default useHttpStore
