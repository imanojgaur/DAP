import Image from "next/image";
import Link from "next/link";
import { currentYear } from "@/utilities";

const EDITORIAL_CARDS = [
    {
        id: "manifesto",
        type: "hero",
        layoutClasses: "col-span-2 row-span-2 md:col-span-2 md:row-span-2 min-h-[450px] md:min-h-full", 
        title: "FARM TO DOOR. NO MIDDLEMAN.",
        subtitle: "Direct from Source",
        description: "We ship our plants directly from our climate-controlled greenhouses to your doorstep. No retail markups, no transit stress—just vibrant, healthy greenery at fair prices.",
        linkText: "Read the Manifesto",
        linkHref: "/our-process"
    },
    {
        id: "metrics",
        type: "minimalist",
        layoutClasses: "col-span-1 row-span-1 md:col-span-1 bg-gray-100 hover:bg-gray-200 text-black",
        title: "0%",
        subtitle: "Retail Markups",
        description: "Zero middlemen means we invest margins back into soil quality and careful packaging."
    },
    {
        id: "guarantee",
        type: "led-glow",
        layoutClasses: "col-span-1 row-span-1 md:col-span-1 bg-emerald-950/80 border border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]",
        title: "30-Day",
        subtitle: "Ironclad Guarantee",
        description: "Hand-inspected before shipping. Doesn't arrive happy? We replace it instantly. No questions asked."
    }
];

export function BrandTrustSection() {
    return (
        <section className="px-4 pb-24 md:px-8 max-w-[1600px] mx-auto">
            
            <div className="mb-12 md:mb-16 md:border-b border-gray-200 md:pb-8 flex flex-col md:flex-row md:items-end justify-between md:gap-6 cursor-default group">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="w-8 h-[2px] bg-emerald-500 rounded-full group-hover:w-16 transition-all duration-700"></span>
                        <p className="text-emerald-600 font-bold tracking-[0.3em] uppercase text-xs md:text-sm">
                        {`Editorial // Issue 01`}
                        </p>
                    </div>
                    <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none text-gray-900 group-hover:tracking-tight transition-all duration-700">
                        The Promise.
                    </h2>
                </div>
                
                <div className="flex flex-row justify-between md:flex-col md:items-end w-full md:w-auto mt-8 md:mt-0 pt-6 md:pt-0 border-t border-gray-200 md:border-none gap-2">
                    <div className="flex flex-col md:items-end">
                        <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest mb-1">Published</span>
                        <span className="text-xs md:text-sm text-gray-600 font-bold uppercase tracking-widest">{currentYear}</span>
                    </div>

                    <div className="flex flex-col md:items-end">
                        <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest mb-1">Location</span>
                        <span className="text-xs md:text-sm text-emerald-600 font-bold uppercase tracking-widest flex items-center">
                            <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-sm mr-1.5">DAP</span>
                            Greenhouse HQ
                        </span>
                    </div>

                    <div className="flex flex-col md:items-end">
                        <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest mb-1">Read Time</span>
                        <span className="text-xs md:text-sm text-gray-600 font-bold uppercase tracking-widest">1 Min</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[220px] md:auto-rows-[250px]">
                
                {EDITORIAL_CARDS.map((card) => {
                    if (card.type === "hero") {
                        return (
                            <div key={card.id} className={`group relative overflow-hidden rounded-[2rem] p-6 md:p-12 flex flex-col justify-between border border-gray-200 ${card.layoutClasses}`}>
                                <div className="absolute inset-0 z-0">
                                    <Image 
                                        src="/home/hero/hero-1.avif"
                                        alt="Greenhouse"
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
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
                                    <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-sm mb-6 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-700 delay-100">
                                        {card.description}
                                    </p>
                                </div>

                                <div className="relative z-10">
                                    {/* TEXT SIZE INCREASED HERE */}
                                    <Link href={card.linkHref!} className="inline-flex items-center gap-2 text-white font-bold text-sm md:text-base uppercase tracking-widest hover:text-emerald-400 transition-colors">
                                        <span className="border-b border-white/30 pb-1 group-hover:border-emerald-400">{card.linkText}</span>
                                        <svg aria-hidden="true" className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        );
                    }

                    if (card.type === "minimalist") {
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
                })}
            </div>
        </section>
    );
}