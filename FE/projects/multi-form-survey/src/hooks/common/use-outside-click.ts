import { useEffect, useRef } from 'react'

export default function useOutsideClick(callback: () => void) {
    const ref = useRef<HTMLElement>(null)

    useEffect(() => {
        const handleClick = (e: MouseEvent | TouchEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                callback()
            }
        }

        document.addEventListener('mousedown', handleClick)
        document.addEventListener('touchstart', handleClick)

        return () => {
            document.removeEventListener('mousedown', handleClick)
            document.removeEventListener('touchstart', handleClick)
        }
    }, [callback])

    return ref
}
