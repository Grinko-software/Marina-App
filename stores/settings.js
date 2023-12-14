import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useSettingsStore = create(
    persist(
        (set) => ({
            SelectedPostMachine: null,
            PostMachines: null,
            setPostMachines: (value) => set({ PostMachines: value }),
            setSelectedPostMachine: (value) => set({ SelectedPostMachine: value })
        }), {
            name: 'settings'
        }
    )
)

export default useSettingsStore
