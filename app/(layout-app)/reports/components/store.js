import { create } from 'zustand'

const useReportsStore = create((set) => ({
    data: undefined,
    onChange: (value) => {
        set({ data: value })
    }
}))

export default useReportsStore
