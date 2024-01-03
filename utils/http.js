/* eslint-disable no-unused-vars */
import { BASE_MARKET_API_URL, AUTH_RENEW } from '../settings/constants'
import { getRequestQueue, getIsRefreshing, setIsRefreshing, setRequestQueueService, GET } from '../services/http'
import { getToken, setToken } from '@/services/user'

const makeRequest = async (url, method = GET, data = null) => {
    const headers = new Headers({
        Authorization: 'Bearer ' + getToken(),
        'Content-Type': 'application/json'
    })
    const options = {
        method,
        headers
    }

    if (data) {
        options.body = JSON.stringify(data)
    }
    try {
        return await fetch(`${BASE_MARKET_API_URL}${url}`, options)
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
                waitForRefresh(url, method, data)
                return processQueue()
            })
            .catch(error => {
                throw new Error('Error renew Token: ' + error.message)
            })
            .finally(() => {
                setIsRefreshing(false)
            })
    } else {
        // console.log(url)
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

const processQueue = () => {
    const currentRequest = getRequestQueue().shift()
    if (currentRequest) {
        return currentRequest()
    }
}

const refreshToken = async () => {
    // preguntar a niquito
    const token = getToken()
    const headers = new Headers({
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
    })
    const options = {
        headers
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
export const fetchData = (url, method, data) => {
    // const requestQueue = getRequestQueue()
    // requestQueue.push(request)
    // const newData = requestQueue.push(request)
    // setRequestQueueService(newData)
    setTimeout(() => { makeRequest(url, method, data) }, [500])

    // console.log(requestQueue)
    if (!getIsRefreshing()) {
        return processQueue()
    }
}
