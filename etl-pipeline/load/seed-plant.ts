import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { EnrichedPlantData } from "@/types";

const adapter = new PrismaPg({
	connectionString: process.env.DIRECT_URL,
});

const prisma = new PrismaClient({
	adapter,
});


// Replicate the path logic to find the enriched file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const enrichedDataPath = path.join(
	__dirname,
	"../transform/enriched_plants.json",
);

async function loadPlantsToDatabase() {
	console.log("🚀 Starting Database Seed...\n");

	if (!fs.existsSync(enrichedDataPath)) {
		console.error("❌ CRITICAL ERROR: Could not find enriched_plants.json.");
		process.exit(1);
	}

	const rawPlants: EnrichedPlantData[] = JSON.parse(fs.readFileSync(enrichedDataPath, "utf-8"));
	console.log(`📦 Found ${rawPlants.length} plants to load.\n`);

	let successCount = 0;
	let failCount = 0;

	for (let i = 0; i < rawPlants.length; i++) {
		const plant = rawPlants[i];
		console.log(`⏳ Upserting [${i + 1}/${rawPlants.length}]: ${plant.name}`);

		try {
			// Scrubbing Data: Convert boolean inStock to Int stockQuantity
			const stockLevel = plant.inStock ? 50 : 0;

			await prisma.plant.upsert({
				where: { slug: plant.slug }, // Use slug to check if it exists

				// IF IT EXISTS: Update the basic info
				update: {
					price: plant.price,
					compareAtPrice: plant.compareAtPrice,
					stockQuantity: stockLevel,
				},

				// IF IT DOES NOT EXIST: Create it with all its relations
				create: {
					shopifyId: plant.shopifyId,
					name: plant.name,
					slug: plant.slug,
					price: plant.price,
					compareAtPrice: plant.compareAtPrice,
					stockQuantity: stockLevel,
					description: plant.description || "",

					// Creates the images simultaneously
					images: {
						create: (plant.images).map((img, index: number) => ({
							publicId: img.publicId,
							secureUrl: img.secureUrl,
							width: img.width,
							height: img.height,
							isPrimary: index === 0, // First image becomes primary
						})),
					},
					categories: {
    					connectOrCreate: plant.categories.map((scrapedSlug: string) => {
							// over-ride
							const customCategoryNames: Record<string, string> = {
                                "10-inch-pot": "Large Pot",
                                "8-inch-pot": "Medium Pot",
                                "aura-planter": "Small Pot",
								"plants-1": "BestSeller"
                                // You can easily add more overrides here in the future!
                            };

       						const prettyName = customCategoryNames[scrapedSlug] ||scrapedSlug
           					 	.split('-')
           						.map(word => word.charAt(0).toUpperCase() + word.slice(1))
           						.join(' ');
       						return {
          						where: { slug: scrapedSlug }, 
            					create: { 
             				 	    name: prettyName, 
                					slug: scrapedSlug 
           						},
       					    };
  						}),
					},
				},
			});

			successCount++;
		} catch (error) {
			console.error(` ❌ Failed to load ${plant.name}. Error:`);
			console.error(error);
			failCount++;
		}
	}

	console.log(`\n✅ DATABASE SEED COMPLETE!`);
	console.log(
		`📊 Stats: ${successCount} successfully loaded, ${failCount} failed.`,
	);
}

// Run the engine and cleanly disconnect Prisma when finished
loadPlantsToDatabase()
	.catch((err) => {
		console.error("FATAL ERROR:", err);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
