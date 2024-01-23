/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getData, GET, POST } from '@/services/http'
import { GET_INDICATORS_LAST_BALANCE, CREATE_BALANCE_BEGINNINGS } from '@/settings/constants'
const useCashBalanceStore = create(
    (set) => ({
        error: null,
        loading: false,
        getLastIndicatorsCashBalanceEnding: (id, setLastBalance) => {
            set({ loading: true })
            try {
                getData(GET_INDICATORS_LAST_BALANCE.replace(':id', id), GET).then((result) => {
                    set({ loading: false })
                    if (result?.code === 200) {
                        // edit state
                        setLastBalance(result?.data)
                    } else {
                        setLastBalance(null)
                    }
                }
                )
            } catch (error) {
                set({ error, loading: false })
            }
        },
        createBalanceBeginnings: (cashRegisterId, userId, detail, totalBeginnig, setStatusCashRegister, setReadQR,
            onClose) => {
            set({ loading: true })
            const body = {
                total_beginning: totalBeginnig,
                detail_beginning: detail,
                user_id: userId,
                cash_registry_id: cashRegisterId
            }
            try {
                getData(CREATE_BALANCE_BEGINNINGS, POST, body).then((result) => {
                    set({ loading: false })
                    if (result?.code === 200) {
                        // edit state
                        setStatusCashRegister(true)
                        setReadQR(false)
                        onClose()
                    } else {
                        setStatusCashRegister(false)
                    }
                }
                )
            } catch (error) {
                set({ error, loading: false })
            }
        },
        clearState: () => {
            set({ error: null, loading: false })
        }
    })
)

export default useCashBalanceStore
