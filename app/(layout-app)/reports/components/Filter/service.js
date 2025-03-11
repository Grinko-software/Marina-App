import {
    fetchGetReportsSales,
    fetchGetReportsByCategoty,
    fetchGetReportsIndicators,
    fetchGetReportsSalesTypes,
    fetchGetReportsCriticalStock
} from '@/services/reports'
import { getMoment } from '@/utils/date'
export const equivalentDateUnit = {
    daily: 'day',
    weekly: 'week',
    monthly: 'month',
    quarterly: 'quarter',
    yearly: 'year'
}

export const equivalentBackendDateUnit = {
    daily: 'Day',
    weekly: 'Week',
    monthly: 'Month',
    quarterly: 'Trimester',
    biyearly: 'Semester',
    yearly: 'Year',
    Day: 'daily',
    Week: 'weekly',
    Month: 'monthly',
    Trimester: 'quarterly',
    Semester: 'biyearly',
    Year: 'yearly'
}

export const formatDateUnit = {
    daily: 'DD/MMM',
    weekly: 'W° [semana] Y',
    monthly: 'MMM/Y',
    quarterly: 'Q° [trimestre] Y',
    // biyearly: '', // not supported by momentjs
    yearly: 'YYYY'
}

export const translationDateUnit = {
    daily: 'día',
    weekly: 'semana',
    monthly: 'mes'
}

export const dataRangeTypes = [
    {
        label: 'Diario',
        value: 'daily'
    },
    {
        label: 'Semanal',
        value: 'week'
    },
    {
        label: 'Mensual',
        value: 'month'
    }
]

export const getTranslationDateUnit = (unit) => {
    return translationDateUnit[unit]
}

export const getFormatDateUnit = (date, format, unit) => {
    const formatUnit = formatDateUnit[unit]
    return getMoment(date, format).format(formatUnit)
}

export const getEquivalentDateUnit = (rangeType) =>
    equivalentDateUnit[rangeType]

export const getEquivalentBackendDateUnit = (type) =>
    equivalentBackendDateUnit[type]

/**
 *
 * @param {Moment} date datetime
 * @param {boolean} startFrom if the date starts or ends from it
 * @param {string} rangeType on of 'day', 'week', 'month', 'quarter', 'biyear', 'year
 * @param {number} rangeValue amout of rangeType units to move forward or move backward
 * @returns an array of from - to pairs
 */

// Range types
export const getDateTypes = async () => {
    return Promise.resolve(dataRangeTypes)
}

export const mapDateQuantityProperties = (x) => {
    return {
        value: x,
        label: `${x}`
    }
}

export const requestDataSales = async (from, rangeType, periodQuantity) => {
    try {
        return fetchGetReportsSales({
            periodStart: from,
            periodType: rangeType,
            periodQuantity
        })
    } catch (error) {
        console.log(error)
    }
}
export const requestDataByCategory = async (
    from,
    rangeType,
    periodQuantity
) => {
    try {
        return fetchGetReportsByCategoty({
            periodStart: from,
            periodType: rangeType,
            periodQuantity
        })
    } catch (error) {
        console.log(error)
    }
}

export const requestDataIndicators = async (
    from,
    rangeType,
    periodQuantity
) => {
    try {
        return fetchGetReportsIndicators({
            periodStart: from,
            periodType: rangeType,
            periodQuantity
        })
    } catch (error) {
        console.log(error)
    }
}

export const requestDatSalesTypes = async (from, rangeType, periodQuantity) => {
    try {
        return fetchGetReportsSalesTypes({
            periodStart: from,
            periodType: rangeType,
            periodQuantity
        })
    } catch (error) {
        console.log(error)
    }
}

export const requestDataCriticalStore = async (
    from,
    rangeType,
    periodQuantity
) => {
    try {
        return fetchGetReportsCriticalStock({
            periodStart: from,
            periodType: rangeType,
            periodQuantity
        })
    } catch (error) {
        console.log(error)
    }
}
