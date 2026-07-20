import type { GlobalRoundEdgeCardProps } from "@/components/home/global-round-edge-card";
import { SectionWrapper } from "@/components/home/section-wrapper";
import { BrandTrustSection } from "@/components/home/editorial-section";
import { HomeHero } from "@/components/home/hero";
import { generateCardLayout } from "@/components/home/layout-generator";
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
	const desktopLayoutPattern = [4, 3]
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

	const categoryHeaderData = {
		title: "The Collections",
		description: "Curated greenery for every lifestyle",
		subtitle: "Rare & Handpicked Botanicals",
		hideSubtitleOnMobile: true,
    };

	return (
		<div className="min-h-screen bg-white">
			{/* 1. Impact Section */}
			<HomeHero />

			{/* 2. Navigation Section */}
			{categoryCardConfig.length > 0 && ( <SectionWrapper headerData={categoryHeaderData}>{layout}</SectionWrapper>
			)}

			{/* 3. Product Discovery Section */}

			{/* 4. Brand Trust / Editorial Section */}
             <BrandTrustSection />
		</div>
	);
}
