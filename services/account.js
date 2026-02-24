import useAuthStore from '@/stores/user'

const getSafeLocalStorage = () => {
    if (typeof window === 'undefined') return null

    const storage = window.localStorage
    if (!storage) return null

    if (
        typeof storage.getItem !== 'function' ||
        typeof storage.setItem !== 'function'
    ) {
        return null
    }

    return storage
}

export const getToken = () => {
    const storage = getSafeLocalStorage()
    if (!storage) return null

    try {
        const tokenLs = storage.getItem('token')
        return tokenLs
    } catch {
        return null
    }
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

    const storage = getSafeLocalStorage()
    if (storage) {
        try {
            storage.setItem('token', token)
        } catch {
            // noop
        }
    }

    if (typeof window !== 'undefined') {
        window.postMessage({ type: 'refreshToken', token }, '*')
    }

    setToken(token)
}
