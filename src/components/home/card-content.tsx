'use client'

import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { useCart } from "@/store/cart-store";

export interface OverlayTextProps {
	title: string;
	subtitle: string;
	callToActionText: string;
}

export interface ProductInfoProps {
    name: string,
	endpoint: string,
    body: any[],
	price: number,
	compareAtPrice: number | null,
	actionsSlot?: React.ReactNode
	className?: string, 
}

export function OverlayText({
	title,
	subtitle,
	callToActionText,
}: OverlayTextProps) {
	return (
		<>
			<span className="text-white/70 group-hover:text-emerald-400 group-hover:drop-shadow-[0_0_10px_rgba(52,211,153,0.8)] transition-all duration-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-1.5 block">
				{subtitle}
			</span>

			{/* Heading */}
			<h3 className="transform origin-left text-2xl md:text-4xl font-black italic text-white uppercase tracking-tighter leading-none mb-3 drop-shadow-lg transition-all duration-1000 delay-300 ease-out group-hover:delay-0 group-hover:duration-500 group-hover:translate-x-2 group-hover:scale-105">
				{title}
			</h3>

			{/* {blur out text at hover} */}
			<div className="flex items-center gap-2 md:gap-3 overflow-hidden">
				<span className="h-[2px] w-0 bg-gradient-to-r from-emerald-400 to-green-300 group-hover:w-10 transition-all duration-500 ease-out rounded-full shadow-[0_0_12px_rgba(52,211,153,1)]" />

				<span className="flex items-center gap-1 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)] text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-75">
					{callToActionText}
					<svg
						aria-hidden="true"
						className="w-3.5 h-3.5 md:w-4 md:h-4 ml-1 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-150"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={3}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M14 5l7 7m0 0l-7 7m7-7H3"
						/>
					</svg>
				</span>
			</div>
		</>
	);
}

export function ProductInfo ({
	name,
	endpoint,
	body, 
	price,
	compareAtPrice,
	actionsSlot,
	className,
}:ProductInfoProps){
	return (
		<div className={`${className} group`}>

			{/* image heading */}
		    <Link href={endpoint} className="relative block pb-1">
				<h3 className="font-bold line-clamp-2 text-emerald-400 md:text-gray-900 md:group-hover:text-emerald-500 transition-all duration-300 ease-out">{name}</h3>
			    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-emerald-500 transition-all duration-300 ease-out group-hover:w-full"/>
			</Link>
		
			<Link href={endpoint} className="flex flex-col gap-1 mt-1 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md">
				
				{/* Display body: ratings reviews ... */}
				<div className="flex items-center flex-wrap gap-1 text-sm text-gray-500">
					{body?.map((item, index) => (
					<React.Fragment key={index}>
						{index > 0 && <span className="font-bold">·</span>}
						<span className="text-gray-500">{item}</span> 	
					</React.Fragment>
					))}
				</div>
				
				{/* Price Section */}
				<div className="flex items-center mt-0.5 gap-4">
					<span className="bg-gray-100 px-2.5 py-1.5 font-bold text-gray-500 rounded-full">₹{price}</span>
					<span className="font-bold">·</span>
					{compareAtPrice && <span className="text-gray-500 line-through">₹{compareAtPrice}</span>}
				</div>
			</Link>

			{/* action buttons */}
			{actionsSlot && <div className="mt-3">
		     	{actionsSlot}
			</div>}
		</div>
	)
}

export function AddToCartButton () {

	const increment = useCart((state) => state.addProduct)
	const countState = useCart((state) => state.productCount)
	console.log(countState)

	return (
		<Button 
		size="xs" 
		variant="outline"
		onClick={increment}
		>
			Add To Cart
		</Button>
	)
}