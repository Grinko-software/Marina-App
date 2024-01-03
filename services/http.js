import useHttpStore from '@/stores/http'
export const GET = 'GET'
export const POST = 'POST'
export const PUT = 'PUT'
export const DELETE = 'DELETE'
export const PATCH = 'PATCH'

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
export const getIsRefreshing = () => {
    const { isRefreshing } = useHttpStore.getState()
    return isRefreshing
}

export const setRequestQueueService = (value) => {
    const { setRequestQueue } = useHttpStore.getState()
    setRequestQueue(useHttpStore.getState().requestQueue, value)
    console.log(useHttpStore.getState().requestQueue)
}
export const setIsRefreshing = (value) => {
    const { setIsRefreshing } = useHttpStore.getState()
    setIsRefreshing(value)
}
