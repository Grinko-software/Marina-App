import { USERS_API_URL, CREATE_USER_API_URL } from '@/settings/constants'
import { DELETE, GET, POST, getData } from './http'

export const fetchGetUsers = async () => {
    try {
        return await getData(USERS_API_URL, GET, null, true)
    } catch {
        return null
    }
}

export const fetchCreateUser = ({ name, lastName, email, password }) => {
    try {
        return getData(CREATE_USER_API_URL, POST, {
            name,
            last_name: lastName,
            email,
            password
        }, true)
    } catch {
        return null
    }
}
export const deleteUser = async ({ id, notify }) => {
    try {
        const queryParams = new URLSearchParams({ id })
        return getData(`${USERS_API_URL}?${queryParams}`, DELETE, undefined, true)
            .then(response => {
                try {
                    if (response?.code === 200) {
                        notify('✅ Usuario eliminado con exito!')
                    } else {
                        notify('❌ El usuario no se pudo eliminar correctamente, intente mas tarde.')
                    }
                } catch {
                    return null
                }
            })
    } catch {
        return null
    }
}
