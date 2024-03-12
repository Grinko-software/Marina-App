import { REPORTS_API_URL, REPORTS_CATEGORY_API_URL, REPORTS_INDICATORS_API_URL, REPORTS_SALES_TYPES_API_URL, REPORTS_CRITICAL_STOCK_API_URL, REPORTS_LAST_SALES_API_URL, REPORTS_SALE_DETAIL_URL } from '@/settings/constants'
import { getToken } from './account'
import { getData } from '@/services/http'
export const fetchGetReportsSales = async ({ periodStart, periodType, periodQuantity }) => {
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

export const fetchGetReportsLastSales = async (limitPage, currentPage) => {
    try {
        return getData(`${REPORTS_LAST_SALES_API_URL}` + '?limit=' + limitPage + '&offset=' + currentPage)
    } catch {
        return null
    }
}

export const fetchGetSaleDatailById = async (saleId) => {
    try {
        return await fetch(`${REPORTS_SALE_DETAIL_URL}/${saleId}`,
            {
                method: 'GET',
                headers: new Headers({
                    Authorization: 'Bearer ' + getToken()
                }),
                cache: 'no-store',
                mode: 'cors'
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

export const fetchGetReportsByCategoty = async ({ periodStart, periodType, periodQuantity }) => {
    try {
        return await fetch(`${REPORTS_CATEGORY_API_URL}`,
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

export const fetchGetReportsIndicators = async ({ periodStart, periodType, periodQuantity }) => {
    try {
        return await fetch(`${REPORTS_INDICATORS_API_URL}`,
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

export const fetchGetReportsSalesTypes = async ({ periodStart, periodType, periodQuantity }) => {
    try {
        return await fetch(`${REPORTS_SALES_TYPES_API_URL}`,
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

export const fetchGetReportsCriticalStock = async () => {
    try {
        return await fetch(`${REPORTS_CRITICAL_STOCK_API_URL}`,
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
