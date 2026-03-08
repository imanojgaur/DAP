export interface NavItem {
	title: string;
	href: string;
}

export interface NavConfig {
	logo: NavItem;
	mainNav: NavItem[];
	trending: NavItem[];
	categories: NavItem[];
	services: NavItem   [];
}
