import useAuthStore from '@/stores/user'
export const getToken = () => {
    const { token } = useAuthStore.getState()
    return token
}
export const getIdUser = () => {
    const { idUser } = useAuthStore.getState()
    return idUser
}
