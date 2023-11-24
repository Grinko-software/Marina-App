import { REPORTS_API_URL } from '@/settings/constants'
import { getToken } from './user'

export const fetchGetReports = async ({ periodStart, periodType, periodQuantity }) => {
    try {
        return await fetch(`${REPORTS_API_URL}`,
            {
                method: 'POST',
                headers: new Headers({
                    Authorization: 'Bearer ' + getToken()
                }),
                cache: 'no-store',
                mode: 'cors',
                body: JSON.stringify({
                    period_start: periodStart,
                    period_type: periodType,
                    period_quantity: periodQuantity
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
