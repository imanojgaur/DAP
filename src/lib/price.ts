function formatPrice(priceInSubunits: number): string {
	// 1. Convert back to main currency unit (Rupees)

	const priceInRupees = priceInSubunits / 100;

	// 2. Format using the native JS Internationalization API for Indian Rupees
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 0, // Removes the .00 at the end for a cleaner look
	}).format(priceInRupees);
}

function calculateDiscountPercentage(
	price: number,
	compareAtPrice: number | null,
): number | null {
	if (!compareAtPrice || price >= compareAtPrice) {
		return null;
	}

	const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
	return Math.round(discount);
}

export { formatPrice, calculateDiscountPercentage };
