"use client";

import Link from "next/link";
import Image from "next/image"; 
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/constants/routes";
import { currentYear } from "@/lib";

export function HomeHero() {
    return (
        <section className="px-4 pt-4 md:px-8 md:pt-8">
            <div className="relative w-full h-[80vh] md:h-[90vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden group">
                
                {/* Refactor 1: Replaced empty div with optimized Next Image */}
                <Image 
                    src="/home/homeHero.avif" 
                    alt="Bhuteya Plant Hero" 
                    fill
                    priority 
                    className="object-cover transition-transform duration-[2000ms] group-hover:scale-110 z-0"
                />

                {/* Refactor 2: Merged two overlay divs into one complex gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/30 z-10" />

                {/* Refactor 3: Merged the positioning wrapper and width constraint into one div */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-24 w-full max-w-4xl">
                    <span className="text-green-400 font-bold tracking-[0.4em] uppercase text-[10px] md:text-sm mb-6 block animate-in fade-in slide-in-from-bottom-4 duration-700">
                        Est. {currentYear} • Bring Greenery Home
                    </span>

                    <h1 className="text-6xl md:text-[10rem] font-black text-white leading-[0.8] tracking-tighter italic mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        LIFE, <br /> UNTAMED.
                    </h1>

                    <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                        <Button
                            asChild
                            className="rounded-full bg-white text-black hover:bg-gray-200 px-12 h-16 text-xl font-black uppercase tracking-tighter transition-all hover:scale-105 active:scale-95"
                        >
                            <Link href="/featured">Shop Now</Link>
                        </Button>

                        <Button
                            asChild
                            variant="outline"
                            className="rounded-full bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-12 h-16 text-xl font-black uppercase tracking-tighter transition-all"
                        >
                            <Link href={ROUTES.CATEGORIES.INDOOR}>Indoor Plants</Link>
                        </Button>
                    </div>
                </div>

                {/* Decorative Element: Floating Badge */}
                <div className="absolute top-10 right-10 z-20 hidden md:block">
                    <div className="w-32 h-32 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <span className="text-white text-[10px] font-bold text-center uppercase tracking-widest leading-tight">
                            Fresh <br /> Stock <br /> Daily
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}