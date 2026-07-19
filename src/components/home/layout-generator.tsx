import type { CategoryCardProps } from "./category-card";

interface generateCardLayout{
    categoryCardConfig: CategoryCardProps[], 
    desktopLayoutPattern: number [],
    desktopLimit: number,
    mobileLimit: number,
}

export function generateCardLayout(
    catgoryArray: CategoryCardProps[], 
    desktopLayoutPattern: number[],
    mobileRandomImageHeight: number[], 
    desktopLimit: number,
    mobileLimit: number
){
    return (
        
    )
}