import { useState, useEffect, ReactNode } from 'react'

const useResize = (node: HTMLElement | null): { width: number, height: number } => {
    const [windowBound, setWindowBound] = useState({
        width: 0,
        height: 0,
    })

    useEffect(() => {
        if (!node) {
            return
        }
        const observe = new ResizeObserver((entries) => {
            const { width, height } = entries[0].contentRect
            setWindowBound({
                width,
                height
            })
        })
        observe.observe(node)
        return () => {
            if (node) {
                observe.unobserve(node)  
            }
        }
    }, [node])

    return windowBound
}