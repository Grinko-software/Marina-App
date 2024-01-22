import { fetchGetUsers, fetchCreateUser } from '@/services/users'

export const requestUserList = async () => {
    try {
        return fetchGetUsers()
    } catch (error) {
        console.log(error)
    }
}

export const requestCreateUser = async ({ name, lastName, email, password }) => {
    try {
        return fetchCreateUser({ name, lastName, email, password })
    } catch (error) {
        console.log(error)
    }
}

export const getDataModelUsers = ({ data }) => {
    return data?.map((item) => {
        return {
            id: item.ID,
            key: item.ID,
            name: item.name,
            lastName: item.last_name,
            fullName: `${item.name} ${item.last_name}`,
            email: item.email,
            type: item?.user_type?.type_name,
            hasCredential: !!item.user_key
        }
    })
}
