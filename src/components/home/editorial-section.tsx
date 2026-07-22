import Image from "next/image";
import Link from "next/link";

export interface GuaranteeCardProps{
    id: string, 
    type?: 'led-glow',
    layoutClasses?: string, 
    title: string,
    subtitle: string,
    description: string,
}
export interface MinimalistProps{
    id: string,
    type?: "minimalist",
    layoutClasses: string,
    title: string,
    subtitle: string,
    description: string
}
export interface EditorialHeroProps{
    id: string, 
    type?: 'hero',
    layoutClasses?: string,
    subtitle: string, 
    title: string, 
    description: string, 
    linkHref: string,
    linkText: string, 
}

export type EDITORIAL_CARDS_PROPS = EditorialHeroProps | MinimalistProps | GuaranteeCardProps

export function EditorialLayout({
    EDITORIAL_CARDS_DATA, 
}:{
    EDITORIAL_CARDS_DATA: EDITORIAL_CARDS_PROPS[],
}
) {
    return (

        <div >
            
            {EDITORIAL_CARDS_DATA.map((card) => {
                if (card.type === "hero") {
                    return (
                        <EditorialHero 
                        key={card.type}
                        id={card.id}
                        title={card.title}
                        subtitle={card.subtitle}
                        description={card.description}
                        linkHref={card.linkHref}
                        linkText={card.linkText}
                        layoutClasses={card.layoutClasses}
                        />
                    );
                }
                
                if (card.type === "minimalist") {
                    return (
                        <Minimalist
                        key={card.type}
                        id={card.id}
                        title={card.title}
                        subtitle={card.subtitle}
                        description={card.subtitle}
                        layoutClasses={card.layoutClasses}
                        />
                    );
                }
                
                return (
                    <GuaranteeCard
                    key={card.type}
                    id={card.id}
                    title={card.title}
                    description={card.description}
                    subtitle={card.subtitle}
                    layoutClasses={card.layoutClasses}
                    />
                );
            })}
        </div>
    );
}


export function EditorialHero(card: EditorialHeroProps){
    return ( 
        <div key={card.id} className={`group relative overflow-hidden rounded-[2rem] p-6 md:p-12 flex flex-col justify-between border border-gray-200 ${card.layoutClasses}`}>
            <div className="absolute inset-0 z-0">
                <Image 
                    src="/home/hero/hero-1.avif"
                    alt="Greenhouse"
                    fill
                    className="object-cover group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
            </div>

            <div className="relative z-10">
                {/* TEXT SIZE INCREASED HERE */}
                <span className="inline-block bg-emerald-500 text-white text-[10px] md:text-xs font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-6">
                    {card.subtitle}
                </span>
                <h3 className="text-white text-4xl md:text-6xl font-black italic tracking-tighter mb-4 leading-[0.9]">
                    {card.title}
                </h3>
                {/* TEXT SIZE INCREASED HERE */}
                <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-sm mb-6 opacity-80 group-hover:opacity-100 -translate-x-5 group-hover:translate-x-0 transition-all duration-700 delay-100">
                    {card.description}
                </p>
            </div>

            <div className="relative z-10">
                {/* TEXT SIZE INCREASED HERE */}
                <Link href={card.linkHref || '#'} className="inline-flex items-center gap-2 text-white font-bold text-sm md:text-base uppercase tracking-widest hover:text-emerald-400 transition-colors">
                    <span className="border-b border-white/30 pb-1 group-hover:border-emerald-400">{card.linkText}</span>
                    <svg aria-hidden="true" className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}


export function Minimalist (card: MinimalistProps){
    return (
        <div key={card.id} className={`group rounded-[2rem] p-6 md:p-8 flex flex-col justify-center transition-all duration-500 ${card.layoutClasses}`}>
            <h3 className="text-6xl md:text-8xl font-black tracking-tighter mb-1 text-black group-hover:scale-105 transition-transform duration-500 origin-left">
                {card.title}
            </h3>
            {/* TEXT SIZE INCREASED HERE */}
            <h4 className="text-sm md:text-base font-bold uppercase tracking-widest text-gray-500 mb-3">
                {card.subtitle}
            </h4>
            {/* TEXT SIZE INCREASED HERE */}
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed max-w-[250px]">
                {card.description}
            </p>
        </div>
    );
}


export function GuaranteeCard (card: GuaranteeCardProps){
    return (
        <div key={card.id} className={`group rounded-[2rem] p-6 md:p-8 flex flex-col justify-center relative overflow-hidden transition-all duration-700 ${card.layoutClasses}`}>
            <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500" 
                    style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0)', backgroundSize: '16px 16px' }} />
            
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-400/30 rounded-full blur-3xl group-hover:bg-emerald-400/50 transition-colors duration-700" />

            <div className="relative z-10 text-emerald-400 mb-2 group-hover:-translate-y-1 transition-transform duration-500">
                <svg aria-hidden="true" className="w-8 h-8 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            </div>
            {/* TEXT SIZE INCREASED HERE */}
            <h4 className="relative z-10 text-white text-base md:text-lg font-bold uppercase tracking-widest mb-1 drop-shadow-md">
                {card.title} <span className="block md:inline">{card.subtitle}</span>
            </h4>
            {/* TEXT SIZE INCREASED HERE */}
            <p className="relative z-10 text-xs md:text-sm text-emerald-100/70 leading-relaxed mt-2 group-hover:text-white transition-colors duration-500">
                {card.description}
            </p>
        </div>
    );
}