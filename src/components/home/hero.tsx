"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/constants/routes";
import { currentYear } from "@/utilities/date";

// Array of premium editorial slides
const HERO_SLIDES = [
	{ src: "/home/hero/hero-1.avif", category: "Wild & Untamed" },
	{ src: "/home/hero/homeHero.avif", category: "Modern Aesthetic" },
	{ src: "/home/hero/hero-3.1.avif", category: "Macro Textures" },
	{ src: "/home/hero/hero-4.2.avif", category: "Minimalist Decor" },
	{ src: "/home/hero/hero-5.2.avif", category: "Golden Sunlight" },
];

const TIMER_DURATION = 2000;

export function HomeHero() {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	// Auto-crossfade magic
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex((prev) => (prev + 1) % HERO_SLIDES.length);
		}, TIMER_DURATION);
		return () => clearInterval(interval);
	}, []);

	return (
		<section className="pb-3">
			<div className="relative w-full h-[90vh] overflow-hidden group bg-black">
				{/* 1. CINEMATIC CROSSFADE BACKGROUNDS */}
				{HERO_SLIDES.map((slide, index) => (
					<Image
						key={slide.src}
						src={slide.src}
						alt={`Premium Plant Hero ${index + 1}`}
						fill
						priority={index === 0}
						className={`
                            object-cover transition-all duration-[1250ms] ease-in-out z-0
                            ${index === currentImageIndex ? "opacity-100 scale-100" : "opacity-0 scale-110"}
                        `}
					/>
				))}

				<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 mix-blend-multiply" />
				<div className="absolute inset-0 bg-black/10 z-10" />

				{/* MAIN CONTENT CONTAINER */}
				<div className="absolute inset-0 z-20 flex flex-col justify-end pb-24 md:pb-24 pt-24 px-8 md:px-24 w-full max-w-5xl">
					<div className="hidden w-fit flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
						<span className="relative flex h-2 w-2">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
							<span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
						</span>
						<span className="text-white font-bold tracking-[0.2em] uppercase text-[10px]">
							Top 1% Quality Plants
						</span>
					</div>

					<span className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)] font-bold tracking-[0.4em] uppercase text-[10px] md:text-sm mb-4 block animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150 fill-mode-both">
						Est. {currentYear} • Bring Greenery Home
					</span>

					<h1 className="text-5xl md:text-[10rem] font-black text-white leading-[0.85] tracking-tighter italic mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both drop-shadow-2xl">
						LIFE, <br /> UNTAMED.
					</h1>

					<div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500 fill-mode-both">
						<Button
							asChild
							className="rounded-full bg-white text-black hover:bg-emerald-500 hover:text-white px-8 md:px-12 h-10 md:h-16 text-lg md:text-xl font-black uppercase tracking-tighter transition-colors duration-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]"
						>
							<Link href={ROUTES.CATEGORIES.INDOOR}>Shop Now</Link>
						</Button>
						<Button
							asChild
							variant="outline"
							className="rounded-full bg-black/20 backdrop-blur-sm border-2 border-white/50 text-white hover:bg-white hover:text-black px-8 md:px-12 h-10 md:h-16 text-lg md:text-xl font-black uppercase tracking-tighter transition-all duration-500"
						>
							<Link href={ROUTES.CATEGORIES.ROOT}>View Your Collections</Link>
						</Button>
					</div>
				</div>

				{/* 4. THE LED PILL SHAPE */}
				<div className="hidden absolute top-85 md:top-12 right-6 md:right-12 z-20 md:block">
					{/* The Pill Container - LED Green Vibe */}
					<div className="relative overflow-hidden rounded-full md:border border-emerald-500/40 bg-emerald-950/40 md:backdrop-blur-md flex flex-col items-center px-6 py-3 md:shadow-[0_0_20px_rgba(16,185,129,0.3)] min-w-[220px]">
						{/* The Text INSIDE the Pill */}
						<div className="relative z-10 flex flex-col items-end">
							{/* Key added here so text animates nicely when it changes */}
							<span
								key={currentImageIndex}
								className="text-emerald-400 text-sm font-black uppercase tracking-widest drop-shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-in fade-in slide-in-from-right-4 duration-500"
							>
								{HERO_SLIDES[currentImageIndex].category}
							</span>
							<span className=" hidden md:text-emerald-100/60 md:text-[9px] md:font-bold md:uppercase md:tracking-[0.3em] md:mt-0.5">
								Featured Collection
							</span>
						</div>
					</div>
				</div>

				{/* 5. ANIMATED SCROLL INDICATOR */}
				<div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-20 flex flex-col items-center gap-4 md:gap-6">
					{/* DESKTOP TEXT: */}
					<span className="hidden md:block text-white/50 text-[9px] font-bold uppercase tracking-[0.3em] [writing-mode:vertical-rl] whitespace-nowrap">
						Scroll
					</span>

					{/* MOBILE TEXT:  */}
					<span className="block md:hidden text-white/50 text-[9px] font-bold uppercase tracking-[0.3em] [writing-mode:vertical-rl] whitespace-nowrap">
						{HERO_SLIDES[currentImageIndex].category}
					</span>

					{/* THE BOUNCING LINE */}
					<div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
						<div className="w-full h-1/2 bg-white absolute top-0 animate-[bounce_2s_infinite]" />
					</div>
				</div>

				{/* SLIDER DOTS */}
				<div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
					{HERO_SLIDES.map((item, index) => {
						return (
							<button
								type="button"
								key={item.src}
								onClick={() => setCurrentImageIndex(index)}
								className={`h-1.5 rounded-full transition-all duration-500 ${
									index === currentImageIndex
										? "w-8 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
										: "w-2 bg-white/40 hover:bg-white/70"
								}`}
								aria-label={`Go to slide ${index + 1}`}
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
}
