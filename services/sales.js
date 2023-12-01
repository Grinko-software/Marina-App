/* eslint-disable camelcase */
import { getToken } from '@/services/user'
import { X_API_KEY_POSMACHINE } from '@/settings/constants'
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
export const fetchPost = async (url, body, notAuth = false, xApiKey = false) => {
    if (notAuth) {
        try {
            return await fetch(url,
                {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json'
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
    } if (xApiKey) {
        try {
            return await fetch('https://integrations.payment.haulmer.com/PaymentRequest/Create',
                {
                    method: 'POST',
                    headers: new Headers({ 'X-API-Key': X_API_KEY_POSMACHINE }),
                    mode: 'no-cors',
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
    } else {
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
}
/*

*/

/*
 method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(body)
*/
