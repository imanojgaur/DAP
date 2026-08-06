"use client";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { Carousel } from "@/components/ui/carousel";

export function HomeCarousel({ children }: { children: React.ReactNode }) {
	return (
		<Carousel
			className="w-full h-full relative"
			opts={{
				align: "start", // start card scrolling at start
				dragFree: true, // ensure native browser scrolling
				slidesToScroll: 1,
			}}
			plugins={[WheelGesturesPlugin()]}
		>
			{children}
		</Carousel>
	);
}
