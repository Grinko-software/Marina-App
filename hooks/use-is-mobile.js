import { useState, useEffect } from 'react'

/**
 * Custom hook to detect if the current device is mobile
 * Checks both user agent and screen width
 * @param {number} breakpoint - Width breakpoint for mobile (default: 768px)
 * @returns {boolean} - True if mobile, false otherwise
 */
export function useIsMobile (breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
                          window.innerWidth < breakpoint
            setIsMobile(mobile)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)

        return () => window.removeEventListener('resize', checkMobile)
    }, [breakpoint])

    return isMobile
}

export default useIsMobile
