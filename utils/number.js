export const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
})

export const formatterNumber = (value) => formatter.format((Math.abs(value)))
export const roundValue = (value, decimal, errorValue = '-') => {
    if (value === null || value === undefined) return errorValue
    if (typeof value === 'string') value = Number(value.replaceAll(',', '.'))
    const result = parseFloat(value.toFixed(decimal)).toLocaleString('es-CL')
    return result
}

export const roundValueWithMath = (value, decimal, errorValue = '-') => {
    if (value === null || value === undefined) return errorValue
    if (typeof value === 'string') value = Number(value.replaceAll(',', '.'))
    const result = parseFloat(value.toFixed(decimal))
    const math = Math.round(result)
    return math
}

export const roundPrice = (value) => {
    return Math.round(value / 10) * 10
}

export const roundValueWithUnit = (value, decimal) => {
    let unit = ''
    let valueRound = value

    if (value > 1000000) {
        unit = 'mill.'
        valueRound = value / 1000000
    } else if (value > 1000) {
        unit = 'mil.'
        valueRound = value / 1000
    }

    return {
        value: valueRound?.toFixed(decimal || 1),
        unit,
        originalValue: value
    }
}
export const formatNumberWithPoints = (value, emptyValue = '-', separator = '.') => {
    return (value?.toFixed(0))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator) || emptyValue
}
