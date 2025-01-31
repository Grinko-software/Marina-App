import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { GET_POST_MACHINE, GET_CASH_REGISTER } from '@/settings/constants'
import { getData, GET } from '@/services/http'
export const DEFAULT_SELECTED = { ID: 'no-select', label: 'NINGUNA' }
const useSettingsStore = create(
    persist(
        (set) => ({
            selectedPostMachine: DEFAULT_SELECTED,
            postMachines: null,
            error: null,
            loading: false,
            statusCashRegister: null,
            disabled: false,
            printEnabled: true,
            setDisabled: (disabled) => set({ disabled }),
            setStatusCashRegister: (statusCashRegister) =>
                set({ statusCashRegister }),
            setPostMachines: (value) => set({ postMachines: value }),
            setSelectedPostMachine: (value) => set({ selectedPostMachine: value }),
            getPostMachines: () => {
                set({ loading: true, error: null })
                try {
                    getData(GET_POST_MACHINE, GET)
                        .then((result) => {
                            if (result?.data?.length > 0) {
                                set({ postMachines: result?.data })
                            }
                        })
                        .catch((error) => {
                            console.debug(error)
                            set({ loading: false })
                        })
                } catch (error) {
                    console.error(error)
                }
            },
            selectedCashRegister: DEFAULT_SELECTED,
            cashRegister: null,
            setCashRegister: (value) => set({ cashRegister: value }),
            setPrintEnabled: (value) => set({ printEnabled: value }),
            setSelectedCashRegister: (value) => set({ selectedCashRegister: value }),
            getCashRegister: () => {
                set({ loading: true, error: null })
                try {
                    getData(GET_CASH_REGISTER, GET)
                        .then((result) => {
                            if (result?.data?.length > 0) {
                                set({ cashRegister: result?.data })
                            }
                        })
                        .catch((error) => {
                            console.debug(error)
                            set({ loading: false })
                        })
                } catch (error) {
                    console.error(error)
                }
            }
        }),
        {
            name: 'settings'
        }
    )
)
export default useSettingsStore
