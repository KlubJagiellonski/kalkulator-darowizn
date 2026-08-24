import { useCallback, useEffect, useRef, useState } from "react"

export function useElementHeight<T extends HTMLElement>() {
    const [height, setHeight] = useState(0)
    const observerRef = useRef<ResizeObserver | null>(null)

    const ref = useCallback((element: T | null) => {
        observerRef.current?.disconnect()
        observerRef.current = null

        if (!element) return

        const observer = new ResizeObserver(([entry]) => {
            setHeight(entry.contentRect.height)
        })

        observer.observe(element)
        observerRef.current = observer
    }, [])

    useEffect(() => {
        return () => observerRef.current?.disconnect()
    }, [])

    return { ref, height }
}