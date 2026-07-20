import Image from "next/image";
import Link from "next/link";

export interface GlobalRoundEdgeCardProps {
    title: string;
    subtitle: string;
    callToActionText: string;
    slug: string;
    imageSrc: string;
    mobileHeight?: number;
    spanFullColumnOnMobile?: boolean;
    visibilityClasses?: string; 
    className?: string; 
}

export function GlobalRoundEdgeCard({ 
    title, 
    subtitle, 
    callToActionText, 
    slug, 
    imageSrc, 
    mobileHeight = 250,
    spanFullColumnOnMobile = false,
    visibilityClasses = "flex",
    className = "" 
}: GlobalRoundEdgeCardProps) {
 return (
        <Link
            href={`/collections/${slug}`}
            style={{ '--mobile-h': `${mobileHeight}px` } as React.CSSProperties} 
            className={`
                /* 
                  SHARP EDGE FIX: 
                  z-10 aur hover:z-50 se card hamesha baaki cards ke upar aayega 
                  transform-gpu ensure karega ki border-radius render break na ho.
                */
                group relative z-10 hover:z-50 transform-gpu overflow-hidden break-inside-avoid w-full 
                bg-gray-900 flex-col justify-end p-5 md:p-8 
                mb-3 md:mb-0 rounded-[1.5rem] md:rounded-[2.5rem] 
                min-h-[var(--mobile-h)] md:!min-h-[350px] md:flex-1
                
                shadow-lg hover:shadow-[0_0_50px_20px_rgba(16,185,129,0.5)] hover:-translate-y-2 
                transition-all duration-700 ease-out
                
                focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500
                ${spanFullColumnOnMobile ? '[column-span:all] mt-2' : ''} 
                ${visibilityClasses} 
                ${className}
            `}
        >
            <div className="absolute inset-0 z-0">
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover transform-gpu transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 group-hover:backdrop-blur-[2px] transition-all duration-700" />
            </div>

            <div className="relative z-10 transform transition-transform duration-700 ease-out group-hover:-translate-y-2">
                
                <span className="text-white/70 group-hover:text-emerald-400 group-hover:drop-shadow-[0_0_10px_rgba(52,211,153,0.8)] transition-all duration-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-1.5 block">
                    {subtitle}
                </span>
                
                <h3 className="text-2xl md:text-4xl font-black italic text-white uppercase tracking-tighter leading-none mb-3 drop-shadow-lg transition-all duration-1000 delay-300 ease-out group-hover:delay-0 group-hover:duration-500 group-hover:translate-x-2 group-hover:tracking-[0.05em]">
                    {title}
                </h3>
                
                <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
                    <span className="h-[2px] w-0 bg-gradient-to-r from-emerald-400 to-green-300 group-hover:w-10 transition-all duration-500 ease-out rounded-full shadow-[0_0_12px_rgba(52,211,153,1)]" />
                    
                    <span className="flex items-center gap-1 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)] text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-75">
                        {callToActionText}
                        
                        {/* NO BIOME ERRORS HERE */}
                        <svg aria-hidden="true" className="w-3.5 h-3.5 md:w-4 md:h-4 ml-1 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-150" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </span>
                </div>
            </div>
        </Link>
    );
}