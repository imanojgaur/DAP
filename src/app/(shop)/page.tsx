import { type EDITORIAL_CARDS_PROPS, EditorialLayout } from "@/components/home/editorial-section";
import type { GlobalRoundEdgeCardProps } from "@/components/home/global-round-edge-card";
import { HomeHero } from "@/components/home/hero";
import { generateCardLayout } from "@/components/home/layout-generator";
import { SectionWrapper, type HeaderData, type MetaDataItem } from "@/components/home/section-wrapper";
import { getHomeCategories } from "@/data-sql"
import { currentYear } from "@/utilities";

export default async function HomePage() {
	
	// 1. Unified Configuration
    const baseCategoryConfig = [
        { slug: 'deal-of-the-day', imageSrc: '/home/deal-of-the-day.webp' },
        { slug: 'plants-1', imageSrc: '/home/best-seller.avif' }, 
        { slug: 'balcony-plants', imageSrc: '/home/balconey5.avif' },
        { slug: 'vastu-plants', imageSrc: '/home/vastu.avif' },
        { slug: 'mood-improving-plants', imageSrc: '/home/mood-boosting.avif' },
        { slug: 'air-purifying-plants', imageSrc: '/home/purify2.avif' },
        { slug: 'indoor-plants', imageSrc: '/home/indoor-plants.avif' }
    ];

	// Fetch db 
	const categorySluges = baseCategoryConfig.map((confiObj) => confiObj.slug)
	const categoriesdbData = await getHomeCategories(categorySluges);

    //create config Object. 
	const categoryCardConfig: GlobalRoundEdgeCardProps[] = baseCategoryConfig.map((baseConfigObj) => {

		const matchDBResult  = Array.isArray(categoriesdbData) === true 
		? categoriesdbData.find((dbPassedObject) => dbPassedObject.slug === baseConfigObj.slug)
		: null;

		return 	{
			title: matchDBResult?.name || "Premium Product",
			subtitle: matchDBResult?.product_count ? 
			`Explore ${matchDBResult.product_count} Varities`
			: `Explore Collections`,
			callToActionText: 'Shop Now',
			slug: matchDBResult?.slug? matchDBResult.slug: '#',
			imageSrc: baseConfigObj.imageSrc,
			className: ""//for dynamic card: make another array..
		}
	});
	
	//Nevigation Of Category Layout. 
	const desktopLayoutPattern = [4,3]
    const mobileRandomImageHeight = [290, 250, 340, 240, 350, 290, 220]; // Left Col sum = 840px | Right Col sum = 840px | Completely unique sizes
	const cardsOnDesktop = 7
	const cardsOnMobile = 6
	

	const layout = generateCardLayout(
		categoryCardConfig,
		desktopLayoutPattern,
		mobileRandomImageHeight,
		cardsOnDesktop,
		cardsOnMobile
	);

	const categoryHeaderData: HeaderData = {
		title: "The Collections",
		description: "Curated greenery for every lifestyle",
		subtitle: "Rare & Handpicked Botanicals",
		hideSubtitleOnMobile: true,
		hideSubtitleOnDesktop: true,
    };

	const EDITORIAL_CARDS_DATA: EDITORIAL_CARDS_PROPS[] = [
		{
			id: "manifesto",
			type: "hero",
			layoutClasses: "min-w-[85vw] shrink-0 snap-center md:min-w-0 col-span-2 row-span-2 md:col-span-2 md:row-span-2 min-h-[450px] md:min-h-full", 
			title: "FARM TO DOOR. NO MIDDLEMAN.",
			subtitle: "Direct from Source",
			description: "We ship our plants directly from our climate-controlled greenhouses to your doorstep. No retail markups, no transit stress—just vibrant, healthy greenery at fair prices.",
			linkText: "Read the Manifesto",
			linkHref: "/our-process"
		},
		{
			id: "metrics",
			type: "minimalist",
			layoutClasses: "min-w-[70vw] shrink-0 snap-center md:min-w-0 col-span-1 row-span-1 md:col-span-1 bg-gray-100 hover:bg-gray-200 text-black",
			title: "0%",
			subtitle: "Retail Markups",
			description: "Zero middlemen means we invest margins back into soil quality and careful packaging."
		},
		{
			id: "guarantee",
			type: "led-glow",
			layoutClasses: "min-w-[75vw] shrink-0 snap-center md:min-w-0 col-span-1 row-span-1 md:col-span-1 bg-emerald-950/80 border border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]",
			title: "30-Day",
			subtitle: "Ironclad Guarantee",
			description: "Hand-inspected before shipping. Doesn't arrive happy? We replace it instantly. No questions asked."
		}
	];
	
	
	const headerData: HeaderData = {
			title: 'The Promise'	
		}
	const metaData: MetaDataItem[] = [
			{label: 'Location', badgeText: 'DAP', value: 'GreenHouse HQ'},
			{label: 'Year', value: `${currentYear}`},
			{label: 'Read Time', value: '1 Min'}
		]
	

	return (
		<div className="min-h-screen bg-white">
			{/* 1. Impact Section */}
			<HomeHero />

			{/* 2. Navigation Section */}
			{categoryCardConfig.length > 0 && 
			( <SectionWrapper headerData={categoryHeaderData}>
				<div className="flex md:flex-col gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                   {layout}
                </div>
			 </SectionWrapper>)}

			{/* 3. Product Discovery Section */}

			{/* 4. Brand Trust / Editorial Section */}
            <EditorialLayout 
			EDITORIAL_CARDS_DATA={EDITORIAL_CARDS_DATA}
			headerData={headerData}
			headerMetaData={metaData}
			 />
		</div>
	);
}
