import type React from "react";

interface CartPageLayoutProps {
	itemList: React.ReactNode;
	summary: React.ReactNode;
}

export function CartPageLayout({ itemList, summary }: CartPageLayoutProps) {
	return (
		// Max-width container to keep it centered and readable on massive monitors
		<div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 min-h-screen">
			<h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-10">
				Checkout Cart
			</h1>

			{/* THE GRID:
        - Mobile: flex-col (stacks items on top of summary)
        - Desktop (lg): grid-cols-12 
        - items-start: CRITICAL for the sticky sidebar to work!
      */}
			<div className="flex flex-col lg:grid lg:grid-cols-12 lg:items-start lg:gap-12 gap-8">
				{/* LEFT COLUMN (Products): Takes up 8 out of 12 columns (66%) */}
				<div className="lg:col-span-8 w-full">{itemList}</div>

				{/* RIGHT COLUMN (Summary): Takes up 4 out of 12 columns (33%) and sticks to the top */}
				<div className="lg:col-span-4 sticky top-24 w-full">{summary}</div>
			</div>
		</div>
	);
}
