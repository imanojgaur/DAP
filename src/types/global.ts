type ImageTypes = {
	publicId: string;
	secureUrl: string;
	width: number;
	height: number;
};

type ReviewType = {
	author: string;
	rating: number;
	title: string;
	body: string;
	date: string;
};

interface PlantData {
	shopifyId: string;
	name: string;
	slug: string;
	price: number;
	compareAtPrice: number | null;
	inStock: boolean;
	productUrl: string;
	description: string;
	categories: string[];

	isPetSafe?: boolean;
	averageRating?: number;
	totalReviews?: number;
	specifications?: Record<string, string[]>;
}

interface PlantCardData
	extends Pick<PlantData, "name" | "slug" | "price" | "compareAtPrice"> {
	id: string;
	stockQuantity: number;
	categories: {
		name: string;
		slug: string;
	}[];
	images: ImageTypes[];
}
interface DescriptionSection {
	title: string;
	content: string[];
}

interface Product {
	descriptionInfo?: DescriptionSection[];
	specifications?: Record<string, string[]>;
	[key: string]: unknown; // Preserves all other product properties
}

type Variant = {
	id: string;
	title: string;
	sku: string;
	price: number;
	compareAtPrice: number | null;
	isAvailable: boolean;
	swatchUrl?: string;
};

interface ProductDetails extends Partial<EnrichedPlantData> {
	descriptionInfo?: DescriptionSection[];
	variants?: Variant[];
}

type FAQ = {
	question: string;
	answer: string;
};

interface ScrapedPlantData extends PlantData {
	images: string[];
}

interface EnrichedPlantData extends PlantData {
	images: ImageTypes[];
	reviews?: ReviewType[];
}

export type {
	PlantData,
	ImageTypes,
	ScrapedPlantData,
	EnrichedPlantData,
	PlantCardData,
	DescriptionSection,
	Product,
	ReviewType,
	Variant,
	ProductDetails,
	FAQ,
};
