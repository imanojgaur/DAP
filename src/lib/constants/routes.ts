export const ROUTES = {
	HOME: "/",

	FOOD_AND_TOOLS: "/collections/food-and-tools",

	DEAL_OF_THE_DAY: "/collections/deal-of-the-day",

	BEST_SELLER: "/collections/plants-1",

	CATEGORIES: {
		ROOT: "/collections", // The "Shop All" fallback page

		// Space Categories
		OFFICE: "/collections/Office-plants",
		INDOOR: "/collections/indoor-plants",
		LIVING_ROOM: "/collections/living-room-plants",
		BALCONY: "/collections/balcony-plants",

		// Size Categories
		SIZE_S: "/collections/aura-planter",
		SIZE_L: "/collections/8-inch-pot",
		SIZE_XL: "/collections/10-inch-pot",

		// Plant Type Categories
		AIR_PURIFYING: "/collections/air-purifying-plants",
		VASTU: "/collections/vastu-plants",
		MOOD_BOOSTING: "/collections/mood-improving-plants",
	},

	SERVICES: {
		ROOT: "/services",
		BULK_INSTALLATION: "/services",
		CONSULT: "/services",
		MAINTENANCE: "/services/maintenance",
		WARRENTY: "/services/warrenty",
	},
} as const;
