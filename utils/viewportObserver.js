import { useEffect, useState } from 'react'

export function useIsInViewport ({ ref, setStatus }) {
    const [isIntersecting, setIsIntersecting] = useState(false)

    if (ref?.current) {
        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting)
            if (entry.isIntersecting) {
                observer.unobserve(entry.target)
            }
        })

        observer.observe(ref.current)
    }

    useEffect(() => {
        setStatus(isIntersecting)
    }, [isIntersecting])

    return isIntersecting
}
