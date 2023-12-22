import useHttpStore from '@/stores/http'

const makeRequest = (url, token, requestQueue, isRefreshing) => {
    const baseApi = useHttpStore.getState().apiUrl
    return fetch(`${baseApi}${url}`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else if (response.status === 401) {
                return handleUnauthorized(url, token, requestQueue, isRefreshing)
            } else {
                throw new Error('Error en la solicitud: ' + response.status)
            }
        })
}

const handleUnauthorized = (url, token, requestQueue, isRefreshing) => {
    if (!isRefreshing) {
        isRefreshing = true

        return refreshToken()
            .then(newToken => {
                setToken(newToken)
                return processQueue()
            })
            .catch(error => {
                throw new Error('Error renew Token: ' + error.message)
            })
            .finally(() => {
                isRefreshing = false
            })
    } else {
        return waitForRefresh(url)
    }
}
const setToken = (token) => {
    const setToken = useHttpStore.getState().setToken
    setToken(token)
}
const waitForRefresh = (url) => {
    return new Promise(resolve => {
        const checkRefresh = () => {
            if (!apiClient.isRefreshing) {
                resolve(makeRequest(url))
            } else {
                setTimeout(checkRefresh, 100)
            }
        }

        checkRefresh()
    })
}

const processQueue = () => {
    const currentRequest = apiClient.requestQueue.shift()
    if (currentRequest) {
        return currentRequest()
    }
}

const refreshToken = () => {
    // Lógica para renovar el token
    // Devolver la promesa con el nuevo token
    // Asegúrate de manejar cualquier error que pueda ocurrir durante el proceso de renovación.
    // Puedes usar el mismo mecanismo de autenticación que usas para obtener el token inicial.
}
export const fetchData = (url) => {
    const urlStore = useHttpStore.getState().apiUrl
    const requestQueue = useHttpStore.getState().requestQueue
    const isRefreshing = useHttpStore.getState().isRefreshing
    const token = useHttpStore.getState().token

    const request = () => makeRequest(url || urlStore, token, requestQueue, isRefreshing)
    requestQueue.push(request)

    if (!isRefreshing) {
        return processQueue()
    }
}
