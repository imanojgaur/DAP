
// [SCHEMA UPGRADE 1]: Updated TypeScript type to perfectly match Prisma
type PlantCardData = {
  shopifyId: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice: number;
  inStock: boolean;
  images: string[];
  productUrl: string;
  description: string;
  categories: string[]; 
}

type ImageTypes = {
  publicId?: string;
  secureUrl?: string;
  width?: number;
  height?: number;
}

export type { PlantCardData, ImageTypes }
