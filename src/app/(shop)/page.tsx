import { CategorySectionWrapper } from "@/components/home/category-section";
import { CategoryCard, type CategoryCardProps } from "@/components/home/category-card";
import { getHomeCategories } from "@/data-sql"
// import { FeaturedProducts } from "@/components/home/featured-products";
import { HomeHero } from "@/components/home/hero";

export default async function HomePage() {
	// Fetch db
	const categories: string[] = ['Deal Of The Day', 'BestSeller', 'Vastu Plants', 'Mood Improving Plants']
	const categoriesdbData = await getHomeCategories(categories);

	//images
	const images = ["/home/deal-of-the-day.webp", "/home/best-seller.avif", "/home/vastu.avif", '/home/mood-boosting.avif']

	//data to map on category card
	const categoriesData: CategoryCardProps[] = []

	return (
		<div className="min-h-screen bg-white">
			{/* 1. Impact Section */}
			<HomeHero />

			{/* 2. Navigation Section: composition pattern: Pending: other things to show */}
			<CategorySectionWrapper>
				{categoriesData.map((cat) => 
					<CategoryCard
						key={cat.name}
						name={cat.name}
						slug={cat.slug}
						productCount={cat.productCount}
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
