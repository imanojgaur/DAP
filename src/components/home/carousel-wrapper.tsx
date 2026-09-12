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

				skipSnaps: true, // let the momentum die naturally
				containScroll: "trimSnaps", // don't let cards over-scroll leaving empty space at absolute ends
			}}
			plugins={[
				WheelGesturesPlugin(
					{ forceWheelAxis: "x" }, // Ignore vertical trackpad jitter.
				),
			]}
		>
			{children}
		</Carousel>
	);
}
