import { cn } from "@/utilities/utils"

// Cart Icons
export const DoddleStickerCart = ({ className }: { className?: string }) => {
   return (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 100 100" 
        focusable="false"
        className={cn("w-12 h-12 cursor-pointer hover:-translate-y-1 hover:text-teal-600 transition-all duration-300", className)}
        role="img"
        aria-label="Hand-drawn Shopping Cart"
    >
        <defs>
            <filter id="sticker-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.3" />
            </filter>
            <g id="doodle-cart" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 12 25 C 15 12, 25 15, 28 25 L 35 65 C 32 78, 45 75, 50 75 L 80 75" />
                <path d="M 28 25 C 50 28, 75 25, 90 28 C 85 45, 80 50, 75 60 C 60 62, 45 58, 35 60" />
                <path d="M 31 38 Q 60 40, 86 38" />
                <path d="M 33 48 Q 55 45, 80 50" />
                <path d="M 45 27 Q 43 45, 45 60" />
                <path d="M 60 28 Q 63 45, 58 60" />
                <path d="M 75 29 Q 72 45, 70 60" />
                <circle cx="48" cy="85" r="5" />
                <circle cx="72" cy="85" r="5" />
            </g>
        </defs>
        <use href="#doodle-cart" stroke="#ffffff" strokeWidth="8" filter="url(#sticker-shadow)" />
        <use href="#doodle-cart" stroke="currentColor" strokeWidth="3" />
        <circle cx="48" cy="85" r="1.5" fill="#000000" />
        <circle cx="72" cy="85" r="1.5" fill="#000000" />
    </svg>
    )
}

export const BoutiqueCart = ({ className }: { className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={cn("w-6 h-6 hover:text-[#C15B3D] hover:-translate-y-0.5 cursor-pointer transition-all duration-300", className)}
        role="img"
        aria-label="Plant Shopping Tote"
    >
        <rect x="4" y="8" width="16" height="13" rx="1"></rect>
        <path d="M8 8V6a4 4 0 0 1 8 0v2"></path>
        <path d="M12 18v-6"></path>
        <path d="M12 15c-2-1-3-0.5-3-2 2 0 3 1 3 2z"></path>
        <path d="M12 12c2-1 3-0.5 3-2-2 0-3 1-3 2z"></path>
    </svg>
)
