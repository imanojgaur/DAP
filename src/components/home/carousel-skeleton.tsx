import { CarouselContent, CarouselItem } from "../ui/carousel";
import { Skeleton } from "../ui/skeleton";
import { CarouselWrapper } from "./carousel-wrapper";
import { SHARED_LAYOUT } from "./home-carousel";


// ============================================================================
// 1. THE FULL CAROUSEL SECTION SKELETONS
// ============================================================================
export function CategoryCarouselSkeleton() {
    const array = [1, 2, 3, 4, 5];
    return (
        <CarouselWrapper>
            <CarouselContent className={SHARED_LAYOUT.carouselContent}>
                {array.map((i) => (
                    <CategorySkeleton key={i} />
                ))}
            </CarouselContent>
        </CarouselWrapper>
    );
}

export function ProductCarouselSkeleton() {
    const array = [1, 2, 3, 4, 5];
    return (
        <CarouselWrapper>
            <CarouselContent className={SHARED_LAYOUT.carouselContent}>
                {array.map((i) => (
                    <ProductSkeleton key={i} />
                ))}
            </CarouselContent>
        </CarouselWrapper>
    );
}

// ============================================================================
// 2. INDIVIDUAL ITEM SKELETONS
// ============================================================================
export function CategorySkeleton() {
    return (
        <CarouselItem className={SHARED_LAYOUT.categoryItem}>
            <CardPlaceholderBase aspectClass={SHARED_LAYOUT.cartegoryImgAspectClass} />
        </CarouselItem>
    );
}

export function ProductSkeleton() {
    return (
        <CarouselItem className={SHARED_LAYOUT.productItem}>
            <CardPlaceholderBase aspectClass={SHARED_LAYOUT.productImgAspectClass} />
            
            {/* The fake ProductInfo text fragment that sits below the image */}
            <div className="mt-2 px-2 grow flex flex-col">
                <Skeleton className="h-5 w-full mt-1 mb-2" /> {/* Fake Title */}
                <Skeleton className="h-4 w-2/3 mb-2" />       {/* Fake Body tags (ratings, reviews) */}
                <Skeleton className="h-6 w-1/3 mb-4" />       {/* Fake Price */}
                <Skeleton className="h-10 w-full rounded-full" /> {/* Fake Add to Cart Button */}
            </div>
        </CarouselItem>
    );
}

// ============================================================================
// 3. THE REUSABLE BASE SKELETON 
// ============================================================================
function CardPlaceholderBase({ aspectClass }: { aspectClass: string }) {
    return (
        <div className={"relative w-full flex flex-col md:flex-1 mb-3 md:mb-0"}>
            {/* Added bg-gray-100 to simulate the card background */}
            <div className={`${"relative w-full flex flex-col md:flex-1 mb-3 md:mb-0"} ${aspectClass} bg-gray-100`}>
                <Skeleton className="absolute inset-0 w-full h-full" />
                <div className="relative z-10 flex flex-col gap-3 w-full">
                    <Skeleton className="h-6 w-3/4 bg-gray-300/50" />
                    <Skeleton className="h-4 w-1/2 bg-gray-300/50" />
                </div>
            </div>
        </div>
    );
}