//(Client Component): Handles the image slider, thumbnails, and zoom functionality.

"use client";

import { CldImage } from "next-cloudinary";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { motion } from "framer-motion"; // 👈 Premium animations

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import type { ImageTypes } from "@/types";

interface ProductGalleryProps {
	images: ImageTypes[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
	if (!images || images.length === 0) {
		return (
			<div className="w-full aspect-square bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100">
				<p className="text-gray-400 font-medium tracking-wide">
					No image available
				</p>
			</div>
		);
	}

	const hasMultipleImages = images.length > 1;

	return (
		// 1. Framer Motion Wrapper: Smooth fade-in and slide-up on page load
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className="w-full max-w-2xl mx-auto"
		>
			<Carousel
				opts={{
					align: "start",
					loop: hasMultipleImages,
					watchDrag: hasMultipleImages,
				}}
				className="w-full relative group" // 'group' lets us hide/show arrows smoothly
			>
				<CarouselContent>
					{images.map((image, index) => (
						<CarouselItem key={image.publicId || index}>
							{/* 2. Upgraded Tailwind: Softer shadows, smoother corners, better hover states */}
							<div className="relative w-full overflow-hidden rounded-2xl bg-gray-50/50 aspect-square border border-black/5 shadow-sm transition-all duration-300 hover:shadow-md">
								<Zoom zoomMargin={40}>
									<CldImage
										src={image.publicId}
										alt={`Product Image ${index + 1}`}
										width={image.width || 800}
										height={image.height || 800}
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										preload={true}
										// 3. Image Scale Animation: Slight zoom effect when they hover over the plant
										className="object-cover w-full h-full object-center transition-transform duration-500 hover:scale-[1.02]"
									/>
								</Zoom>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>

				{hasMultipleImages && (
					// 4. Ghost Arrows: They only appear when the user hovers over the gallery!
					<div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
						<CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm border-none shadow-md hover:bg-white" />
						<CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm border-none shadow-md hover:bg-white" />
					</div>
				)}
			</Carousel>
		</motion.div>
	);
}
