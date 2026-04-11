"use client";

import { Loader2, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";
import { useEffect, useState } from "react";
// Imports (Inhe apne path ke hisaab se check kar lena)
import { getUnifiedSearchData } from "@/actions";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

// 1. Interfaces
interface SearchPlant {
	id: string;
	name: string;
	slug: string;
	price: number;
	images: {
		publicId: string;
		secureUrl: string;
	}[];
}

interface SearchCategory {
	id: string;
	name: string;
	slug: string;
}

interface SearchData {
	plants: SearchPlant[];
	categories: SearchCategory[];
}

export function SearchBar() {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [data, setData] = useState<SearchData>({
		plants: [],
		categories: [],
	});

	const [query, setQuery] = useState("");

	// 2. Fetching Logic
	useEffect(() => {
		const fetchPlant = async () => {
			if (isOpen && data.plants.length === 0) {
				setIsLoading(true);
				try {
					const fetchedData = await getUnifiedSearchData();
					setData(fetchedData as SearchData);
				} catch (error) {
					console.error("Error Fetching Data", error);
				} finally {
					setIsLoading(false);
				}
			}
		};
		fetchPlant();
	}, [isOpen, data.plants.length]);

	const handleNavigate = (slug: string, type: "product" | "category") => {
		setIsOpen(false);
		setQuery("");
		const path =
			type === "category" ? `/collections/${slug}` : `/products/${slug}`;
		router.push(path);
	};

	// 3. Filter Logic

	const filteredPlants = data.plants
		.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
		.slice(0, 6);

	const filteredCats = data.categories
		.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
		.slice(0, 4);

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<button
					type="button"
					className="flex items-center gap-4 text-sm text-muted-foreground hover:text-foreground bg-slate-100 w-full h-full "
				>
					<Search className="h-5 w-5" />
					<span className="hidden md:inline-block">Search</span>
				</button>
			</SheetTrigger>

			<SheetContent side="top" className="flex w-full justify-center pb-8 pt-5">
				<SheetHeader className="sr-only">
					<SheetTitle>Search Plants Here</SheetTitle>
				</SheetHeader>
				<Command shouldFilter={false} className="w-full max-w-full md:px-10">
					<CommandInput
						placeholder="Search"
						className="h-full w-full  text-xl  md:text-2xl "
						value={query}
						onValueChange={setQuery}
					/>

					<CommandList className="mt-6 max-h-[60vh] overflow-y-auto no-scrollbar">
						{isLoading && (
							<div className="flex items-center justify-center py-10">
								<Loader2 className="h-8 w-8 animate-spin text-primary" />
								<span className="ml-3 text-lg text-muted-foreground">
									Syncing catalog...
								</span>
							</div>
						)}

						{!isLoading &&
							query.length > 0 &&
							filteredPlants.length === 0 &&
							filteredCats.length === 0 && (
								<CommandEmpty className="py-10 text-center text-lg">
									No results found for "{query}".
								</CommandEmpty>
							)}

						{/* --- QUICK LINKS (Default state) --- */}
						{!isLoading && query.length === 0 && (
							<CommandGroup
								heading="Quick Links"
								className="text-muted-foreground"
							>
								<CommandItem
									onSelect={() => handleNavigate("indoor-plants", "category")}
									className="py-4 text-lg cursor-pointer"
								>
									Indoor Plants
								</CommandItem>
								<CommandItem
									onSelect={() => handleNavigate("vastu-plants", "category")}
									className="py-4 text-lg cursor-pointer"
								>
									Vastu Plants
								</CommandItem>
								<CommandItem
									onSelect={() => handleNavigate("best-sellers", "category")}
									className="py-4 text-lg cursor-pointer"
								>
									Best Sellers
								</CommandItem>
							</CommandGroup>
						)}

						{/* --- COLLECTIONS SECTION --- */}
						{!isLoading && filteredCats.length > 0 && query.length > 0 && (
							<CommandGroup
								heading="Collections"
								className="text-muted-foreground"
							>
								{filteredCats.map((cat) => (
									<CommandItem
										key={cat.id}
										onSelect={() => handleNavigate(cat.slug, "category")}
										className="py-3 text-lg cursor-pointer font-semibold text-primary"
									>
										In {cat.name}
									</CommandItem>
								))}
							</CommandGroup>
						)}

						{/* --- PRODUCTS SECTION --- */}
						{!isLoading && filteredPlants.length > 0 && query.length > 0 && (
							<CommandGroup
								heading="Products"
								className="text-muted-foreground mt-4"
							>
								{filteredPlants.map((plant) => (
									<CommandItem
										key={plant.id}
										onSelect={() => handleNavigate(plant.slug, "product")}
										className="flex items-center gap-4 py-3 cursor-pointer"
									>
										{plant.images?.[0] && (
											<div className="relative h-14 w-14 rounded-md overflow-hidden bg-muted border">
												<CldImage
													src={plant.images[0].publicId}
													alt={plant.name}
													fill
													className="object-cover"
												/>
											</div>
										)}
										<div className="flex flex-col">
											<span className="text-lg font-medium text-foreground">
												{plant.name}
											</span>
											<span className="text-sm font-bold text-primary">
												₹{plant.price / 100}
											</span>
										</div>
									</CommandItem>
								))}
							</CommandGroup>
						)}
					</CommandList>
				</Command>
			</SheetContent>
		</Sheet>
	);
}
