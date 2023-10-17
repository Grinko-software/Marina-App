/* eslint-disable camelcase */
import { getToken } from '@/services/user'
export const fetchGet = async (url) => {
    try {
        return await fetch(url,
            {
                method: 'get',
                headers: new Headers({
                    Authorization: 'Bearer ' + getToken(),
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }).then(response => {
            try {
                return response.json()
            } catch {
                return null
            }
        })
    } catch {
        return null
    }
}
export const fetchPost = async (url, body) => {
    try {
        return await fetch(url,
            {
                method: 'POST',
                headers: new Headers({
                    Authorization: 'Bearer ' + getToken(),
                    'Content-Type': 'application/x-www-form-urlencoded'
                }),
                cache: 'no-store',
                body: JSON.stringify(body)
            }).then(response => {
            try {
                return response.json()
            } catch {
                return null
            }
        })
    } catch {
        return null
    }
}
