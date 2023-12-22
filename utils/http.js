import { BASE_MARKET_API_URL } from '../settings/constants'
import { getRequestQueue, getIsRefreshing, setIsRefreshing, GET } from '../services/http'
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

const handleUnauthorized = (url, method, data) => {
    if (!getIsRefreshing()) {
        setIsRefreshing(true)

        return refreshToken()
            .then(newToken => {
                setToken(newToken)
                return processQueue()
            })
            .catch(error => {
                throw new Error('Error renew Token: ' + error.message)
            })
            .finally(() => {
                setIsRefreshing(false)
            })
    } else {
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
    const requestQueue = getRequestQueue()
    const currentRequest = requestQueue.shift()
    if (currentRequest) {
        return currentRequest()
    }
}

const refreshToken = () => {
    // preguntar a niquito
}
export const fetchData = (url, method, data) => {
    const requestQueue = getRequestQueue()
    const request = () => makeRequest(url, method, data)
    requestQueue.push(request)

    if (!getIsRefreshing()) {
        return processQueue()
    }
}
