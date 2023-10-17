export function generateProductCode () {
    const { v4: uuidv4 } = require('uuid')
    const uuid = uuidv4().replace(/-/g, '')
    const numericValue = parseInt(uuid, 16)
    const twelveDigitCode = (numericValue % 1000000000000).toString().padStart(8, '0')
    const code = '780' + twelveDigitCode
    return code
}
