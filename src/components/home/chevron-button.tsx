import { ChevronRight } from "lucide-react";
import { useRef } from "react"

export function ChevronMove ({children}:{children:React.ReactNode}) {
    const scrollRef = useRef(null);

    function scrollRight () {
        scrollRef.current.scroll({
            behavior: 'smooth',
            right:'400px'
        });
    }

    return (
        <div
        ref = {scrollRef}
        >
            {children}
            <button type="submit" onClick={scrollRight}><ChevronRight/></button>
        </div>
    )

}