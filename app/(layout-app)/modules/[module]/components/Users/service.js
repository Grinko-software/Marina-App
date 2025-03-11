import {
    fetchGetUsers,
    fetchCreateUser,
    fetchUpdateUser,
    resetUserPassword
} from '@/services/users'

export const requestUserList = async () => {
    try {
        return fetchGetUsers()
    } catch (error) {
        console.log(error)
    }
}

export const requestCreateUser = async ({
    name,
    lastName,
    email,
    password
}) => {
    try {
        return fetchCreateUser({ name, lastName, email, password })
    } catch (error) {
        console.log(error)
    }
}

export const requestUpdateUser = async ({
    id,
    name,
    lastName,
    email,
    password,
    notify,
    onSuccess
}) => {
    try {
        return fetchUpdateUser({
            id,
            name,
            lastName,
            email,
            password,
            notify,
            onSuccess
        })
    } catch (error) {
        console.log(error)
    }
}

export const requestResetPassword = async ({ id, notify, onSuccess }) => {
    try {
        return resetUserPassword({ id, notify, onSuccess })
    } catch (error) {
        console.log(error)
    }
}

export const getDataModelUsers = ({ data }) => {
    return data?.map((item) => {
        const credentialData = {
            valid: !!item.user_key,
            code: item?.user_key?.key_code,
            name: item?.user_key?.key_name,
            id: item?.user_key?.ID
        }

        return {
            id: item.ID,
            key: item.ID,
            name: item.name,
            lastName: item.last_name,
            fullName: `${item.name} ${item.last_name}`,
            email: item.email,
            type: item?.user_type?.type_name,
            hasCredential: !!item.user_key,
            password: item.password,
            credential: credentialData?.valid ? credentialData : null
        }
    })
}
