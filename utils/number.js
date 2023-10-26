export const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
})
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
