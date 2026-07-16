import { CategorySectionWrapper } from "@/components/home/category-section";
import { CategoryCard } from "@/components/home/category-card";
import { HomeHero } from "@/components/home/hero";
import { getHomeCategories } from "@/data-sql"

export interface CategoryCardData {
    name: string;
    slug?: string;
    productCount?: number;
    imageSrc: string;
    className?: string; // Prop to adjust layout.
}

export default async function HomePage() {
	
	const categoriesCardConfig: CategoryCardData[] = [
		{name: 'Deal of The Day', imageSrc: '/home/deal-of-the-day.webp', className: ''},
		{name: 'BestSeller', imageSrc: '/home/best-seller.avif', className: ''},
		{name: 'Vastu Plants', imageSrc: '/home/vastu.avif', className: ''},
		{name: 'Mood Improving Plants', imageSrc: '/home/mood-boosting.avif'}
	]

	// Fetch db 
	const categoriesdbData = await getHomeCategories([
		categoriesCardConfig[0].name,
		 categoriesCardConfig[1].name,
		  categoriesCardConfig[2].name,
		   categoriesCardConfig[3].name
		]);

	// type narrowing 
	if(Array.isArray(categoriesdbData)){
		for (let i = 0; i < categoriesCardConfig.length; i++){
			const object = categoriesCardConfig[i]
			object.productCount = categoriesdbData[i].product_count
			object.slug = categoriesdbData[i].slug
		}
	} else {
		return <div>{categoriesdbData.message}</div>
		// notFound() // pending
	}
	
	return (
		<div className="min-h-screen bg-white">
			{/* 1. Impact Section */}
			<HomeHero />

			{/* 2. Navigation Section: composition pattern: Pending: other things to show */}
			<CategorySectionWrapper>
				{categoriesCardConfig.map((cat) => 
					<CategoryCard
						key={cat.name}
						name={cat.name}
						slug={cat.slug as string}
						productCount={cat.productCount as number}
						className={cat.className}
						imageSrc={cat.imageSrc}
					/>
				)}
				</CategorySectionWrapper>

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

				{/* <FeaturedProducts /> */}
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
