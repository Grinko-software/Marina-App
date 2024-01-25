import { fetchGetCredentials, fetchCreateCredential, fetchGetCredentialsAssociations } from '@/services/credential'

export const requestCredentialList = async () => {
    try {
        return fetchGetCredentials()
    } catch (error) {
        console.log(error)
    }
}

export const requestCredentialAssociationList = async () => {
    try {
        return fetchGetCredentialsAssociations()
    } catch (error) {
        console.log(error)
    }
}

export const requestCreateCredential = async ({ name, lastName, email, password }) => {
    try {
        return fetchCreateCredential({ name, lastName, email, password })
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
            credential: credentialData?.valid ? credentialData : null
        }
    })
}
