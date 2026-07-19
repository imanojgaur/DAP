import type { CategoryCardProps } from "@/components/home/category-card";
import { CategorySectionWrapper } from "@/components/home/category-section";
import { HomeHero } from "@/components/home/hero";
import { generateCardLayout } from "@/components/home/layout-generator";
import { getHomeCategories } from "@/data-sql"

export default async function HomePage() {
	
	const categoryNames = [
	'Deal of The Day',
	'BestSeller',
	'Balcony Plants',
	'Vastu Plants',
	'Mood Improving Plants',
	'Air Purifying Plants',
	'Indoor Plants'
	];
    const categoryImages = [
	'/home/deal-of-the-day.webp',
	'/home/best-seller.avif',
	'/home/balconey5.avif',
	'/home/vastu.avif',
	'/home/mood-boosting.avif',
	'/home/purify2.avif',
	'/home/indoor-plants.avif'
	];

	// Fetch db 
	const categoriesdbData = await getHomeCategories(categoryNames);

    //create config Object. 
	const categoryCardConfig: CategoryCardProps[] = categoryNames.map((title, index) => {

		const matchDBResult  = Array.isArray(categoriesdbData) === true 
		? categoriesdbData.find((dbPassedObject) => dbPassedObject.name === title)
		: null;

		return 	{
			title: title,
			subtitle: matchDBResult?.product_count ? 
			`Explore ${matchDBResult.product_count} Varities`
			: `Explore Collections`,
			callToActionText: 'Shop Now',
			slug: matchDBResult?.slug? matchDBResult.slug: '#',
			imageSrc: categoryImages[index],
			className: ""//for dynamic card: make another array..
		}
	});
	
	//Nevigation Of Category Layout. 
	const desktopLayoutPattern = [4, 3]
	// Left Col sum = 840px | Right Col sum = 840px | Completely unique sizes
    const mobileRandomImageHeight = [250, 310, 280, 320, 290, 230, 220];
	const cardsOnDesktop = 7
	const cardsOnMobile = 5
	

	const layout = generateCardLayout(
		categoryCardConfig,
		desktopLayoutPattern,
		mobileRandomImageHeight,
		cardsOnDesktop,
		cardsOnMobile
	);
	
	return (
		<div className="min-h-screen bg-white">
			{/* 1. Impact Section */}
			<HomeHero />

			{/* 2. Navigation Section */}
			{categoryCardConfig.length > 0 && ( <CategorySectionWrapper>{layout}</CategorySectionWrapper>
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
			<section className="px-4 pb-20 md:px-8">
				<div className="bg-black rounded-[2.5rem] p-12 md:p-24 flex flex-col items-center text-center">
					<h2 className="text-white text-4xl md:text-6xl font-black italic tracking-tighter mb-6 leading-none">
						FARM TO DOOR. <br /> NO MIDDLEMAN.
					</h2>
					<p className="text-gray-400 max-w-xl mb-10 text-lg">
						We ship our plants directly from our greenhouse to your doorstep. No
						retail markups, just healthy plants at fair prices.
					</p>
					<button
						type="button"
						className="bg-white text-black px-12 py-4 rounded-full font-bold uppercase tracking-tighter hover:bg-gray-200 transition-colors"
					>
						Learn Our Process
					</button>
				</div>
			</section>
		</div>
	);
}
