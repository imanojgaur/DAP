import Image from "next/image";
import Link from "next/link";

export interface CategoryCardProps {
    title: string;
    subtitle: string;
    callToActionText: string;
    slug: string;
    imageSrc: string;
    mobileHeight?: number;
    spanFullColumnOnMobile?: boolean;
    visibilityClasses?: string; // Accepts classes like 'hidden md:flex' based on limits
    className?: string; 
}

export function CategoryCard({ 
    title, 
    subtitle, 
    callToActionText, 
    slug, 
    imageSrc, 
    mobileHeight = 250,
    spanFullColumnOnMobile = false,
    visibilityClasses = "flex", // Default to showing on all screens
    className = "" 
}: CategoryCardProps) {
    return (
        <Link
            href={`/collections/${slug}`}
            // CSS Variable injected safely for dynamic mobile heights
            style={{ '--mobile-h': `${mobileHeight}px` } as React.CSSProperties} 
            className={`
                group relative overflow-hidden break-inside-avoid w-full 
                bg-gray-100 flex-col justify-end p-6 md:p-10 
                mb-4 md:mb-0 rounded-[1.5rem] md:rounded-[2.5rem] 
                min-h-[var(--mobile-h)] md:!min-h-[400px] md:flex-1
                ${spanFullColumnOnMobile ? '[column-span:all] mt-2' : ''} 
                ${visibilityClasses} 
                ${className}
            `}
        >
            {/* THE IMAGE LAYER */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
            </div>

            {/* TEXT CONTENT */}
            <div className="relative z-10">
                <span className="text-white/70 text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">
                    {subtitle}
                </span>
                <h3 className="text-3xl md:text-4xl font-black italic text-white uppercase tracking-tighter leading-none mb-4">
                    {title}
                </h3>
                <div className="flex items-center gap-2">
                    <span className="h-1 w-0 bg-white group-hover:w-12 transition-all duration-500 ease-in-out" />
                    <span className="text-white text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {callToActionText}
                    </span>
                </div>
            </div>
        </Link>
    );
}   