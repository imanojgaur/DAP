import { transformCategories, transformFeatProducts } from "./transform-data"

import { ImageCover } from "./image-cover"
import { OverlayText, ProductInfo } from "./card-content"
import { DynamicHorizontalImgRaw } from "./img-layout"
import { CarouselWrapper } from "./carousel-wrapper"
import { 
    CarouselContent, 
    CarouselItem,
    CarouselNext, 
    CarouselPrevious 
} from "../ui/carousel"

import type { ProductInfoProps } from "./card-content"
import type { ImageLayoutProps } from "./img-layout"
import type { FetchedCategoryArray, FetchedProductArray } from "@/data/home"
import { cn } from "cn"

// ============================================================================
// TYPES & INTERFACES
// ============================================================================
export interface CategoryConfig {
    title: string;
    slug: string;
    images: ImageLayoutProps[];
    subtitle: string;
    callToActionText: string;
    className?: string;
}

export type FeatureProductConfig = Omit<ProductInfoProps, "className" | "actionsSlot"> & { 
    images: ImageLayoutProps[] 
};

// ============================================================================
// 1. THE SINGLE SOURCE OF TRUTH (Synchronization Dictionary)
// Note: Import this into your skeleton so they never desync real UI card
// ============================================================================
export const SHARED_LAYOUT = {
    categoryItem: "pl-4 md:pl-8 basis-[50%] sm:basis-[30%] lg:basis-[25%] flex flex-col",
    productItem: "pl-4 md:pl-8 basis-[80%] sm:basis-[30%] lg:basis-[23%] flex flex-col",
    carouselContent: "flex ml-0 pr-4 md:pr-8 md:pt-6 md:pb-2 overscroll-x-none select-none touch-action-pan-y",
    cartegoryImgAspectClass:"h-70 md:h-auto md:aspect-[1/1]", 
    productImgAspectClass:"aspect-[4/5]", 
};

export async function CategoryCarousel ({catDBRes}: {catDBRes: Promise<FetchedCategoryArray>}) {
    const catConfig: CategoryConfig[] = transformCategories(await catDBRes); 
    return (
        <CarouselWrapper>
            {/* overscroll-x-none: let the embela do its native physics, disably windows/mac native edge bounce effect */}
            {/* slect none is not accidental text highlights: that might conflict with scroll*/}
            <CarouselContent className={cn(`${SHARED_LAYOUT.carouselContent}`)}>
                {catConfig?.map((card) => (
                    <CarouselItem
                        key={card.title}
                        className={cn(`${SHARED_LAYOUT.categoryItem}`)}
                    >
                        <ImageCover
                            key={card.title}
                            endPoint={`/collectons/${card.slug}`}
                            className={cn(`${SHARED_LAYOUT.cartegoryImgAspectClass}`)}
                            overlayContent={
                                <OverlayText
                                    title={card.title}
                                    subtitle={card.subtitle}
                                    callToActionText={card.callToActionText}
                                />
                            }
                            imgScroller={<DynamicHorizontalImgRaw images={card.images} />}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:absolute z-20 top-1/2 left-8 -translate-y-1/2 md:flex justify-center items-center disabled:hidden disabled:pointer-events-none" />
            <CarouselNext className="hidden md:absolute z-20 top-1/2 right-8 -translate-y-1/2  md:flex justify-center items-center disabled:hidden disabled:pointer-events-none" />
        </CarouselWrapper>
        
    )
}

export async function FeatProductCarousel ({featDbRes}: {featDbRes: Promise<FetchedProductArray>}) {
    const featProductConfig: FeatureProductConfig[] = transformFeatProducts(await featDbRes);
    return (
        <>
            {featProductConfig.length > 0 && (
                <CarouselWrapper>
                    <CarouselContent className={cn(`${SHARED_LAYOUT.carouselContent}`)}>
                        {featProductConfig?.map((card) => {
                            //Passing primary image src to ProductInfo -> AddToCartButton -> Zustand Store "Items Array"
                            const primaryImg = card.images.find(
                                (image) => image.isPrimary === true,
                            );
                            const imgSrc =
                                primaryImg?.sourceType === "cloudinary"
                                    ? primaryImg.publicId
                                    : undefined;

                            return (
                                <CarouselItem
                                    key={card.name}
                                    className={cn(`${SHARED_LAYOUT.productItem}`)}
                                >
                                    <ImageCover
                                        key={card.name}
                                        endPoint={`/products/${card.endpoint}`}
                                        className={cn(`${SHARED_LAYOUT.productImgAspectClass}`)}
                                        imgScroller={
                                            <DynamicHorizontalImgRaw images={card.images} />
                                        }
                                        productFragment={
                                            <ProductInfo
                                                id={card.id}
                                                name={card.name}
                                                endpoint={card.endpoint}
                                                body={card.body}
                                                price={card.price}
                                                compareAtPrice={card.compareAtPrice}
                                                imgSrc={imgSrc}
                                                className=""
                                            />
                                        }
                                    />
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:absolute z-20 top-1/2 left-8 -translate-y-1/2 flex justify-center items-center disabled:hidden disabled:pointer-events-none" />
                    <CarouselNext className="hidden md:absolute z-20 top-1/2 right-8 -translate-y-1/2  flex justify-center items-center disabled:hidden disabled:pointer-events-none" />
                </CarouselWrapper>
            )}
        </>
    )
}