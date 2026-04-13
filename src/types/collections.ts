import type { ProductTypes, ImageTypes } from "@/types"

interface ProductCardTypes
	extends Pick<ProductTypes, "name" | "slug" | "price" | "compareAtPrice"> {
	id: string;
	stockQuantity: number;
	categories: {
		name: string;
		slug: string;
	}[];
	images: ImageTypes[];
}

export type {
    ProductCardTypes,

}