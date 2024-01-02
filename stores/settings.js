import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const DEFAULT_SELECTED = { ID: 'no-select', label: 'NINGUNA' }

const useSettingsStore = create(
    persist(
        (set) => ({
            SelectedPostMachine: DEFAULT_SELECTED,
            PostMachines: null,
            setPostMachines: (value) => set({ PostMachines: value }),
            setSelectedPostMachine: (value) => set({ SelectedPostMachine: value }),

            SelectedCashRegister: DEFAULT_SELECTED,
            CashRegister: null,
            setCashRegister: (value) => set({ PostMachines: value }),
            setSelectedCashRegister: (value) => set({ SelectedPostMachine: value })
        }), {
            name: 'settings'
        }
    )
)

export default useSettingsStore
