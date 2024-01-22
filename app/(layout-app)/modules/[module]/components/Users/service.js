import { fetchGetUsers, fetchCreateUser } from '@/services/users'

export const requestUserList = async () => {
    try {
        return fetchGetUsers()
    } catch (error) {
        console.log(error)
    }
}

export const requestCreateUser = async ({ name, rut, companyName, companyRut }) => {
    try {
        return fetchCreateUser({ name, rut, companyName, companyRut })
    } catch (error) {
        console.log(error)
    }
}
