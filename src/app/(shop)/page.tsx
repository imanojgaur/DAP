import { OverlayText, ProductInfo, type ProductInfoProps } from "@/components/home/card-content";
import { HomeCarousel } from "@/components/home/carousel-wrapper";
import { EditorialLayout } from "@/components/home/editorial-section";
import { HomeHero } from "@/components/home/hero";
// import { getHomeCategories } from "@/data-sql"
import {
	baseCategoryConfig,
	catHeader,
	featHeader, 
	EDITORIAL_CARDS_DATA,
	edtheader,
	edtMetaData,
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
import { getHomeCategories, getHomeProduct } from "@/data";

interface CategoryConfig {
	title: string;
	slug: string;
	images: ImageLayoutProps[];
	subtitle: string;
	callToActionText: string;
	className?: string;
}

type FeatureProductConfig = Omit<ProductInfoProps, 'className' | 'actionsSlot'> & {images: ImageLayoutProps[]}

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
				className: "", //for dynamic card: make another array..haha
			};
		},
	);

	// HANDLE FEATURED PRODUCT DATA AND PASS SAFELY
	const featProducts = await getHomeProduct("home");
	const featProductConfig: FeatureProductConfig [] = featProducts.map((item)=>{
	    return {
			...item,
			endpoint: item.slug,  
			body: [`⭐${item.averageRating}`, `review ${item.totalReviews}`, `${item.stockQuantity? "In Stock": null}`],
			images: item.images.map((image): ImageLayoutProps => {
				return { 
					...image, 
					sourceType: 'cloudinary', 
					alt: item.name, 
				}})
		} 
	})

	return (
		<div className="min-h-screen bg-white">
			{/* 1. Impact Section */}
			<HomeHero />

			{/* 2. Navigation Section */}
			<SectionWrapper headerData={catHeader}>
				<HomeCarousel>
					<CarouselContent className="flex ml-0 pr-4 md:pr-8 py-5">
						{categoryConfig?.map((card) => (
							<CarouselItem
								key={card.title}
								className="pl-4 md:pl-8 basis-[50%] sm:basis-[30%] lg:basis-[25%]"
							>
								<ImageCover
									key={card.title}
									endPoint={`/collectons/${card.slug}`}
									className={card.className}
									overlayContent={
										<OverlayText
											title={card.title}
											subtitle={card.subtitle}
											callToActionText={card.callToActionText}
										/>
									}
									imgScroller={
										<DynamicHorizontalImgRaw images={card.images} />
									}
								/>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className="md:absolute z-20 top-1/2 left-8 -translate-y-1/2 flex justify-center items-center disabled:opacity-50 disabled:pointer-events-none" />
					<CarouselNext className="md:absolute z-20 top-1/2 right-8 -translate-y-1/2  flex justify-center items-center disabled:opacity-50 disabled:pointer-events-none" />
				</HomeCarousel>
			</SectionWrapper>

			{/* 3. Product Discovery Section */}
			<SectionWrapper headerData={featHeader} >
				<HomeCarousel>
					<CarouselContent className="flex ml-0 mb-20 pr-4 md:pr-8 py-7">
						{featProductConfig?.map((card)=>(
							<CarouselItem 
							key={card.name}
							className="pl-4 md:pl-8 basis-[100%] sm:basis-[30%] lg:basis-[23%]"
							>
								<ImageCover key={card.name}
								endPoint={`/products/${card.endpoint}`} 
								className={''}
								imgScroller={<DynamicHorizontalImgRaw images={card.images}/>}
								productFragment={
								<ProductInfo  
									name={card.name}
									endpoint={card.endpoint}
									body={card.body}
									price={card.price}
									compareAtPrice={card.compareAtPrice}
									className=""
								/>
							    }
								/>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className="hidden md:absolute z-20 top-1/2 left-8 -translate-y-1/2 flex justify-center items-center disabled:hidden disabled:pointer-events-none"/>
					<CarouselNext className="hidden md:absolute z-20 top-1/2 right-8 -translate-y-1/2  flex justify-center items-center disabled:hidden disabled:pointer-events-none"/>
				</HomeCarousel>
			</SectionWrapper>
			{/* 4. Brand Trust / Editorial Section */}
			<SectionWrapper headerData={edtheader} metaData={edtMetaData}>
				<EditorialLayout EDITORIAL_CARDS_DATA={EDITORIAL_CARDS_DATA} />
			</SectionWrapper>
		</div>
	);
}
