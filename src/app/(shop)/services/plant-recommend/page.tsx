"use client";

import {
	AlertTriangle,
	CloudRain,
	Droplet,
	Droplets,
	ShieldCheck,
	Sun,
} from "lucide-react";
import { useState } from "react";
import { getPlantRecommendations } from "@/actions";
import { ProductCard } from "@/components/collections/product-card";

// Import our new extracted components
import { OptionCard } from "@/components/services/recommend-plant/option-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function PlantFinderPage() {
	const [preferences, setPreferences] = useState({
		sunlight: "",
		needsPetSafe: null as boolean | null,
		wateringHabit: "",
	});

	const [recommended, setRecommended] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [hasSearched, setHasSearched] = useState(false);

	const updatePref = (key: keyof typeof preferences, value: any) => {
		setPreferences((prev) => ({ ...prev, [key]: value }));
	};

	const handleSearch = async () => {
		setLoading(true);
		setHasSearched(true);

		const response = await getPlantRecommendations({
			sunlight: preferences.sunlight,
			needsPetSafe: preferences.needsPetSafe ?? false,
			wateringHabit: preferences.wateringHabit,
		});

		if (response.success) {
			setRecommended(response.data || []);
		} else {
			console.error(response.error);
		}
		setLoading(false);
	};

	const isFormComplete =
		preferences.sunlight &&
		preferences.needsPetSafe !== null &&
		preferences.wateringHabit;

	return (
		<div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6">
			<div className="max-w-3xl mx-auto space-y-10">
				<div className="text-center space-y-2">
					<h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
						Find Your Perfect Plant
					</h1>
					<p className="text-lg text-gray-500">
						Answer 3 quick questions to get your match.
					</p>
				</div>

				<div className="space-y-8">
					{/* Sunlight */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold flex items-center gap-2">
							<Sun className="text-amber-500 w-5 h-5" /> How much light does
							your space get?
						</h3>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<OptionCard
								title="Low Light"
								description="Shadowy corners, north-facing windows."
								isSelected={preferences.sunlight === "low"}
								onClick={() => updatePref("sunlight", "low")}
							/>
							<OptionCard
								title="Bright Indirect"
								description="Near a sunny window, lots of ambient light."
								isSelected={preferences.sunlight === "bright"}
								onClick={() => updatePref("sunlight", "bright")}
							/>
						</div>
					</div>

					{/* Pets */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold flex items-center gap-2">
							<ShieldCheck className="text-blue-500 w-5 h-5" /> Do you have
							curious pets?
						</h3>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<OptionCard
								title="Yes, Pet-Safe Only"
								description="Keep my dogs and cats safe."
								isSelected={preferences.needsPetSafe === true}
								onClick={() => updatePref("needsPetSafe", true)}
							/>
							<OptionCard
								title="No Pets"
								description="I don't have pets (or they don't eat plants)."
								isSelected={preferences.needsPetSafe === false}
								onClick={() => updatePref("needsPetSafe", false)}
							/>
						</div>
					</div>

					{/* Watering */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold flex items-center gap-2">
							<Droplets className="text-cyan-500 w-5 h-5" /> What's your
							watering style?
						</h3>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<OptionCard
								title={
									<>
										<Droplet className="w-4 h-4" /> Forgetful
									</>
								}
								description="I need a survivor. I often forget to water."
								isSelected={preferences.wateringHabit === "forgetful"}
								onClick={() => updatePref("wateringHabit", "forgetful")}
							/>
							<OptionCard
								title={
									<>
										<CloudRain className="w-4 h-4" /> Helicopter Parent
									</>
								}
								description="I love watering and misting my plants."
								isSelected={preferences.wateringHabit === "frequent"}
								onClick={() => updatePref("wateringHabit", "frequent")}
							/>
						</div>
					</div>
				</div>

				<div className="pt-6">
					<Button
						className="w-full h-14 text-lg bg-green-700 hover:bg-green-800 transition-all"
						disabled={!isFormComplete || loading}
						onClick={handleSearch}
					>
						{loading ? "Searching Database..." : "Find My Match"}
					</Button>
				</div>

				{/* Results */}
				{hasSearched && !loading && (
					<div className="space-y-6 pt-10 border-t">
						<h2 className="text-2xl font-bold">Your Top Matches</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
							{recommended.length > 0 ? (
								recommended.map((plant, idx) => (
									<div key={plant.id} className="relative flex justify-center">
										{idx === 0 && (
											<Badge className="absolute -top-3 -right-3 z-50 bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg scale-110">
												⭐ Best Match
											</Badge>
										)}
										<ProductCard plant={plant} />
									</div>
								))
							) : (
								<div className="col-span-full text-center p-8 bg-gray-50 rounded-xl border">
									<AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
									<h3 className="text-lg font-bold">No perfect match found</h3>
									<p className="text-gray-500">
										Try adjusting your preferences to see more options.
									</p>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
