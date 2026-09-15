// ============================================================================
// IMPORTS (Grouped by domain, inlined per standard print-width rules)
// ============================================================================
import { getCategories, getFeatureProducts } from "@/data/home";
import { baseCategoryConfig, catHeader, EDITORIAL_CARDS_DATA, edtheader, edtMetaData, featHeader } from "@/components/home/home.confi";
import { transformCategories, transformFeatProducts } from "@/components/home/transform-data"

import { HomeHero } from "@/components/home/hero";
import { SectionWrapper } from "@/components/home/section-wrapper";
import { HomeCarousel } from "@/components/home/carousel-wrapper";
import { ImageCover } from "@/components/home/image-cover";
import { EditorialLayout } from "@/components/home/editorial-section";
import { OverlayText, ProductInfo, type ProductInfoProps } from "@/components/home/card-content";
import { DynamicHorizontalImgRaw, type ImageLayoutProps } from "@/components/home/img-layout";
import { CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================
export interface CategoryConfig {
	title: string;
	slug: string;
	images: ImageLayoutProps[];
	subtitle: string;
	callToActionText: string;
	className?: string;
}

export type FeatureProductConfig = Omit<ProductInfoProps, "className" | "actionsSlot"> & { 
	images: ImageLayoutProps[] 
};


// ============================================================================
// MAIN SERVER COMPONENT
// ============================================================================
export default async function HomePage() {
    // ------------------------------------------------------------------------
    // 1. DATA FETCHING (Parallel-ready architecture) & transformation 
    // ------------------------------------------------------------------------
    const categorySluges = baseCategoryConfig.map((confiObj) => confiObj.slug);
    
    // Fetch: Promise.all() for faster parallel fetching
	const [categoriesDbData, featProducts] = await Promise.all([
		await getCategories(categorySluges), 
		await getFeatureProducts("home")
	])

	//Transform
	const categoryConfig: CategoryConfig[] = transformCategories(categoriesDbData)
	const featProductConfig: FeatureProductConfig[] = transformFeatProducts(featProducts)


    // ------------------------------------------------------------------------
    // 2. RENDER UI
    // ------------------------------------------------------------------------
	return (
		<div className="min-h-screen bg-white">
			{/* 1. Impact Section */}
			<HomeHero />

			{/* 2. Navigation Section */}
			<SectionWrapper headerData={catHeader}>
				<HomeCarousel>
					{/* overscroll-x-none: let the embela do its native physics, disably windows/mac native edge bounce effect */}
					{/* slect none is not accidental text highlights: that might conflict with scroll*/}
					<CarouselContent className="flex ml-0 pr-4 md:pr-8 md:pt-6 md:pb-2 overscroll-x-none select-none touch-action-pan-y">
						{categoryConfig?.map((card) => (
							<CarouselItem
								key={card.title}
								className="pl-4 md:pl-8 basis-[50%] sm:basis-[30%] lg:basis-[25%] flex flex-col"
							>
								<ImageCover
									key={card.title}
									endPoint={`/collectons/${card.slug}`}
									className={"h-70 md:h-auto md:aspect-[1/1]"}
									overlayContent={
										<OverlayText
											title={card.title}
											subtitle={card.subtitle}
											callToActionText={card.callToActionText}
										/>
									}
									imgScroller={<DynamicHorizontalImgRaw images={card.images} />}
								/>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className="hidden md:absolute z-20 top-1/2 left-8 -translate-y-1/2 md:flex justify-center items-center disabled:hidden disabled:pointer-events-none" />
					<CarouselNext className="hidden md:absolute z-20 top-1/2 right-8 -translate-y-1/2  md:flex justify-center items-center disabled:hidden disabled:pointer-events-none" />
				</HomeCarousel>
			</SectionWrapper>

			{/* 3. Product Discovery Section */}
			{featProducts.length > 0 && (
				<SectionWrapper headerData={featHeader}>
					<HomeCarousel>
						<CarouselContent className="flex ml-0 pr-4 md:pr-8 md:pt-7 overscroll-x-none select-none touch-action-pan-y">
							{featProductConfig?.map((card) => {
								//Passing primary image src to ProductInfo -> AddToCartButton -> Zustand Store "Items Array"
								const primaryImg = card.images.find(
									(image) => image.isPrimary === true,
								);
								const imgSrc =
									primaryImg?.sourceType === "cloudinary"
										? primaryImg.publicId
										: undefined;

								return (
									<CarouselItem
										key={card.name}
										className="pl-4 md:pl-8 basis-[80%] sm:basis-[30%] lg:basis-[23%] flex flex-col"
									>
										<ImageCover
											key={card.name}
											endPoint={`/products/${card.endpoint}`}
											className={"aspect-[4/5]"}
											imgScroller={
												<DynamicHorizontalImgRaw images={card.images} />
											}
											productFragment={
												<ProductInfo
													id={card.id}
													name={card.name}
													endpoint={card.endpoint}
													body={card.body}
													price={card.price}
													compareAtPrice={card.compareAtPrice}
													imgSrc={imgSrc}
													className=""
												/>
											}
										/>
									</CarouselItem>
								);
							})}
						</CarouselContent>
						<CarouselPrevious className="hidden md:absolute z-20 top-1/2 left-8 -translate-y-1/2 flex justify-center items-center disabled:hidden disabled:pointer-events-none" />
						<CarouselNext className="hidden md:absolute z-20 top-1/2 right-8 -translate-y-1/2  flex justify-center items-center disabled:hidden disabled:pointer-events-none" />
					</HomeCarousel>
				</SectionWrapper>
			)}

			{/* 4. Brand Trust / Editorial Section */}
			<SectionWrapper headerData={edtheader} metaData={edtMetaData}>
				<EditorialLayout EDITORIAL_CARDS_DATA={EDITORIAL_CARDS_DATA} />
			</SectionWrapper>
		</div>
	);
}
