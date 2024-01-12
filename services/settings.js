/* eslint-disable camelcase */
import useSettingsStore from '@/stores/settings'
/* GET GENERAL */
import { GET_POST_MACHINE, GET_CASH_REGISTER } from '@/settings/constants'
import { getToken } from '@/services/user'

/* GET GENERAL */

export const GetPostMachines = async () => {
    try {
        console.log(GET_POST_MACHINE)
        return await fetch(GET_POST_MACHINE,
            {
                method: 'GET',
                headers: new Headers({
                    Authorization: 'Bearer ' + getToken(),
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }).then(response => {
            try {
                if (response?.status === 204) {
                    return response
                }
                return response.json()
            } catch {
                return null
            }
        })
    } catch {
        return null
    }
}

export const GetCashRegister = async () => {
    try {
        return await fetch(GET_CASH_REGISTER,
            {
                method: 'GET',
                headers: new Headers({
                    Authorization: 'Bearer ' + getToken(),
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }).then(response => {
            try {
                if (response?.status === 204) {
                    return response
                }
                return response.json()
            } catch {
                return null
            }
        })
    } catch {
        return null
    }
}

export const getDeviceTuu = () => {
    const { selectedPostMachine } = useSettingsStore.getState()
    return selectedPostMachine?.serial_number
}
