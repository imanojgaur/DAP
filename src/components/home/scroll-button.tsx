'use client'

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react"

export function ChevronMove ({
    children, 
    layoutClass,
    leftChevron,
    rightChevron,
}:{
    children:React.ReactNode, 
    layoutClass?: string,
    leftChevron?: string, 
    rightChevron?: string,
}) {
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
        <div className={`${layoutClass}`} ref = {scrollRef}>
            {children}
            <button 
            type="submit" 
            onClick={scrollRight}
            className={` absolute bg-[#F4F4F4] w-10 flex justify-center items-center h-10 ${rightChevron}`}
            ><ChevronRight /></button>

            <button 
            type="submit"
            onClick={scrollLeft}
            className={`absolute  bg-[#F4F4F4] w-10 flex justify-center items-center h-10 ${leftChevron}`}
            ><ChevronLeft /></button>
        </div>
    )

}