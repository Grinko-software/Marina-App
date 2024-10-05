import { CREATE_TAASK_TYPE_API_URL_URL, TAASK_STATE_API_URL, TAASK_TYPE_API_URL, TAASK_DIFFUCULT_API_URL } from '@/settings/constants'
import { GET, getData } from './http'
import { getToken } from './account'

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

export const fetchGetTaskDifficult = async () => {
    try {
        return await getData(TAASK_DIFFUCULT_API_URL, GET, null, true)
    } catch {
        return null
    }
}

export const fetchCreateTaskType = async ({ name }) => {
    try {
        return await fetch(`${CREATE_TAASK_TYPE_API_URL_URL}`,
            {
                method: 'POST',
                headers: new Headers({
                    Authorization: 'Bearer ' + getToken()
                }),
                cache: 'no-store',
                mode: 'cors',
                body: JSON.stringify({
                    type_name: name
                })
            }).then(response => {
            try {
                return response.json()
            } catch {
                return null
            }
        })
    } catch {
        return null
    }
}
