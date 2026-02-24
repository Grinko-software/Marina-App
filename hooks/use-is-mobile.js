import { useState, useEffect } from 'react'

/**
 * Custom hook to detect if the current device is mobile
 * Checks both user agent and screen width
 * @param {number} breakpoint - Width breakpoint for mobile (default: 768px)
 * @returns {boolean | null} - True if mobile, false if desktop, null while detecting
 */
export function useIsMobile (breakpoint = 768) {
    // Initialize with null to handle SSR properly
    const [isMobile, setIsMobile] = useState(null)

    useEffect(() => {
        const checkMobile = () => {
            const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
                          window.innerWidth < breakpoint
            setIsMobile(mobile)
        }

        // Check immediately on mount
        checkMobile()

        // Add resize listener
        window.addEventListener('resize', checkMobile)

        return () => window.removeEventListener('resize', checkMobile)
    }, [breakpoint])

    return isMobile
}

export default useIsMobile
