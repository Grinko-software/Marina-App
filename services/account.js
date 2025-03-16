import useAuthStore from '@/stores/user'
export const getToken = () => {
    if (typeof localStorage !== 'undefined') {
        const tokenLs = localStorage.getItem('token')
        return tokenLs
    }
    return null
}
export const getIdUser = () => {
    const { idUser } = useAuthStore.getState()
    return idUser
}
export const getFullNameUser = () => {
    const { fullName } = useAuthStore.getState()
    return fullName
}
export const setToken = (token) => {
    const { setToken } = useAuthStore.getState()
    localStorage.setItem('token', token)
    window.postMessage({ type: 'refreshToken', token }, '*')
    setToken(token)
}
