/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getData, GET, POST } from '@/services/http'
import { GET_INDICATORS_LAST_BALANCE, CREATE_BALANCE_BEGINNINGS, CREATE_BALANCE_ENDINGS, GET_INDICATORS_BALANCE_ENDING, CREATE_BALANCE_WITH_DRAWALS, OPEN_DRAWER_API_URL } from '@/settings/constants'
const useCashBalanceStore = create(
    (set) => ({
        error: null,
        loading: false,
        getLastIndicatorsCashBalanceEnding: (id, setLastBalance, handlerOpenDrawer) => {
            set({ loading: true })
            try {
                getData(GET_INDICATORS_LAST_BALANCE.replace(':id', id), GET).then((result) => {
                    set({ loading: false })
                    if (result?.code === 200) {
                        handlerOpenDrawer()
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
        getIndicatorsBalanceEnding: (id, setIndicatorsBalanceEnding, handlerOpenDrawer) => {
            set({ loading: true })
            try {
                getData(GET_INDICATORS_BALANCE_ENDING.replace(':id', id), GET).then((result) => {
                    set({ loading: false })
                    if (result?.code === 200) {
                        handlerOpenDrawer()
                        setIndicatorsBalanceEnding(result?.data)
                    } else {
                        setIndicatorsBalanceEnding(null)
                    }
                }
                )
            } catch (error) {
                set({ error, loading: false })
            }
        },
        createBalanceBeginnings: (cashRegisterId, userId, detail, totalBeginnig, setStatusCashRegister, notify, onHandleState) => {
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
                    onHandleState()
                }
                )
            } catch (error) {
                set({ error, loading: false })
            }
        },
        createBalanceEndings: (cashRegisterId, userId, detail, totalEndingRealCashBalance, totalEndingNominalCashBalance, totalEndingCard, setStatusCashRegister, onhandlerAcctions, notify) => {
            set({ loading: true })
            const body =
            {
                total_ending_real_cash_balance: totalEndingRealCashBalance,
                total_ending_nominal_cash_balance: totalEndingNominalCashBalance,
                total_ending_card: totalEndingCard,
                detail_ending: detail,
                user_id: userId,
                cash_registry_id: cashRegisterId
            }
            try {
                getData(CREATE_BALANCE_ENDINGS, POST, body).then((result) => {
                    set({ loading: false })
                    if (result?.code === 200) {
                        // edit state
                        setStatusCashRegister(true)
                        notify('✅ Cierre de Caja Nº ' + cashRegisterId + ' con éxito!')
                    } else if (result?.message === 'Error en la solicitud: 400') {
                        setStatusCashRegister(false)
                        notify('❌ Primero se debe efectuar el incio de caja Nº ' + cashRegisterId + ', antes de efectuar un cierre de caja.')
                    } else {
                        setStatusCashRegister(false)
                        notify('❌ ' + result?.message)
                    }
                    onhandlerAcctions()
                }
                )
            } catch (error) {
                set({ error, loading: false })
            }
        },
        createDepositOrWithdrawalCashBalance: (cashRegisterId, userId, detail, total, setStatusCashRegister, onhandlerAcctions, notify, handlerOpenDrawer, eventType) => {
            set({ loading: true })
            const body =
            {
                total,
                user_id: userId,
                cash_registry_id: cashRegisterId,
                detail,
                event_type: eventType
            }
            try {
                getData(CREATE_BALANCE_WITH_DRAWALS, POST, body).then((result) => {
                    set({ loading: false })
                    if (result?.code === 200) {
                        setStatusCashRegister(true)
                        if (eventType === 'income') {
                            notify('✅ Ingreso de efectivo a Caja Nº ' + cashRegisterId + ' con éxito!')
                        } else {
                            notify('✅ Retiro de efectivo Caja Nº ' + cashRegisterId + ' con éxito!')
                        }
                        handlerOpenDrawer()
                    } else {
                        setStatusCashRegister(false)
                        notify('❌ ' + result?.message)
                    }
                    onhandlerAcctions()
                }
                )
            } catch (error) {
                set({ error, loading: false })
            }
        },
        openDrawer: (cashRegisterId, notify, body) => {
            try {
                getData(OPEN_DRAWER_API_URL, POST, body, true).then((result) => {
                    if (result?.code === 200) {
                        notify('✅ Caja Nº ' + cashRegisterId + ' abierta')
                    } else {
                        notify('❌ ' + result?.message)
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
