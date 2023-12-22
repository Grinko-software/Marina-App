import useAuthStore from '@/stores/user'
export const getToken = () => {
    if (typeof window !== 'undefined') {
        const tokenLs = localStorage.getItem('token')
        return tokenLs
    }
    return null
}
export const getIdUser = () => {
    const { idUser } = useAuthStore.getState()
    return idUser
}
export const setToken = (token) => {
    const { setToken: setTokenStore } = useAuthStore.getState()
    localStorage.setItem('token', token)
    window.postMessage({ type: 'refreshToken', token }, '*')
    setTokenStore(token)
}
