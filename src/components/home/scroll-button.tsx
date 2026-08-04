'use client'
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react"

export function ChevronMove ({children}:{children:React.ReactNode}) {
    const scrollRef = useRef(null);

    function scrollRight () {
        scrollRef.current.scroll({
            behavior: 'smooth',
            right:'400px'
        });
    }

    function scrollLeft () {
        scrollRef.current.scroll({
            behavior: 'smooth',
            right: '400px'
        })
    }

    return (
        <div className="relative"
        ref = {scrollRef}
        >
            {children}
            <button 
            type="submit" 
            onClick={scrollRight}
            className="absolute bg-white-500 rounded-full w-40px h-auto right-8 bottom-8"
            ><ChevronRight/></button>

            <button 
            type="submit"
            onClick={scrollLeft}
            className='absolute bg-white-500 rounded-full w-400px h-auto left-8 bottom-8'
            ><ChevronLeft /></button>
        </div>
    )

}