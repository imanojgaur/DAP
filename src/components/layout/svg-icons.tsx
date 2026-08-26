export const DoodleStickerSearch = () => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            focusable="false"
            aria-hidden="true"
            role="img"
            className="w-8 h-8 cursor-pointer hover:-translate-y-1 hover:text-teal-600 transition-all duration-300"
        >
            <defs>
                <filter id="search-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="1" dy="1" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.3" />
                </filter>
                <g id="search-doodle" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13.962 16.296a6.716 6.716 0 01-3.462.954 6.728 6.728 0 01-4.773-1.977A6.728 6.728 0 013.75 10.5c0-1.864.755-3.551 1.977-4.773A6.728 6.728 0 0110.5 3.75c1.864 0 3.551.755 4.773 1.977A6.728 6.728 0 0117.25 10.5a6.726 6.726 0 01-.921 3.407c-.517.882-.434 1.988.289 2.711l3.853 3.853" />
                </g>
            </defs>

            {/* Thick white sticker border with shadow */}
            <use href="#search-doodle" stroke="#ffffff" strokeWidth="4" filter="url(#search-shadow)" />
            
            {/* The actual icon, using currentColor so Tailwind Teal works */}
            <use href="#search-doodle" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    )
}

export const HouseSearchIcon = () => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
            strokeLinecap="round" 
            strokeLinejoin="round" 
            aria-label="Search Bar"
            focusable="false"
            className="w-12 h-12 hover:text-teal-600 transition-colors duration-300"
        >
            {/* The House Base and Roof */}
            <path d="M3 10l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <path d="M9 22V12h6v10"></path>
            
            {/* The Chimney */}
            <path d="M17 5V3h3v5"></path>
            
            {/* The Overlapping Magnifying Glass */}
            {/* A white background circle to punch a hole in the house */}
            <circle cx="16" cy="16" r="5" fill="#ffffff" stroke="none" />
            <circle cx="16" cy="16" r="4" fill="none" stroke="currentColor" strokeWidth="1.5"></circle>
            <line x1="22" y1="22" x2="18.8" y2="18.8"></line>
        </svg>
    )
}

export const HandSearchDoodle = () => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 100 100" 
            focusable="false"
            aria-label="Search Bar"
            className="w-24 h-24 hover:scale-105 transition-transform duration-300"
        >
            {/* The Yellow Background Blob */}
            <circle cx="50" cy="50" r="40" fill="#FFF3C4" />

            <g fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {/* The Magnifying Glass Glass */}
                <circle cx="45" cy="35" r="18" fill="#ffffff" />
                
                {/* Action Lines (The little swooshes next to the glass) */}
                <path d="M22 25 Q15 35 25 48" />
                <path d="M18 20 Q8 35 20 52" />

                {/* The Hand Grabbing the Handle */}
                <path d="M40 52 L35 75 Q45 85 55 70" />
                {/* Fingers wrapping around */}
                <path d="M52 50 Q65 48 70 55 Q75 65 55 70" />
                <path d="M50 58 Q60 55 65 60 Q65 65 53 65" />
                <path d="M48 65 Q58 63 60 67 Q60 70 50 72" />
                
                {/* Arm / Wrist lines */}
                <path d="M68 55 Q85 50 95 52" />
                <path d="M55 70 Q75 75 85 82" />
            </g>
        </svg>
    )
}

export const DoddleStickerCart = () => {
   return (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 100 100" 
        focusable="false"
        className="w-12 h-12 cursor-pointer hover:-translate-y-1 hover:text-teal-600 transition-all duration-300"
        role="img"
        aria-label="Hand-drawn Shopping Cart"
    >
        <defs>
            {/* <!-- 1. The Drop Shadow Filter for the Sticker --> */}
            <filter id="sticker-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.3" />
            </filter>

            {/* <!-- 2. The Master Drawing: Grouping all the paths together --> */}
            <g id="doodle-cart" fill="none" strokeLinecap="round" strokeLinejoin="round">
                {/* <!-- Handle and Bottom Chassis --> */}
                <path d="M 12 25 C 15 12, 25 15, 28 25 L 35 65 C 32 78, 45 75, 50 75 L 80 75" />
                
                {/* <!-- Basket Outer Outline --> */}
                <path d="M 28 25 C 50 28, 75 25, 90 28 C 85 45, 80 50, 75 60 C 60 62, 45 58, 35 60" />
                
                {/* <!-- Inside Grid (Slightly wavy horizontal and vertical lines) --> */}
                <path d="M 31 38 Q 60 40, 86 38" />
                <path d="M 33 48 Q 55 45, 80 50" />
                <path d="M 45 27 Q 43 45, 45 60" />
                <path d="M 60 28 Q 63 45, 58 60" />
                <path d="M 75 29 Q 72 45, 70 60" />
                
                {/* <!-- Wheels (Thick circles) --> */}
                <circle cx="48" cy="85" r="5" />
                <circle cx="72" cy="85" r="5" />
            </g>
        </defs>

        {/* <!-- 3. The Magic: Render the thick white background WITH the shadow --> */}
        <use href="#doodle-cart" stroke="#ffffff" strokeWidth="8" filter="url(#sticker-shadow)" />

        {/* <!-- 4. Render the actual black marker lines on top --> */}
        <use href="#doodle-cart" stroke="currentColor" strokeWidth="3" />
        
        {/* <!-- Solid inner dots for the wheels --> */}
        <circle cx="48" cy="85" r="1.5" fill="#000000" />
        <circle cx="72" cy="85" r="1.5" fill="#000000" />
    </svg>
    )
}

export const BoutiqueCart = () => (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            // Look right here! I added the custom clay color #C15B3D
            className="w-6 h-6 hover:text-[#C15B3D] hover:-translate-y-0.5 cursor-pointer transition-all duration-300"
            role="img"
            aria-label="Plant Shopping Tote"
        >
            {/* High-End Boutique Bag Shape */}
            <rect x="4" y="8" width="16" height="13" rx="1"></rect>
            <path d="M8 8V6a4 4 0 0 1 8 0v2"></path>
            
            {/* Central Stem */}
            <path d="M12 18v-6"></path>
            
            {/* Left Leaf */}
            <path d="M12 15c-2-1-3-0.5-3-2 2 0 3 1 3 2z"></path>
            
            {/* Right Leaf */}
            <path d="M12 12c2-1 3-0.5 3-2-2 0-3 1-3 2z"></path>
        </svg>
    )