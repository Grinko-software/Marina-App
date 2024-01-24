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
        createBalanceBeginnings: (cashRegisterId, userId, detail, totalBeginnig, setStatusCashRegister, setReadQR, onClose, notify) => {
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
                        notify('✅ Inicio de Caja Nº ' + cashRegisterId + ' con éxito!')
                    } else if (result?.message === 'Error en la solicitud: 400') {
                        setStatusCashRegister(false)
                        notify('❌ Primero se debe efectuar el cierre de la caja Nº ' + cashRegisterId + ', antes de efectuar el inicio de caja')
                    } else {
                        setStatusCashRegister(false)
                        notify('❌ ' + result?.message)
                    }
                    setReadQR(false)
                    onClose()
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
