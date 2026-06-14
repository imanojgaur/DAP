export type SiteName = string;

export type LogoConfig = {
	title: string;
	href: string;
	svg: string;
	alt: string;
	width: number;
	height: number;
};

export type NavItem = {
	title: string;
	href?: string;
	description?: string;
	items?: NavItem[];
};


