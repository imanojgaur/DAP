// This is to notify that this script is missing types to be specified.
// for future refrence, Make their types settle first.

import { EnrichedProductType, ReviewType } from "@/types";
import fs from "node:fs/promises";
import { chromium } from "playwright";

// 1. ETL Specific Types
export type Variant = {
    id: string;
    title: string;
    sku: string;
    price: number;
    compareAtPrice: number | null;
    isAvailable: boolean;
    swatchUrl?: string;
};

export type DescriptionSection = {
    title: string;
    content: string[];
};

// 2. The exact shape of the data COMING OUT of the browser
interface ExtractedPageData {
    averageRating: number;
    totalReviews: number;
    isPetSafe: boolean;
    variants: Variant[];
    reviews: ReviewType[];
    descriptionInfo: DescriptionSection[];
}

// 3. The FINAL shape that gets saved to the JSON file
export interface FinalStructuredProduct extends EnrichedProductType {
    averageRating: number;
    totalReviews: number;
    isPetSafe: boolean;
    variants: Variant[];
    reviews: ReviewType[];
    descriptionInfo: DescriptionSection[];
}

async function scrapeStructuredProductData() {
    console.log("📦 Loading enriched.json...");
    let catalog: EnrichedProductType[] = [];
    try {
        const rawData = await fs.readFile(
            "./etl-pipeline/transform/enriched_plants.json",
            "utf-8",
        );
        catalog = JSON.parse(rawData);
        console.log(`✅ Loaded ${catalog.length} products.`);
    } catch (err) {
        console.error("❌ CRITICAL: Could not read enriched_plants.json.", err);
        process.exit(1);
    }

    const browser = await chromium.launch({ headless: false, slowMo: 50 });
    const context = await browser.newContext({
        userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
    });
    const page = await context.newPage();

    const finalCatalog: FinalStructuredProduct[] = [];

    // This will hold the redundant data (like refund policies) so it doesn't bloat your DB
    const globalSharedData: Record<string, string[]> = {};

    // Change this loop back to catalog.length when ready
    for (let i = 0; i < catalog.length; i++) {
        const product = catalog[i];
        console.log(
            `\n🚚 [${i + 1}/${catalog.length}] Extracting smart data: ${product.name}...`,
        );

        // THE FIX: A helper function to generate fallback data if a scrape fails.
        // This ensures TypeScript is happy because we ALWAYS return a complete FinalStructuredProduct.
        const getFallbackData = (): FinalStructuredProduct => ({
            ...product,
            averageRating: 0,
            totalReviews: 0,
            isPetSafe: false,
            variants: [],
            reviews: [],
            descriptionInfo: [],
        });

        if (!product.productUrl) {
            console.log("⚠️ No productUrl found, skipping...");
            finalCatalog.push(getFallbackData());
            continue;
        }

        try {
            await page.goto(product.productUrl, {
                waitUntil: "domcontentloaded",
                timeout: 60000,
            });
            await page.waitForSelector(".product-text", { timeout: 15000 });

            console.log("📜 Scrolling to hydrate elements...");
            await page.evaluate(async () => {
                await new Promise<void>((resolve) => {
                    let totalHeight = 0;
                    const distance = 400;
                    const timer = setInterval(() => {
                        const scrollHeight = document.body.scrollHeight;
                        window.scrollBy(0, distance);
                        totalHeight += distance;
                        if (totalHeight >= scrollHeight) {
                            clearInterval(timer);
                            resolve();
                        }
                    }, 250);
                });
            });

            await page.waitForTimeout(2000);

            // THE FIX: Use 'as ExtractedPageData' instead of generic brackets to stop parsing errors
            const extractedDetails = await page.evaluate(() => {
                let averageRating = 0;
                let totalReviews = 0;
                const reviewBadge = document.querySelector(".jdgm-prev-badge");
                if (reviewBadge) {
                    averageRating = parseFloat(
                        reviewBadge.getAttribute("data-average-rating") || "0",
                    );
                    totalReviews = parseInt(
                        reviewBadge.getAttribute("data-number-of-reviews") || "0",
                        10,
                    );
                }

                const tagsContainer = document.querySelector(".tag-container");
                const isPetSafe = tagsContainer
                    ? tagsContainer.textContent?.includes("Pet Safe") || false
                    : false;

                // REVIEWS
                const reviews: ReviewType[] = [];
                document.querySelectorAll(".jdgm-rev").forEach((node) => {
                    const author =
                        node.querySelector(".jdgm-rev__author")?.textContent?.trim() ||
                        "Anonymous";
                    const ratingScore = node
                        .querySelector(".jdgm-rev__rating")
                        ?.getAttribute("data-score");
                    const rating = parseInt(ratingScore || "0", 10);
                    const title =
                        node.querySelector(".jdgm-rev__title")?.textContent?.trim() || "";
                    const body =
                        node.querySelector(".jdgm-rev__body p")?.textContent?.trim() || "";
                    const date =
                        node.querySelector(".jdgm-rev__timestamp")?.textContent?.trim() ||
                        "";

                    if (author && rating > 0)
                        reviews.push({ author, rating, title, body, date });
                });

                // VARIANTS & COLORS
                let variants: Variant[] = [];
                const variantScript = document.querySelector(
                    'product-variants script[type="application/json"]',
                );
                if (variantScript) {
                    try {
                        const rawVariants = JSON.parse(variantScript.textContent || "[]");
                        variants = rawVariants.map((v: Variant) => ({
                            id: String(v.id),
                            title: v.title,
                            sku: v.sku,
                            price: v.price,
                            compareAtPrice: v.compareAtPrice,
                            isAvailable: v.isAvailable,
                        }));
                    } catch (e) {
                        // Silent catch inside browser context
						console.log("Silently handling through browser",e)
                    }
                }

                document
                    .querySelectorAll(".product-variant__item--color")
                    .forEach((el) => {
                        const input = el.querySelector("input") as HTMLInputElement;
                        const img = el.querySelector("img");
                        if (input && img) {
                            const variantTitle = input.value;
                            let src =
                                img.getAttribute("src") ||
                                img.getAttribute("srcset")?.split(",")[0].split(" ")[0] ||
                                "";
                            if (src.startsWith("//")) src = `https:${src}`;

                            const targetVariant = variants.find(
                                (v) => v.title === variantTitle,
                            );
                            if (targetVariant && src) targetVariant.swatchUrl = src;
                        }
                    });

                // THE SMART CLASSIFIER FOR PANELS
                const descriptionInfo: DescriptionSection[] = [];
                const seenContent = new Set<string>(); // To track exact duplicates

                document.querySelectorAll(".custompanel").forEach((panel) => {
                    const btn = panel.previousElementSibling;
                    let title =
                        btn?.classList.contains("customaccordion")
                            ? btn.textContent?.replace("▼", "")?.replace("▲", "")?.trim() ||
                              "Details"
                            : "Details";

                    const rawText = (panel as HTMLElement).innerText || "";
                    const contentArray = rawText
                        .split("\n")
                        .map((line) => line.trim())
                        .filter((line) => line.length > 0);

                    if (contentArray.length === 0) return;

                    // Deduplication logic
                    const joinedText = contentArray.join(" ");
                    if (seenContent.has(joinedText)) return;
                    seenContent.add(joinedText);

                    // INTELLIGENT RENAMING
                    const lowerTitle = title.toLowerCase();
                    if (lowerTitle === "details" || lowerTitle === "uses and benefits") {
                        if (
                            joinedText.includes("Water Schedule") ||
                            joinedText.includes("Common problems include")
                        ) {
                            title = "Plant Care Guide";
                        } else if (
                            joinedText.includes("Preferred location") ||
                            joinedText.includes("Light settings")
                        ) {
                            title = "Placement & Lighting";
                        } else if (
                            joinedText.includes("Coco Peat") ||
                            joinedText.includes("Recyclable box") ||
                            joinedText.includes("Self Watering Pot")
                        ) {
                            title = "What's in the Box";
                        } else if (
                            joinedText.includes("Self-watering planters simplify care")
                        ) {
                            title = "About Self-Watering";
                        } else if (
                            joinedText.includes("Plant Dimensions") ||
                            joinedText.includes("Direct Sunlight")
                        ) {
                            title = "Specifications";
                        } else if (
                            joinedText.includes(
                                "Enjoy the beauty and air-purifying qualities",
                            )
                        ) {
                            title = "Combo Overview";
                        } else {
                            title = "Overview";
                        }
                    }

                    descriptionInfo.push({ title, content: contentArray });
                });

                return {
                    averageRating,
                    totalReviews,
                    isPetSafe,
                    variants,
                    reviews,
                    descriptionInfo,
                };
            }) as ExtractedPageData;

            // GLOBAL EXTRACTOR
            const productSpecificInfo: DescriptionSection[] = [];

            extractedDetails.descriptionInfo.forEach((panel) => {
                if (
                    panel.title === "Replacement & Refund Policy" ||
                    panel.title === "About Self-Watering"
                ) {
                    if (!globalSharedData[panel.title]) {
                        globalSharedData[panel.title] = panel.content;
                    }
                } else {
                    productSpecificInfo.push(panel);
                }
            });

            extractedDetails.descriptionInfo = productSpecificInfo;

            // THE FIX: Combine the original product and the extracted details into the final shape
            const completeProduct: FinalStructuredProduct = {
                ...product,
                ...extractedDetails,
            };

            finalCatalog.push(completeProduct);

            console.log(
                `✔️ Scraped! Panels Classified: ${productSpecificInfo.length} (Redundancies removed)`,
            );
        } catch (error) {
            console.error(`❌ Failed to scrape ${product.productUrl}.`, error);
            // THE FIX: Push the fallback data instead of the broken partial object
            finalCatalog.push(getFallbackData());
        }
    }

    console.log("\n💾 Saving Global Shared Data (Policies, etc)...");
    await fs.writeFile(
        "./etl-pipeline/extract/global_shared_info.json",
        JSON.stringify(globalSharedData, null, 2),
        "utf-8",
    );

    console.log("💾 Saving Lean, Specific Plant Catalog...");
    await fs.writeFile(
        "./etl-pipeline/extract/final_structured_catalog.json",
        JSON.stringify(finalCatalog, null, 2),
        "utf-8",
    );

    console.log(`✅ SCRAPE COMPLETE! You now have a hyper-clean DB schema.`);

    await browser.close();
}

scrapeStructuredProductData().catch(console.error);