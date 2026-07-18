import Image from "next/image";
import Link from "next/link";

export interface CategoryCardProps {
    name: string;
    slug: string;
    productCount: number | null;
    imageSrc: string;
    className?: string; // Prop to adjust layout.

    // change height randomly 
    index?: number 
    isLastOdd?: boolean
}

export function CategoryCard({ 
    name, 
    slug, 
    productCount, 
    imageSrc, 
    className = "" ,
    index = 0,
    isLastOdd = false

}: CategoryCardProps) {
    
    // set size randomly with array : Math.random => Hydration Error: server random num don't match with client/browser vdm. 
    const organicHeights = [240, 340, 220, 360, 280, 310, 260];
    const mobileHeight = organicHeights[index % organicHeights.length]

    return (
        <Link
            href={`/collections/${slug}`}
            // CSS Variable injected for dynamic height
            style={{ '--mobile-h': `${mobileHeight}px` } as React.CSSProperties} // why as seperate style 
            className={`group inline-block break-inside-avoid w-full mb-4 md:mb-0 md:flex-1 relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-gray-100 flex flex-col justify-end p-6 md:p-10 min-h-[var(--mobile-h)] md:!min-h-[400px] ${isLastOdd ? '[column-span:all] mt-2' : ''} ${className}`}
        >
            {/* THE IMAGE LAYER */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={imageSrc}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Deep Scrim Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
            </div>

            {/* TEXT CONTENT */}
            <div className="relative z-10">
                <span className="text-white/70 text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">
                    Explore {productCount} Varieties
                </span>
                <h3 className="text-3xl md:text-4xl font-black italic text-white uppercase tracking-tighter leading-none mb-4">
                    {name}
                </h3>
                <div className="flex items-center gap-2">
                    <span className="h-1 w-0 bg-white group-hover:w-12 transition-all duration-500 ease-in-out" />
                    <span className="text-white text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        Shop Now
                    </span>
                </div>
            </div>
        </Link>
    );
}