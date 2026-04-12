import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { Product } from "@/types";

// The modern ESM equivalent of __dirname
const __filepath = fileURLToPath(import.meta.url);
const __dirname = dirname(__filepath);

const rootDir = resolve(__dirname, "../../../");

const inputFilePath = join(
	rootDir,
	"etl-pipeline/extract/data/e2-product-page.json",
);
const outputDir = join(rootDir, "etl-pipeline/transform/data");
const outputFilePath = join(outputDir, "t2-product-page.json");

// Helper to generate clean, camelCased object keys
const createCleanKey = (title: string): string => {
	return title
		.replace(/&/g, "And")
		.replace(/['’]/g, "")
		.split(/[^a-zA-Z0-9]+/)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join("");
};

try {
	console.log("⏳ Reading extracted catalog data...");
	const rawData = await readFile(inputFilePath, "utf-8");
	const catalog: Product[] = JSON.parse(rawData);

	console.log("⚙️ Transforming arrays into specification dictionaries...");
	const updatedCatalog = catalog.map((product) => {
		// Check if the old array exists
		if (Array.isArray(product.descriptionInfo)) {
			const specifications: Record<string, string[]> = {};

			for (const section of product.descriptionInfo) {
				if (section.title && section.content) {
					const cleanKey = createCleanKey(section.title);
					specifications[cleanKey] = section.content;
				}
			}

			// Destructure to cleanly remove the old key and inject the new one
			const { descriptionInfo, ...restOfProduct } = product;
			return {
				...restOfProduct,
				specifications,
			};
		}

		return product;
	});

	// Ensure the destination folder actually exists before we try to save
	await mkdir(outputDir, { recursive: true });

	console.log("💾 Saving structured data...");
	await writeFile(
		outputFilePath,
		JSON.stringify(updatedCatalog, null, 2),
		"utf-8",
	);

	console.log(
		`✅ Success! Transformed data pushed to:\n   📁 ${outputFilePath}`,
	);
} catch (error) {
	console.error(
		"❌ Pipeline Error:",
		error instanceof Error ? error.message : String(error),
	);
}
