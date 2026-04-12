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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const enrichedDataPath = path.join(
	__dirname,
	"../transform/data/t2-product-page.json",
);

async function loadProductsToDatabase() {
	console.log("🚀 Starting Database Seed...\n");

	if (!fs.existsSync(enrichedDataPath)) {
		console.error("❌ CRITICAL ERROR: Could not find enriched_plants.json.");
		process.exit(1);
	}

	const rawProducts: EnrichedPlantData[] = JSON.parse(
		fs.readFileSync(enrichedDataPath, "utf-8"),
	);
	console.log(`📦 Found ${rawProducts.length} products to load.\n`);

	console.log("🧹 Clearing old reviews to prevent duplicates...");
	await prisma.review.deleteMany();

	let successCount = 0;
	let failCount = 0;

	for (let i = 0; i < rawProducts.length; i++) {
		const product = rawProducts[i];
		console.log(
			`⏳ Upserting [${i + 1}/${rawProducts.length}]: ${product.name}`,
		);

		try {
			const stockLevel = product.inStock ? 50 : 0;

			// Changed to prisma.product
			await prisma.product.upsert({
				where: { slug: product.slug },

				// IF IT EXISTS: Update basic info AND new fields
				update: {
					// ✨ NEW EXTRACTED FIELDS
					isPetSafe: product.isPetSafe || false,
					averageRating: product.averageRating || 0,
					totalReviews: product.totalReviews || 0,
					specifications: product.specifications || {},
				},

				// IF IT DOES NOT EXIST: Create it with all relations
				create: {
					shopifyId: product.shopifyId,
					name: product.name,
					slug: product.slug,
					price: product.price,
					compareAtPrice: product.compareAtPrice,
					stockQuantity: stockLevel,
					description: product.description || "",

					// ✨ NEW EXTRACTED FIELDS
					isPetSafe: product.isPetSafe || false,
					averageRating: product.averageRating || 0,
					totalReviews: product.totalReviews || 0,
					specifications: product.specifications || {},

					images: {
						create: product.images.map((img, index: number) => ({
							publicId: img.publicId,
							secureUrl: img.secureUrl,
							width: img.width,
							height: img.height,
							isPrimary: index === 0,
						})),
					},
					categories: {
						connectOrCreate: product.categories.map((scrapedSlug: string) => {
							const customCategoryNames: Record<string, string> = {
								"10-inch-pot": "Large Pot",
								"8-inch-pot": "Medium Pot",
								"aura-planter": "Small Pot",
								"plants-1": "BestSeller",
							};

							const prettyName =
								customCategoryNames[scrapedSlug] ||
								scrapedSlug
									.split("-")
									.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
									.join(" ");
							return {
								where: { slug: scrapedSlug },
								create: {
									name: prettyName,
									slug: scrapedSlug,
								},
							};
						}),
					},

					reviews: {
						create: (product.reviews || []).map((review) => ({
							author: review.author,
							rating: review.rating,
							title: review.title || "",
							body: review.body,
						})),
					},
				},
			});

			successCount++;
		} catch (error) {
			console.error(` ❌ Failed to load ${product.name}. Error:`);
			console.error(error);
			failCount++;
		}
	}

	console.log(`\n✅ DATABASE SEED COMPLETE!`);
	console.log(
		`📊 Stats: ${successCount} successfully loaded, ${failCount} failed.`,
	);
}

loadProductsToDatabase()
	.catch((err) => {
		console.error("FATAL ERROR:", err);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
