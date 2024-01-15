import { POST, GET, getData } from '@/services/http'
import { BALANCE_BEGINNINGS_API_URL, GET_CASH_REGISTER } from '@/settings/constants'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const DEFAULT_SELECTED = { ID: 'no-select', label: 'NINGUNA' }

const useBoxStore = create(
    persist(
        (set) => ({
            SelectedCashRegister: DEFAULT_SELECTED,
            CashRegister: null,
            AccountingCashStartInitialized: false,
            setCashRegister: (value) => set({ CashRegister: value }),
            setSelectedCashRegister: (value) => set({ SelectedCashRegister: value }),
            getCashRegister: () => {
                set({ loading: true, error: null })
                try {
                    getData(GET_CASH_REGISTER, GET).then((result) => {
                        if (result?.data?.length > 0) {
                            set({ CashRegister: result?.data })
                        }
                    }
                    ).catch((error) => {
                        console.debug(error)
                        set({ loading: false })
                    })
                } catch (error) { console.error(error) }
            },
            balanceBeginning: (userID, totalBeginning, totalDetailBeginning, CashRegisterID) => {
                try {
                    getData(BALANCE_BEGINNINGS_API_URL, POST, {
                        total_beginning: totalBeginning,
                        detail_beginning: totalDetailBeginning,
                        user_id: userID,
                        cash_registry_id: CashRegisterID
                    }).then((result) => {
                        if (result?.code === 200) {
                            set({ AccountingCashStartInitialized: true })
                        }
                    }).catch((error) => { console.debug(error) })
                } catch (error) { console.error(error) }
            }
        }), {
            name: 'box'
        }
    )
)
export default useBoxStore
