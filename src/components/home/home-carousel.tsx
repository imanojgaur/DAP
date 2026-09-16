import { catHeader, featHeader } from "./home.confi"
import { transformCategories, transformFeatProducts } from "./transform-data"

import { SectionWrapper } from "./section-wrapper"
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

export async function CategoryCarousel ({catDBRes}: {catDBRes: Promise<FetchedCategoryArray>}) {
    const catConfig: CategoryConfig[] = transformCategories(await catDBRes); 
    return (
        <>
            {/* 2. Navigation Section */}
            <SectionWrapper 
                headerData={catHeader}
                className= "mb-5 md:mb-0 mt-6 max-w-[1600px]"
                headerClassName = "px-5 md:px-8 md:pt-6"
            >
                <CarouselWrapper>
                    {/* overscroll-x-none: let the embela do its native physics, disably windows/mac native edge bounce effect */}
                    {/* slect none is not accidental text highlights: that might conflict with scroll*/}
                    <CarouselContent className="flex ml-0 pr-4 md:pr-8 md:pt-6 md:pb-2 overscroll-x-none select-none touch-action-pan-y">
                        {catConfig?.map((card) => (
                            <CarouselItem
                                key={card.title}
                                className="pl-4 md:pl-8 basis-[50%] sm:basis-[30%] lg:basis-[25%] flex flex-col"
                            >
                                <ImageCover
                                    key={card.title}
                                    endPoint={`/collectons/${card.slug}`}
                                    className={"h-70 md:h-auto md:aspect-[1/1]"}
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
            </SectionWrapper>
        </>
    )
}

export async function FeatProductCarousel ({featDbRes}: {featDbRes: Promise<FetchedProductArray>}) {
    const featProductConfig: FeatureProductConfig[] = transformFeatProducts(await featDbRes);
    return (
        <>
            {/* 3. Product Discovery Section */}
            {featProductConfig.length > 0 && (
                <SectionWrapper 
                    headerData={featHeader}
                    className="mb-5 md:mb-0 mt-8 md:mt-6 max-w-[1600px]"
                    headerClassName="px-5 md:px-8 md:pt-6"
                >
                    <CarouselWrapper>
                        <CarouselContent className="flex ml-0 pr-4 md:pr-8 md:pt-7 overscroll-x-none select-none touch-action-pan-y">
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
                                        className="pl-4 md:pl-8 basis-[80%] sm:basis-[30%] lg:basis-[23%] flex flex-col"
                                    >
                                        <ImageCover
                                            key={card.name}
                                            endPoint={`/products/${card.endpoint}`}
                                            className={"aspect-[4/5]"}
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
                </SectionWrapper>
            )}
        </>
    )
}