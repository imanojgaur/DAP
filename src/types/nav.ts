export interface NavItem {
	title: string;
	href: string;
}

export interface LogoConfig {
	title: string;
	href: string;
    svg: string;
	alt: string;
	width: number;
	height: number;
}

export interface NavConfig {
	logo: LogoConfig;
	mainNav: NavItem[];
	trending: NavItem[];
	categories: NavItem[];
	services: NavItem   [];
}
