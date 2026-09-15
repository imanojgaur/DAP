import { convertIntoRupee } from "@/utils/price";
import { baseCategoryConfig, images } from "./home.confi";
import type { FetchedCategoryArray, FetchedProductArray } from "@/data/home";
import type { ImageLayoutProps } from "./img-layout";
import type { ProductInfoProps } from "./card-content"

// ============================================================================
// STRICT UI CONTRACTS (DTOs)
// If the DB changes, these protect the UI components from breaking.
// ============================================================================
export interface CategoryUIConfig {
 	title: string;
	slug: string;
	images: ImageLayoutProps[];
	subtitle: string;
	callToActionText: string;
	className?: string;
}

export type FeatureProductUIConfig = Omit<ProductInfoProps, "className" | "actionsSlot"> & { 
    images: ImageLayoutProps[] 
};

// ------------------------------------------------------------------------
// 1. DATA TRANSFORMATION: CATEGORIES (Merging Static Config + DB Data)
// ------------------------------------------------------------------------

export function transformCategories(catArr: FetchedCategoryArray): CategoryUIConfig[] {

    // Step A: Map local static image arrays to the base category config
    const baseCatConfigWithImg = baseCategoryConfig.map((obj) => {
        const imagesArr = images.find(
            (imgArrItem) => obj.title === imgArrItem[0].alt,
        );

        return {
            ...obj,
            images: imagesArr ? imagesArr : [], // Fallback if images array is undefined
        };
    });
    
    // Step B: Inject live database product counts into the UI subtitle
    return baseCatConfigWithImg.map(
        (baseObj) => {
            const matchDBResult =
                Array.isArray(catArr) === true
                    ? catArr.find((dbObj) => dbObj.slug === baseObj.slug)
                    : null;

            return {
                ...baseObj,
                // Dynamically display product count if available in DB, otherwise fallback
                subtitle: matchDBResult?._count.products
                    ? `Explore ${matchDBResult._count.products} Varities`
                    : `Explore Collections`,
                callToActionText: "Shop Now",
            };
        },
    );
}

// ------------------------------------------------------------------------
// 2. DATA TRANSFORMATION: FEATURED PRODUCTS
// ------------------------------------------------------------------------
// Format raw database products into the strict UI interface expected by Carousel

export function transformFeatProducts(featArr: FetchedProductArray): FeatureProductUIConfig[] {
    if (featArr.length === 0) return [] // Safe fallback if DB returns empty
       
            return featArr.map((item) => {
                    const currPricePaise = item.price;
                    const currPriceRupee = convertIntoRupee(currPricePaise);

                    const realPricePaise = item.compareAtPrice;
                    // Logic: Ensure compare price is always logically higher than current price for UI psychology
                    // or inflate artificially by INR 500
                    const finalComparePrice = realPricePaise
                        ? realPricePaise === currPricePaise
                            ? convertIntoRupee(realPricePaise + 50000)
                            : realPricePaise
                        : convertIntoRupee(currPricePaise + 50000);

                    return {
                        ...item,
                        price: currPriceRupee,
                        compareAtPrice: finalComparePrice,
                        endpoint: item.slug,
                        body: [
                            `★${item.averageRating}`,
                            `${item.totalReviews} Review`,
                            `${item?.stockQuantity > 10 ? "In Stock" : `Hurry up ${item.stockQuantity} Left`}`,
                            `Ship In ${24} hours`,
                        ],
                        // Map database image objects to Cloudinary layout props
                        images: item.images.map((image): ImageLayoutProps => {
                            return {
                                ...image,
                                sourceType: "cloudinary",
                                alt: item.name,
                            };
                        }),
                    };
                })
            }