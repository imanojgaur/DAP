"use client"

import { cleanPlantSlug } from "@/lib";
import { formatPrice, calculateDiscountPercentage } from "@/lib";

interface ProductHeaderProps {
    name: string;
    price: number;
    compareAtPrice: number | null;
}

export function ProductHeader({ name, price, compareAtPrice }: ProductHeaderProps) {
    const propName = cleanPlantSlug(name);
    const pageName = propName.replace(/-/g," ");
    const formattedPrice = formatPrice(price);
    const formattedComparePrice = compareAtPrice ? formatPrice(compareAtPrice) : null;
    const discount = calculateDiscountPercentage(price, compareAtPrice);

    return (
        <div className="flex flex-col gap-2 py-4">
            {/* Title */}
            <h1 className="text-l sm:text-2xl font-bold tracking-tight text-gray-900 capitalize">
                {pageName}
            </h1>

            {/* Price Row */}
            <div className="flex items-center gap-3 mt-2">
                
                {/* 1. Main Selling Price */}
                <span className="text-3xl font-bold text-gray-900 tracking-tight">
                    {formattedPrice}
                </span>

                {/* 2. Conditional: Only render the strikethrough and badge IF a discount exists */}
                {discount && formattedComparePrice && (
                    <>
                        <span className="text-xl text-gray-500 line-through decoration-gray-400 font-medium">
                            {formattedComparePrice}
                        </span>
                        
                        {/* You can replace this span with your Shadcn <Badge> if you prefer! */}
                        <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-1 text-sm font-bold text-green-700 ring-1 ring-inset ring-green-600/20">
                            {discount}% OFF
                        </span>
                    </>
                )}
            </div>
            <p>Inclusive Of All Taxes</p>
        </div>
    );
}