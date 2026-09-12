import {
	OverlayText,
	ProductInfo,
	type ProductInfoProps,
} from "@/components/home/card-content";
import { HomeCarousel } from "@/components/home/carousel-wrapper";
import { EditorialLayout } from "@/components/home/editorial-section";
import { HomeHero } from "@/components/home/hero";
// import { getHomeCategories } from "@/data-sql"
import {
	baseCategoryConfig,
	catHeader,
	EDITORIAL_CARDS_DATA,
	edtheader,
	edtMetaData,
	featHeader,
	images,
} from "@/components/home/home.confi";
import { ImageCover } from "@/components/home/image-cover";
import {
	DynamicHorizontalImgRaw,
	type ImageLayoutProps,
} from "@/components/home/img-layout";
import { SectionWrapper } from "@/components/home/section-wrapper";
import {
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { getHomeCategories, getHomeProduct } from "@/data/home";
import { convertIntoRupee } from "@/utilities/price";

interface CategoryConfig {
	title: string;
	slug: string;
	images: ImageLayoutProps[];
	subtitle: string;
	callToActionText: string;
	className?: string;
}

type FeatureProductConfig = Omit<
	ProductInfoProps,
	"className" | "actionsSlot"
> & { images: ImageLayoutProps[] };

export default async function HomePage() {
	// HANDLE CATEGORY DATA AND PASS SAFELY

	//Categories fetch db
	const categorySluges = baseCategoryConfig.map((confiObj) => confiObj.slug);
	const categoriesdbData = await getHomeCategories(categorySluges);

	// category config Object creation
	// -> Create Base Config Obj with images data
	const baseCatConfigWithImg = baseCategoryConfig.map((obj) => {
		const imagesArr = images.find(
			(imgArrItem) => obj.title === imgArrItem[0].alt,
		);

		return {
			...obj,
			images: imagesArr ? imagesArr : [], //fallback if images array is undefined
		};
	});

	// Create final category rendering object
	const categoryConfig: CategoryConfig[] = baseCatConfigWithImg.map(
		(baseObj) => {
			const matchDBResult =
				Array.isArray(categoriesdbData) === true
					? categoriesdbData.find((dbObj) => dbObj.slug === baseObj.slug)
					: null;

			return {
				...baseObj,
				subtitle: matchDBResult?._count.products
					? `Explore ${matchDBResult._count.products} Varities`
					: `Explore Collections`,
				callToActionText: "Shop Now",
			};
		},
	);

	// HANDLE FEATURED PRODUCT DATA
	const featProducts = await getHomeProduct("home");
	const featProductConfig: FeatureProductConfig[] =
		featProducts.length > 0
			? featProducts.map((item) => {
					const currPricePaise = item.price;
					const currPriceRupee = convertIntoRupee(currPricePaise);

					const realPricePaise = item.compareAtPrice;
					const finalComparePrice = realPricePaise
						? realPricePaise === currPricePaise
							? convertIntoRupee(realPricePaise + 5000)
							: realPricePaise
						: convertIntoRupee(currPricePaise + 5000);

					return {
						...item,
						price: currPriceRupee,
						compareAtPrice: finalComparePrice,
						endpoint: item.slug,
						body: [
							`★${item.averageRating}`,
							`${item.totalReviews} Review`,
							`${item?.stockQuantity > 10 ? "In Stock" : `Hurry up ${item.stockQuantity} Left`}`,
							`Ship In ${24} hours`,
						],
						images: item.images.map((image): ImageLayoutProps => {
							return {
								...image,
								sourceType: "cloudinary",
								alt: item.name,
							};
						}),
					};
				})
			: []; // if db return empty array

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
					<CarouselPrevious className="md:absolute z-20 top-1/2 left-8 -translate-y-1/2 flex justify-center items-center disabled:hidden disabled:pointer-events-none" />
					<CarouselNext className="md:absolute z-20 top-1/2 right-8 -translate-y-1/2  flex justify-center items-center disabled:hidden disabled:pointer-events-none" />
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
										className="pl-4 md:pl-8 basis-[100%] sm:basis-[30%] lg:basis-[23%] flex flex-col"
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
