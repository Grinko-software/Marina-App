const mobileDevicesArray = [
    'Android',
    'webOS',
    'iPhone',
    'iPad',
    'iPod',
    'BlackBerry',
    'Windows Phone'
]

export const isMobileDevice = () => {
    return mobileDevicesArray.some((device) => {
        return navigator?.userAgent.match(device)
    })
}
