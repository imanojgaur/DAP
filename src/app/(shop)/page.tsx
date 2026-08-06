import { HomeCarousel } from "@/components/home/carousel-wrapper";
import {
	EditorialLayout,
} from "@/components/home/editorial-section";
import { HomeHero } from "@/components/home/hero";
import { ImageCover, OverlayText } from "@/components/home/image-cover";
import {
	DynamicHorizontalImgRaw,
	type ImageLayoutProps,
} from "@/components/home/img-layout";
import {
	SectionWrapper,
} from "@/components/home/section-wrapper";
import {
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { getHomeCategories, getHomeProduct } from "@/data";
// import { getHomeCategories } from "@/data-sql"
import { images, catHeader, baseCategoryConfig, edtMetaData, edtheader, EDITORIAL_CARDS_DATA } from "@/components/home/home.confi";

interface CategoryConfig {
	title: string;
	slug: string;
	images: ImageLayoutProps[];
	subtitle: string;
	callToActionText: string;
	className?: string;
}

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
	

	return (
		<div className="min-h-screen bg-white">
			{/* 1. Impact Section */}
			<HomeHero />

			{/* 2. Navigation Section */}
			<SectionWrapper headerData={catHeader}>
				<HomeCarousel>
					<CarouselContent className="flex ml-0 pr-4 md:pr-8 py-5">
						{categoryConfig?.map((catObj) => (
							<CarouselItem
								key={catObj.title}
								className="pl-4 md:pl-8 basis-[50%] sm:basis-[30%] lg:basis-[25%]"
							>
								<ImageCover
									key={catObj.title}
									endPoint={`/collectons/${catObj.slug}`}
									className={catObj.className}
									overlayContent={
										<OverlayText
											title={catObj.title}
											subtitle={catObj.subtitle}
											callToActionText={catObj.callToActionText}
										/>
									}
									imgScroller={
										<DynamicHorizontalImgRaw images={catObj.images} />
									}
								/>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className="absolute z-20 top-1/2 left-8 -translate-y-1/2 flex justify-center items-center disabled:opacity-50 disabled:pointer-events-none" />
					<CarouselNext className="absolute z-20 top-1/2 right-8 -translate-y-1/2  flex justify-center items-center disabled:opacity-50 disabled:pointer-events-none" />
				</HomeCarousel>
			</SectionWrapper>

			{/* 3. Product Discovery Section */}

			{/* 4. Brand Trust / Editorial Section */}
			<SectionWrapper headerData={edtheader} metaData={edtMetaData}>
				<EditorialLayout EDITORIAL_CARDS_DATA={EDITORIAL_CARDS_DATA} />
			</SectionWrapper>
		</div>
	);
}
