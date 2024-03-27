/* eslint-disable no-unused-vars */
import { BASE_MARKET_API_URL, AUTH_RENEW } from '../settings/constants'
import { getIsRefreshing, setIsRefreshing, GET } from '../services/http'
import { getToken, setToken } from '@/services/account'

const makeRequest = async (url, method = GET, data = null, fullUrl = false) => {
    const headers = new Headers({
        Authorization: 'Bearer ' + getToken(),
        'Content-Type': 'application/json'
    })
    const options = {
        method,
        headers,
        timeout: 60000 // 1 minute in milliseconds
    }

    if (data) {
        options.body = JSON.stringify(data)
    }
    try {
        return await fetch(`${fullUrl ? '' : BASE_MARKET_API_URL}${url}`, options)
            .then(response => {
                try {
                    if (response?.ok) {
                        return response.json()
                    } else if (response?.status === 401) {
                        return handleUnauthorized(url, method, data)
                    } else {
                        throw new Error('Error en la solicitud: ' + response.status)
                    }
                } catch (err) {
                    return err
                }
            })
    } catch (err) {
        return err
    }
}

const handleUnauthorized = async (url, method, data) => {
    if (!getIsRefreshing()) {
        setIsRefreshing(true)

        return refreshToken()
            .then(newToken => {
                setToken(newToken?.data)
                return makeRequest(url, method, data)
            })
            .catch(error => {
                throw new Error('Error renew Token: ' + error.message)
            })
            .finally(() => {
                setIsRefreshing(false)
            })
    } else {
        console.debug('viene del refresh ', url)
        return waitForRefresh(url, method, data)
    }
}

const waitForRefresh = (url, method, data) => {
    return new Promise(resolve => {
        const checkRefresh = () => {
            if (!getIsRefreshing()) {
                resolve(makeRequest(url, method, data))
            } else {
                setTimeout(checkRefresh, 100)
            }
        }

        checkRefresh()
    })
}

const refreshToken = async () => {
    const token = getToken()
    const headers = new Headers({
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
    })
    const options = {
        headers,
        timeout: 60000 // 1 minute in milliseconds
    }
    try {
        return await fetch(`${AUTH_RENEW}`, options)
            .then(response => {
                try {
                    if (response?.ok) {
                        return response.json()
                    } else if (response?.status === 401) {
                        return response
                    } else {
                        throw new Error('Error en la solicitud: ' + response.status)
                    }
                } catch (err) {
                    return err
                }
            })
    } catch (err) {
        return err
    }
}

export const fetchDataMulti = async (requests) => {
    try {
        const results = await Promise.all(
            requests.map(({ url, method, data }) => makeRequest(url, method, data))
        )
        return results
    } catch (error) {
        console.error('Error en al menos una solicitud:', error)
        throw error
    }
}

export default {
    makeRequest, fetchDataMulti
}
