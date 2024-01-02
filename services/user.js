import useAuthStore from '@/stores/user'
export const getToken = () => {
    // const { token } = useAuthStore.getState()
    const tokenLs = localStorage.getItem('token')
    console.log('Token LS: ', tokenLs)
    return tokenLs
    // if (typeof window !== 'undefined') {
    // const tokenLs = localStorage.getItem('token')
    // return tokenLs
    // }  else if (token) {
    //    return token
    // }
}
export const getIdUser = () => {
    const { idUser } = useAuthStore.getState()
    return idUser
}
export const setToken = (token) => {
    const { setToken } = useAuthStore.getState()
    localStorage.setItem('token', token)
    window.postMessage({ type: 'refreshToken', token }, '*')
    setToken(token)
}
