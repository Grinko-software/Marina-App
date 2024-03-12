import { USERS_API_URL, CREATE_USER_API_URL, USER_RESET_PASSWORD } from '@/settings/constants'
import { DELETE, GET, POST, PUT, getData } from './http'

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

export const fetchUpdateUser = ({ id, name, lastName, email, type, password, notify, onSuccess }) => {
    try {
        const queryParams = new URLSearchParams({
            id,
            name: name || '',
            LastName: lastName || '',
            email: email || '',
            Type: type || '',
            password: password || ''
        })
        return getData(`${USERS_API_URL}?${queryParams}`, PUT, undefined, true)
            .then(response => {
                try {
                    if (response?.code === 200) {
                        notify('✅ Usuario actualizado con exito!')
                        if (onSuccess) { onSuccess() }
                    } else {
                        notify('❌ El usuario no se pudo actualizar correctamente, intente mas tarde.')
                    }
                } catch {
                    return null
                }
            })
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

export const resetUserPassword = async ({ id, notify, onSuccess }) => {
    try {
        const queryParams = new URLSearchParams({ id })
        return getData(`${USER_RESET_PASSWORD}?${queryParams}`, PUT, undefined, true)
            .then(response => {
                try {
                    if (response?.code === 200) {
                        notify('✅ Contraseña cambiada con exito, nueva contraseña "MARINA123"!')
                        if (onSuccess) { onSuccess() }
                    } else {
                        notify('❌ No se pudo actualizar la contraseña, intente mas tarde.')
                    }
                } catch {
                    return null
                }
            })
    } catch {
        return null
    }
}
