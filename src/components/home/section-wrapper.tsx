import { ChevronLeft, ChevronRight } from "lucide-react";
export type MetaDataEffect = 'default' | 'emerald-text' | 'emerald-badge';

export interface MetaDataItem {
    label: string; 
    value: string; 
    badgeText?: string; 
    effect?: MetaDataEffect; 
    hideOnMobile?: boolean; 
    hideOnDesktop?: boolean; 
}

export interface HeaderData {
    title?: string;
    description?: string;
    subtitle?: string;
    hideSubtitleOnMobile?: boolean;
    hideSubtitleOnDesktop?: boolean;
    headerLayoutClass?: string;
    bodyLayoutClass?: string;
}

export function SectionWrapper({ 
    children, 
    headerData,
    metaData = []
}: { 
    children?: React.ReactNode;
    headerData?: HeaderData; 
    metaData?: MetaDataItem[];
}) { 
    const hasMetaData = metaData && metaData.length > 0;

    // BUG FIX 1: Properly handling when BOTH mobile and desktop are hidden
    let subtitleVisClass = "items-center gap-2 bg-emerald-50/50 border border-emerald-100 w-fit px-3 py-1.5 rounded-full";
    
    if (headerData?.hideSubtitleOnMobile && headerData?.hideSubtitleOnDesktop) {
        subtitleVisClass += " hidden"; // Completely hide everywhere
    } else if (headerData?.hideSubtitleOnMobile) {
        subtitleVisClass += " hidden md:flex";
    } else if (headerData?.hideSubtitleOnDesktop) {
        subtitleVisClass += " flex md:hidden";
    } else {
        subtitleVisClass += " flex"; 
    }

    const SubtitleBadge = () => (
        <div className={subtitleVisClass}>
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-800">
                {headerData?.subtitle}
            </span>
        </div>
    );

    return (
        <section className={`relative w-full max-w-[1600px] ${headerData?.bodyLayoutClass}`}>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-3xl opacity-50 -z-10 pointer-events-none" />

            <div className={`group flex flex-col md:flex-row md:items-end justify-between md:mb-3 pb-4 cursor-default ${headerData?.headerLayoutClass}`}>
                
                <div className="flex flex-col max-w-2xl">
                    
                    {/* BUG FIX 2: Removed '!', it should only render on LEFT if hasMetaData is TRUE */}
                    {headerData?.subtitle && hasMetaData && (
                        <div className="mb-3">
                            <SubtitleBadge />
                        </div>
                    )}

                    {headerData?.title && (
                        <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-gray-900 transition-all duration-1000 ease-out group-hover:translate-x-2 group-hover:tracking-tight group-hover:duration-500 group-hover:delay-0 group-hover:text-black">
                            {headerData.title}
                        </h2>
                    )}
                    
                    {headerData?.description && (
                        <p className="flex items-center gap-3 mt-2 md:mt-3 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-gray-500 transition-colors duration-1000 delay-300 group-hover:duration-500 group-hover:delay-0 group-hover:text-emerald-600">
                            <span className="hidden md:block h-[2px] w-6 bg-emerald-500 rounded-full transition-all duration-1000 delay-300 ease-out group-hover:delay-0 group-hover:duration-500 group-hover:w-16 group-hover:bg-emerald-400 group-hover:shadow-[0_0_15px_rgba(52,211,153,1)]"></span>
                            
                            <span className="transition-all duration-1000 delay-300 ease-out group-hover:delay-0 group-hover:duration-500 group-hover:translate-x-3 group-hover:tracking-[0.3em] group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.2)]">
                                {headerData.description}
                            </span>
                        </p>
                    )}
                </div>
                
                <div className={`
                    flex transition-transform duration-1000 delay-300 ease-out group-hover:delay-0 group-hover:duration-500 group-hover:-translate-x-2
                    ${hasMetaData 
                        ? 'flex-row justify-between w-full mt-2 pt-2  border-gray-200 md:flex-col md:items-end md:w-auto md:mt-0 md:pt-0 md:border-none gap-2 md:gap-1.5' 
                        : 'flex-col items-start md:items-end mt-4 md:mt-0 gap-1.5'}
                `}>
                    
                    {hasMetaData ? (
                        metaData.map((item) => {
                            if (item.hideOnMobile && item.hideOnDesktop) return null;

                            let rowVisClass = "flex flex-col items-start md:flex-row md:items-center gap-0.5 md:gap-2";
                            if (item.hideOnMobile) rowVisClass += " hidden md:flex";
                            if (item.hideOnDesktop) rowVisClass += " flex md:hidden";

                            return (
                                <div key={item.label} className={rowVisClass}>
                                    <span className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-widest">
                                        {item.label}
                                        <span className="hidden md:inline">:</span>
                                    </span>
                                    
                                    <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center ${item.effect === 'emerald-text' || item.effect === 'emerald-badge' ? 'text-emerald-600' : 'text-gray-600'}`}>
                                        {item.effect === 'emerald-badge' && item.badgeText && (
                                            <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-sm mr-1.5">
                                                {item.badgeText}
                                            </span>
                                        )}
                                        {item.value}
                                    </span>
                                </div>
                            );
                        })
                    ) : (
                        // If there is no MetaData, Subtitle automatically takes this Right spot!
                        headerData?.subtitle && <SubtitleBadge />
                    )}
                </div>
            </div>
            
            <div className="relative w-full h-full">
                {children}
            </div>
        </section>
    );
}