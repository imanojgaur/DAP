import Image from "next/image";
import Link from "next/link";
import { getHomeCategories } from "@/actions/home";

export async function CategoryGrid() {
	const categories = await getHomeCategories();

	// Curated high-end lifestyle images for the categories
	const categoryImages = [
		"https://images.unsplash.com/photo-1700219704637-87977308a892?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Large: Modern Minimalist Interior
		"https://images.unsplash.com/photo-1616791151653-a84311a1ae75?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGxhbnQlMjBkZWFsJTIwb2YlMjB0aGUlMjBkYXl8ZW58MHx8MHx8fDA%3D", // Small 1: Deep Green Macro Leaf
		"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000", // Small 2: Cozy Plant Corner
	];

	const styles = [
		"md:col-span-2 md:row-span-2 min-h-[450px]",
		"md:col-span-1 md:row-span-1 min-h-[250px]",
		"md:col-span-1 md:row-span-1 min-h-[250px]",
	];

	return (
		<section className="max-w-[1600px] mx-auto px-4 md:px-8 py-24">
			<div className="flex flex-col mb-12">
				<h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">
					The Collections
				</h2>
				<p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-4">
					Curated greenery for every lifestyle
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6">
				{categories.map((cat, index) => (
					<Link
						href={`collections/${cat.slug}`}
						key={cat.id}
						className={`${styles[index] || ""} group relative overflow-hidden rounded-[2.5rem] bg-gray-100 flex flex-col justify-end p-10`}
					>
						{/* THE IMAGE LAYER */}
						<div className="absolute inset-0 z-0">
							<Image
								src={categoryImages[index] || categoryImages[0]}
								alt={cat.name}
								fill
								className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110"
								priority={index === 0}
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							/>
							{/* Deep Scrim Overlay for text readability */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
						</div>

						{/* TEXT CONTENT */}
						<div className="relative z-10">
							<span className="text-white/70 text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">
								Explore {cat._count.products} Varieties
							</span>
							<h3 className="text-3xl md:text-4xl font-black italic text-white uppercase tracking-tighter leading-none mb-4">
								{cat.name}
							</h3>
							<div className="flex items-center gap-2">
								<span className="h-1 w-0 bg-white group-hover:w-12 transition-all duration-500 ease-in-out" />
								<span className="text-white text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
									Shop Now
								</span>
							</div>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
}
