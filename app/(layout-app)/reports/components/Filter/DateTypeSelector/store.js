import { create } from 'zustand'
import { getDateTypes } from '../service'

const useDateTypeStore = create((set) => ({
    options: [],
    value: 'daily',
    error: null,
    loading: false,
    requestData: async () => {
        try {
            set({ loading: true })
            const result = await getDateTypes()
            set({ options: result, loading: false })
        } catch (error) {
            set({ options: [], error, loading: false })
        }
    },
    setSelection: (selection) => set({ value: selection })
}))

export default useDateTypeStore
