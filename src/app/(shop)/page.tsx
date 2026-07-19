import type { CategoryCardProps } from "@/components/home/category-card";
import { CategorySectionWrapper } from "@/components/home/category-section";
import { BrandTrustSection } from "@/components/home/editorial-section";
import { HomeHero } from "@/components/home/hero";
import { generateCardLayout } from "@/components/home/layout-generator";
import { getHomeCategories } from "@/data-sql"
import { currentYear } from "@/utilities";
export default async function HomePage() {
	
	// 1. Unified Configuration
    const baseCategoryConfig = [
        { slug: 'deal-of-the-day', imageSrc: '/home/deal-of-the-day.webp' },
        { slug: 'plants-1', imageSrc: '/home/best-seller.avif' }, // Tumhara DB slug 'plants-1' hai
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
	const categoryCardConfig: CategoryCardProps[] = baseCategoryConfig.map((baseConfigObj) => {

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
	// Left Col sum = 840px | Right Col sum = 840px | Completely unique sizes
    const mobileRandomImageHeight = [290, 250, 340, 240, 350, 290, 220];
	const cardsOnDesktop = 7
	const cardsOnMobile = 6
	

	const layout = generateCardLayout(
		categoryCardConfig,
		desktopLayoutPattern,
		mobileRandomImageHeight,
		cardsOnDesktop,
		cardsOnMobile
	);

	const wrapperProps = {
		issue: "Issue 01",
		title: "The Collections",
		description: "Curated greenery for every lifestyle",
		publishedYear: `${currentYear}`,
		location: "DAP Greenhouse HQ",
		readTime: "1 Min"
	};

	return (
		<div className="min-h-screen bg-white">
			{/* 1. Impact Section */}
			<HomeHero />

			{/* 2. Navigation Section */}
			{categoryCardConfig.length > 0 && ( <CategorySectionWrapper headerData={wrapperProps}>{layout}</CategorySectionWrapper>
			)}

			{/* 3. Product Discovery Section */}
			<section className="max-w-7xl mx-auto px-4 py-20">
				<div className="flex justify-between items-end mb-10">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">
							The Latest Drops
						</h2>
						<p className="text-gray-500">Fresh greenery for your collection.</p>
					</div>
				</div>
			</section>

			{/* 4. Brand Trust / Editorial Section */}
             <BrandTrustSection />
		</div>
	);
}
