'use client'

import { useState, useEffect } from "react"

export function useMediaQuery (query: string) {
    const [isMedia, setMediaChange] = useState(false)

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query)
        const handleChange = (e:MediaQueryListEvent) => setMediaChange(e.matches)

        setMediaChange(mediaQueryList.matches)
        mediaQueryList.addEventListener("change", handleChange)

        // Importance of cleaning up event: if user nevigate back and forth between home page and checkout or open close drawer, 
        // there will we many even listner attached to window global object creating memory leak
        // passing exact reference to function object in memory only removes event specifying type of event [windows.matchMedia(query).remove("change", handlerReference)]
        return () => {
            mediaQueryList.removeEventListener("change", handleChange)
        }
    }, [query])
    
    return isMedia 
}