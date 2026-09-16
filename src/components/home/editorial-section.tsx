import { cn } from "cn"; // Adjust this import to your actual utils path
import Image from "next/image";
import Link from "next/link";

// ============================================================================
// 1. TYPE INTERFACES
// ============================================================================
export interface GuaranteeCardProps {
    id: string;
    type: "led-glow";
    title: string;
    subtitle: string;
    description: string;
    className?: string;
}

export interface MinimalistProps {
    id: string;
    type: "minimalist";
    title: string;
    subtitle: string;
    description: string;
    className?: string;
}

export interface EditorialHeroProps {
    id: string;
    type: "hero";
    subtitle: string;
    title: string;
    description: string;
    linkHref: string;
    linkText: string;
    className?: string;
}

export type EDITORIAL_CARDS_PROPS =
    | EditorialHeroProps
    | MinimalistProps
    | GuaranteeCardProps;

// ============================================================================
// 2. MAIN LAYOUT COMPONENT
// ============================================================================
// This single grid handles both Mobile and Desktop flawlessly.
// We use 'order' classes to shift the Guarantee card to the top-left on mobile,
// while keeping it on the bottom-right on desktop.

export function EditorialLayout({
    EDITORIAL_CARDS_DATA,
}: {
    EDITORIAL_CARDS_DATA: EDITORIAL_CARDS_PROPS[];
}) {
    return (
        <div className="w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 sm:grid-rows-2 gap-0 w-full">
                {EDITORIAL_CARDS_DATA.map((card) => {
                    if (card.type === "hero") {
                        return (
                            <EditorialHero
                                key={card.id}
                                {...card}
                                className="order-3 sm:order-1 col-span-2 sm:row-span-2 min-h-[50vh] sm:min-h-[500px]"
                            />
                        );
                    }

                    if (card.type === "minimalist") {
                        return (
                            <Minimalist
                                key={card.id}
                                {...card}
                                className="order-1 sm:order-2 col-span-1 sm:row-span-1 min-h-[35vh] sm:min-h-[240px]"
                            />
                        );
                    }

                    return (
                        <GuaranteeCard
                            key={card.id}
                            {...card}
                            className="order-2 sm:order-3 col-span-1 sm:row-span-1 min-h-[35vh] sm:min-h-[240px]"
                        />
                    );
                })}
            </div>
        </div>
    );
}

// ============================================================================
// 3. UI COMPONENTS
// ============================================================================
export function EditorialHero({ className, ...card }: EditorialHeroProps) {
    return (
        <div
            className={cn(
                "group relative overflow-hidden flex flex-col justify-between border border-gray-200 p-6 md:p-12",
                className
            )}
        >
            <div className="absolute inset-0 z-0">
                <Image
                    src="/home/hero/hero-3.avif"
                    alt="Greenhouse"
                    fill
                    className="object-cover group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
            </div>

            <div className="relative z-10">
                <span className="inline-block bg-emerald-500 text-white text-[10px] md:text-xs font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-4 sm:mb-6">
                    {card.subtitle}
                </span>
                <h3 className="text-white text-4xl md:text-6xl font-black italic tracking-tighter mb-4 leading-[0.9]">
                    {card.title}
                </h3>
                <p className="px-4 md:px-5 text-gray-300 text-sm md:text-base leading-relaxed max-w-sm mb-6 opacity-80 group-hover:opacity-100 -translate-x-5 group-hover:translate-x-0 transition-all duration-700 delay-100">
                    {card.description}
                </p>
            </div>

            <div className="relative z-10">
                <Link
                    href={card.linkHref || "#"}
                    className="inline-flex items-center gap-2 text-white font-bold text-sm md:text-base uppercase tracking-widest hover:text-emerald-400 transition-colors"
                >
                    <span className="border-b border-white/30 pb-1 group-hover:border-emerald-400">
                        {card.linkText}
                    </span>
                    <svg
                        aria-hidden="true"
                        className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                    </svg>
                </Link>
            </div>
        </div>
    );
}

export function Minimalist({ className, ...card }: MinimalistProps) {
    return (
        <div
            className={cn(
                "group flex flex-col justify-center transition-all duration-500 bg-gray-100 hover:bg-gray-200 text-black p-6 md:p-8",
                className
            )}
        >
            <h3 className="text-6xl md:text-8xl font-black tracking-tighter mb-1 text-black group-hover:scale-105 transition-transform duration-500 origin-left">
                {card.title}
            </h3>
            <h4 className="text-sm md:text-base font-bold uppercase tracking-widest text-gray-500 mb-3">
                {card.subtitle}
            </h4>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed max-w-[250px] hidden sm:block">
                {card.description}
            </p>
        </div>
    );
}

export function GuaranteeCard({ className, ...card }: GuaranteeCardProps) {
    return (
        <div
            className={cn(
                "group flex flex-col justify-center relative overflow-hidden transition-all duration-700 bg-emerald-950/80 border border-emerald-500/50 p-6 md:p-8 shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]",
                className
            )}
        >
            <div
                className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0)",
                    backgroundSize: "16px 16px",
                }}
            />

            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-400/30 rounded-full blur-3xl group-hover:bg-emerald-400/50 transition-colors duration-700" />

            <div className="relative z-10 text-emerald-400 flex items-center justify-start mb-2 group-hover:-translate-y-1 transition-transform duration-500">
                <svg
                    aria-hidden="true"
                    className="w-8 h-8 md:w-10 md:h-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                </svg>
            </div>
            <h4 className="relative z-10 text-white text-base md:text-lg font-bold uppercase tracking-widest mb-1 drop-shadow-md">
                {card.title} <span className="block sm:inline">{card.subtitle}</span>
            </h4>
            <p className="relative z-10 text-xs md:text-sm text-emerald-100/70 leading-relaxed mt-2 group-hover:text-white transition-colors duration-500 hidden sm:block">
                {card.description}
            </p>
        </div>
    );
}