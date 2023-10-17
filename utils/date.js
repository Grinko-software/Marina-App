import moment from 'moment-timezone'
export const DEFAULT_FORMAT = 'YYYY-MM-DDTHH:mm:ss'

moment.defineLocale('es', { week: { dow: 1 } })
export const today = () => moment()

export const getCurrentYear = () => today().year()

export const getMoment = (value, format = DEFAULT_FORMAT) =>
    moment(value, format)
