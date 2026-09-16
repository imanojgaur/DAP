// ============================================================================
// IMPORTS (Grouped by domain, inlined per standard print-width rules)
// ============================================================================
import { getCategories, getFeatureProducts } from "@/data/home";
import { baseCategoryConfig, EDITORIAL_CARDS_DATA, edtheader, edtMetaData } from "@/components/home/home.confi";

import { HomeHero } from "@/components/home/hero";
import { SectionWrapper } from "@/components/home/section-wrapper";
import { EditorialLayout } from "@/components/home/editorial-section";
import { CategoryCarousel, FeatProductCarousel } from "@/components/home/home-carousel";
import { Suspense } from "react";


// ============================================================================
// MAIN SERVER COMPONENT
// ============================================================================
export default async function HomePage() {
    // ------------------------------------------------------------------------
    // 1. DATA FETCHING (Parallel-ready architecture) & transformation 
    // ------------------------------------------------------------------------
    const categorySluges = baseCategoryConfig.map((confiObj) => confiObj.slug);
    
    // Fetch: parallel fetching for faster TTFP

    const categoriesDbPromise =  getCategories(categorySluges)
    const featProductsDbPromise =  getFeatureProducts("home")

    // ------------------------------------------------------------------------
    // 2. RENDER UI
    // ------------------------------------------------------------------------
	return (
		<div className="min-h-screen bg-white">
			{/* 1. Impact Section */}
			<HomeHero />

			{/* 2. Category Carousel */}
			<Suspense fallback={<CarouselSkeleton />}> 
				<CategoryCarousel catDBRes={categoriesDbPromise} />
			</ Suspense>

			{/* 3. Feature Products Carousel */}
			<Suspense fallback={<CarouselSkeleton />}>
				<FeatProductCarousel featDbRes={featProductsDbPromise} />
			</Suspense>

			{/* 4. Brand Trust / Editorial Section */}
			<SectionWrapper 
				headerData={edtheader} 
				metaData={edtMetaData}
				className="mt-8 md:mt-0 pt-4 md:pt-7 md:px-7 md:pb-11"
   				headerClassName="px-5 md:px-0"
			>
				<EditorialLayout EDITORIAL_CARDS_DATA={EDITORIAL_CARDS_DATA} />
			</SectionWrapper>
		</div>
	);
}
