// engine 1: Generate Desirable rows and no.of card each row
import {
	GlobalRoundEdgeCard,
	type GlobalRoundEdgeCardProps,
} from "./global-round-edge-card";

interface GenerateCardLayoutProps {
	categoryDataArray: GlobalRoundEdgeCardProps[];
	maxCardOnDesktop: number;
	maxCardOnMobile: number;
	desktopLayoutPattern: number[];
	mobileRandomImageHeight?: number[];
}

export function generateCardLayout({
	categoryDataArray,
	maxCardOnDesktop,
	maxCardOnMobile,
	desktopLayoutPattern,
	mobileRandomImageHeight,
}: GenerateCardLayoutProps) {
	const generateMaxCard = Math.max(maxCardOnDesktop, maxCardOnMobile);
	const maxCardData = categoryDataArray.slice(0, generateMaxCard);

	let renderIndexStart = 0;
	return desktopLayoutPattern.map((cardInThisRow, rowIndex) => {
		const renderCardsInThisRow = maxCardData.slice(
			renderIndexStart,
			cardInThisRow + renderIndexStart,
		);
		if (renderCardsInThisRow.length === 0) return null;
		const renderRows = (
			<div
				key={`desktop-row-${cardInThisRow}-${rowIndex}`}
				// 'contents' allows mobile masonry to ignore this wrapper div.
				className="flex flex-row overflow-x-auto gap-3 md:gap-5 snap-x snap-mandatory no-scrollbar w-full md:pt-6 md:pb-11 px-2 md:px-7 -my-4"
			>
				{renderCardsInThisRow.map((data, index) => {
					const globalIndex = renderIndexStart + index;
					const imageHeight = mobileRandomImageHeight
						? mobileRandomImageHeight[
								globalIndex % mobileRandomImageHeight.length
							]
						: undefined;

					//handle dangling last card on mobile
					const isLastVisibleCard = globalIndex === maxCardOnMobile - 1;
					const isTotalMobileCardOdd = maxCardOnMobile % 2 !== 0;
					const spanFullColumnOnMobile =
						isLastVisibleCard && isTotalMobileCardOdd;

					// resolve visiblity: desktop and mobile max limits
					const ishideOnMobile = globalIndex >= maxCardOnMobile;
					const ishideOnDesktop = globalIndex >= maxCardOnDesktop;

					let visibilityClasses = "flex";
					if (ishideOnDesktop && ishideOnMobile) return null; // no render
					if (ishideOnDesktop) visibilityClasses = "flex md:hidden"; //  show on mobile // never make space in tailwind class "haha"
					if (ishideOnMobile) visibilityClasses = "hidden md:flex"; // show on desktop
					return (
						<GlobalRoundEdgeCard
							key={data.slug}
							title={data.title}
							subtitle={data.subtitle}
							callToActionText={data.callToActionText}
							slug={data.slug || "#"}
							imageSrc={data.imageSrc}
							mobileHeight={imageHeight}
							spanFullColumnOnMobile={spanFullColumnOnMobile}
							visibilityClasses={visibilityClasses}
						/>
					);
				})}
			</div>
		);
		renderIndexStart += cardInThisRow;
		return renderRows;
	});
}
