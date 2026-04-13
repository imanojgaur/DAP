import type { 
    ProductType, 
    ImageType, 
    ReviewType 
} from "@/types";

/** for  e1 Scraper Script */
interface ScrapedProductType extends ProductType {
	images: string[];
}

interface EnrichedProductType extends ProductType {
    images: ImageType[];
    reviews?: ReviewType[];
    originalKyariImages?: ImageType[];
}


export type { 
    ScrapedProductType,
    EnrichedProductType,
}