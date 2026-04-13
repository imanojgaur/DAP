type ImageType = {
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

interface ProductType {
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

export type {
	ProductType,
	ImageType,
	ReviewType,
};
