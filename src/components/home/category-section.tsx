import React from "react";
import type { CategoryCardProps } from "./category-card";

interface WrapperProps{
    children: React.ReactNode,
    layoutPattern: number [],
    desktopLimit?: number // React Re-Render: those cards will still render on desktop but hidden. 
}

export function CategorySectionWrapper({
     children, 
     layoutPattern = [3, 2, 1],
     desktopLimit = 6
    }: WrapperProps) {

    const rawCards = React.Children.toArray(children); // convert children as array [remove immutablity of child]

    // to remove "latkapan: pending englis" of last card
    const cards = rawCards.map((child, idx) => {
        if(React.isValidElement(child)){ // narrow type

            const isLastOdd = idx === rawCards.length && idx % 2 !== 0
            React.cloneElement(child as React.ReactElement<CategoryCardProps>, {index: idx, isLastOdd, }) 
        }
        return child;
    });    


    const rows = []

    let cardIndex = 0 
    let patternIndex = 0

    while (cardIndex < cards.length) {

        const count = layoutPattern[patternIndex % layoutPattern.length]

        const rowCards = cards.slice(cardIndex, cardIndex + count)

        const isPastIndex = cardIndex >= desktopLimit 
        rows.push(
            <div
            key ={cardIndex} 
            //content: on mobile masonary pattern from parent, this div will dissolve. 
            //  if the desktop limit reached out, hide those cards else flex
            className ={`contents ${isPastIndex ? 'md:hidden': "md:flex md:flex-row md:gap-6 w-full"}`}>
                {rowCards}
            </div>
        )

        cardIndex += count
        patternIndex += 1
    }
    return (
        <section className="max-w-[1600px] mx-auto px-4 md:px-8 py-24">
            <div className="flex flex-col mb-12">
                <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">
                    The Collections
                </h2>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-4">
                    Curated greenery for every lifestyle
                </p>
            </div>

            {/* THE MAIN CONTAINER */}
            {/* Mobile: columns-2 (Masonry). Desktop: flex-col (Rows stack ) */}
            <div className="columns-2 gap-4 md:columns-1 md:flex md:flex-col md:gap-6 w-full">
                {rows}
            </div>
        </section>
    );
}

