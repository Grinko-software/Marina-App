import { GET, POST, getData } from '@/services/http'
import { AUTH_CODE_API_URL, AUTH_LOGIN_API_URL } from '@/settings/constants'

const getDataAuthenticate = async (response) => {
    const data = {
        user: {
        },
        statusCode: undefined,
        statusText: undefined,
        error: undefined,
        message: undefined
    }

    await response()
        .then(response => {
            if (response?.code === 200) {
                const { token, user_type: userType, user: userData } = response.data

                data.user = {
                    token,
                    userType,
                    name: userData?.name,
                    lastName: userData?.last_name,
                    idUser: userData?.ID
                }
            } else {
                data.error = response?.messages
            }
            data.statusCode = response?.code
            data.message = response?.messages
        })

    return data
}

export async function authenticate ({ email, password }) {
    let data = {}

    try {
        data = await getDataAuthenticate(() => getData(AUTH_LOGIN_API_URL,
            POST,
            {
                email: email || '',
                password: password || ''
            },
            true))
        return data
    } catch {
        return data
    }
}

export async function authenticateByAuthCode ({ authCode }) {
    let data = {}

    try {
        data = await getDataAuthenticate(() => getData(`${AUTH_CODE_API_URL}/${authCode}`, GET, null, true))
        return data
    } catch {
        return data
    }
}
