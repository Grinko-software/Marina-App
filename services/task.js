import { TAASK_STATE_API_URL, TAASK_TYPE_API_URL } from '@/settings/constants'
import { GET, getData } from './http'

export const fetchGetTaskTypes = async () => {
    try {
        return await getData(TAASK_TYPE_API_URL, GET, null, true)
    } catch {
        return null
    }
}

export const fetchGetTaskStates = async () => {
    try {
        return await getData(TAASK_STATE_API_URL, GET, null, true)
    } catch {
        return null
    }
}
