import { USERS_API_URL /* CREATE_USER_API_URL */ } from '@/settings/constants'
import { GET, getData } from './http'

export const fetchGetUsers = async () => {
    try {
        return await getData(USERS_API_URL, GET, null, true)
    } catch {
        return null
    }
}

/* export const fetchCreateUser = async ({ name, rut, ...rest }) => {
    try {
        return await getData(CREATE_USER_API_URL, POST, {
            name
        }).then(response => {
            set({ loading: false, complete: true })
            if (response?.code === 200) {
                notify('✅ Categoría creado con éxito!')
            } else {
                notify('❌ La categoría no fue creado con éxito, intenta otra vez!')
            }
        })
    } catch {
        return null
    }
} */
