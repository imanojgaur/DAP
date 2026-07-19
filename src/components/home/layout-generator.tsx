// engine 1: Can generate layout pattern. 
// Give the props

import { CategoryCard, type CategoryCardProps } from "./category-card";

export function generateCardLayout(
    categorydataArray: CategoryCardProps[], 
    cardPerRowPattern: number[],
    mobileRandomImageHeight: number[], 
    maxCardOnDesktop: number,
    maxCardOnMobile: number
){
    
    const generateMaxCard = Math.max(maxCardOnDesktop, maxCardOnMobile);
    const maxCardData = categorydataArray.slice(0, generateMaxCard);
    
    let renderIndexStart = 0
    return cardPerRowPattern.map((cardInThisRow, rowIndex) => {
        const renderCardsInThisRow = maxCardData.slice(renderIndexStart, cardInThisRow + renderIndexStart);
        if (renderCardsInThisRow.length === 0) return null;     
        const renderRows = (
            <div 
                key={`desktop-row-${cardInThisRow}`} 
                // 'contents' allows mobile masonry to ignore this wrapper div.
                className="contents md:flex md:flex-row md:gap-6 w-full"
            >
                {renderCardsInThisRow.map((data, index) =>{
                    const globalIndex = renderIndexStart + index;
                    const imageHeight = mobileRandomImageHeight[globalIndex % mobileRandomImageHeight.length];

                    //handle dangling last card on mobile
                    const isLastVisibleCard = globalIndex === maxCardOnMobile
                    const isLastOdd = globalIndex % 2 !== 0
                    const spanFullColumnOnMobile = isLastVisibleCard && isLastOdd

                    // resolve visiblity: desktop and mobile max limits
                    const ishideOnMobile = globalIndex >= maxCardOnMobile
                    const ishideOnDesktop = globalIndex >= maxCardOnDesktop

                    let visibilityClasses = "flex";
                    if(ishideOnDesktop && ishideOnMobile) return null; // no render
                    if(ishideOnDesktop) visibilityClasses = "flex md: hidden"; //  show on mobile
                    if(ishideOnMobile) visibilityClasses = "hidden md: flex" // show on desktop 
                    return(
                        <CategoryCard
                        key={data.title}
                        title={data.title}
                        subtitle={data.subtitle}
                        callToActionText={data.callToActionText}
                        slug={data.slug || '#'}
                        imageSrc={data.imageSrc}
                        mobileHeight={imageHeight}
                        spanFullColumnOnMobile={spanFullColumnOnMobile}
                        visibilityClasses={visibilityClasses} 
                        />
                    )
                })}
            </div>
        )
        renderIndexStart += cardInThisRow
        return renderRows
    })
}