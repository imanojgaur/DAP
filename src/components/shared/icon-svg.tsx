// 1. The Heritage / Traditional Option
export function ClassicClusterLogo({ className }: { className?: string }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 160 50" 
            className={className}
            aria-label="DAP Logo"
            role="img"
        >
            <g fill="#1B5E20">
                <path d="M 25 10 C 35 15, 38 25, 30 35 C 20 25, 18 15, 25 10 Z" />
                <path d="M 10 25 C 18 22, 28 28, 25 35 C 15 32, 8 28, 10 25 Z" />
                <path d="M 20 38 C 25 35, 32 38, 28 45 C 22 42, 18 40, 20 38 Z" />
                <path d="M 28 32 Q 22 40 15 45" stroke="#1B5E20" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </g>
            {/* fill is now currentColor */}
            <text x="45" y="38" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="34" fill="currentColor" letterSpacing="-1">
                DAP
            </text>
        </svg>
    )
}


// 2. The Clean, Architectural Option
export function MinimalistStemLogo({ className = "h-8 w-auto" }: { className?: string }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 160 50" 
            className={`cursor-pointer ${className}`}
            role="img"
            aria-label="DAP - Bring Greenery Home"
            fill="none"
        >
            <g stroke="#1B5E20" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M25 45 C25 25, 10 15, 10 5" />
                <path d="M20 30 C5 30, 5 15, 12 12 C18 15, 22 20, 20 30 Z" fill="#2E7D32" opacity="0.1" />
                <path d="M22 20 C35 25, 42 15, 38 5 C32 2, 25 5, 22 20 Z" fill="#2E7D32" opacity="0.1" />
                <path d="M24 35 C32 32, 35 28, 32 25 Z" />
            </g>
            {/* fill is now currentColor */}
            <text x="50" y="36" fill="currentColor" fontSize="34" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.05em">
                DAP
            </text>
            <circle cx="138" cy="30" r="3" fill="#C15B3D" />
        </svg>
    );
}

// 3. The High-End Boutique Option
export function ModernOverlayLogo({ className }: { className?: string }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 180 50" 
            className={className}
            aria-label="DAP Botanicals Logo"
            role="img"
        >
            <g style={{ mixBlendMode: 'multiply' }}>
                <path d="M 20 8 C 35 8, 42 22, 42 38 C 27 38, 20 24, 20 8 Z" fill="#065F46" opacity="0.9"/>
                <path d="M 12 20 C 27 20, 32 32, 32 45 C 17 45, 12 33, 12 20 Z" fill="#10B981" opacity="0.9"/>
            </g>
            {/* fill is now currentColor */}
            <text x="52" y="34" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="32" fill="currentColor" letterSpacing="-1.5">
                DAP
            </text>
            <text x="55" y="44" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="8" fill="#6B7280" letterSpacing="2">
                BOTANICALS
            </text>
        </svg>
    )
}

export function PremiumStickerLogo({ className }: { className?: string }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="-5 -5 190 60" 
            className={className}
            aria-label="DAP Botanicals Logo"
            role="img"
        >
            <defs>
                {/* The Magic 3D Sticker Filter */}
                <filter id="premium-sticker" x="-20%" y="-20%" width="140%" height="140%">
                    <feMorphology in="SourceAlpha" operator="dilate" radius="2.5" result="outline"/>
                    <feFlood floodColor="#ffffff" result="white_fill"/>
                    <feComposite in="white_fill" in2="outline" operator="in" result="white_border"/>
                    <feDropShadow dx="2" dy="3" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.25" result="shadow"/>
                    <feMerge>
                        <feMergeNode in="shadow"/>
                        <feMergeNode in="white_border"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>

            {/* Apply the sticker filter to everything inside this group */}
            <g filter="url(#premium-sticker)">
                {/* The Original Overlapping Leaves */}
                <g style={{ mixBlendMode: 'multiply' }}>
                    <path d="M 20 8 C 35 8, 42 22, 42 38 C 27 38, 20 24, 20 8 Z" fill="#065F46" opacity="0.95"/>
                    <path d="M 12 20 C 27 20, 32 32, 32 45 C 17 45, 12 33, 12 20 Z" fill="#10B981" opacity="0.95"/>
                </g>

                {/* The Premium Text */}
                <text x="52" y="34" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="32" fill="currentColor" letterSpacing="-1.5">
                    DAP
                </text>
                <text x="55" y="44" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="8" fill="#6B7280" letterSpacing="2">
                    BOTANICALS
                </text>
            </g>
        </svg>
    )
}
