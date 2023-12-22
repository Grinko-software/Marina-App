import useHttpStore from '@/stores/http'

export const updateTokenSystem = () => {
    window.addEventListener('message', (event) => {
        if (event?.data && event?.data?.type === 'refreshToken') {
            const newToken = event.data.token
            localStorage.setItem('token', newToken)
        }
    })
}
export const getBaseUrl = () => {
    const { apiUrl } = useHttpStore.getState()
    return apiUrl
}
export const getRequestQueue = () => {
    const { requestQueue } = useHttpStore.getState()
    return requestQueue
}

export const setRequestQueue = (value) => {
    const { setRequestQueue } = useHttpStore.getState()
    setRequestQueue(value)
}
export const setIsRefreshing = (value) => {
    const { setIsRefreshing } = useHttpStore.getState()
    setIsRefreshing(value)
}
