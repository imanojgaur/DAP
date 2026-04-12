import { ROUTES } from "@/lib/constants/routes";
import type { LogoConfig, NavItem, SiteName } from "@/types/nav";

const siteName: SiteName = "DAP";

const logoConfig: LogoConfig = {
	title: "DAP",
	href: "/",
	svg: "/logo/logo.svg",
	alt: "Site logo",
	width: 120,
	height: 60,
};

const navConfig: NavItem[] = [
	{
		title: "New & Featured",
		href: ROUTES.HOME,
	},
	{
		title: "Shop",
		//In future: I will be using custom Icon to show Shop.
		href: ROUTES.CATEGORIES.ROOT,
		items: [
			{
				title: "By Plant Type",
				href: ROUTES.CATEGORIES.ROOT,
				items: [
					{
						title: "Air Purifying Plants",
						href: ROUTES.CATEGORIES.AIR_PURIFYING,
					},
					{ title: "Vastu Plants", href: ROUTES.CATEGORIES.VASTU },
					{
						title: "Mood Boosting Plants",
						href: ROUTES.CATEGORIES.MOOD_BOOSTING,
					},
				],
			},
			{
				title: "By Plant Size",
				href: ROUTES.CATEGORIES.ROOT,
				items: [
					{ title: "Small", href: ROUTES.CATEGORIES.SIZE_S },
					{ title: "Medium", href: ROUTES.CATEGORIES.SIZE_L },
					{ title: "Large", href: ROUTES.CATEGORIES.SIZE_XL },
				],
			},
			{
				title: "By Plant Space",
				href: ROUTES.CATEGORIES.ROOT,
				items: [
					{ title: "Indoor", href: ROUTES.CATEGORIES.INDOOR },
					{ title: "Living Room Plants", href: ROUTES.CATEGORIES.LIVING_ROOM },
					{ title: "Place at Balcony", href: ROUTES.CATEGORIES.BALCONY },
					{ title: "For Office", href: ROUTES.CATEGORIES.OFFICE },
				],
			},
		],
	},
	{
		title: "Food & Tools",
		href: ROUTES.FOOD_AND_TOOLS,
	},
	{
		title: "Services",
		href: ROUTES.SERVICES.ROOT,
		items: [
			{
				title: "Bulk Installation",
				href: ROUTES.SERVICES.BULK_INSTALLATION,
			},
			{
				title: "Consult a Doctor",
				href: ROUTES.SERVICES.CONSULT,
			},
			{
				title: "Maintenance",
				href: ROUTES.SERVICES.MAINTENANCE,
			},
			{
				title: "Warranty",
				href: ROUTES.SERVICES.WARRENTY,
			},
		],
	},
];

export { siteName, navConfig, logoConfig };
