import type { ImageType, ProductType } from "@/types";

interface ProductCardTypes
	extends Pick<ProductType, "name" | "slug" | "price" | "compareAtPrice"> {
	id: string;
	stockQuantity: number;
	categories: {
		name: string;
		slug: string;
	}[];
	images: ImageType[];
}

export type { ProductCardTypes };
