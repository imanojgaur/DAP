import { ROUTES } from "@/lib/constants/routes";
import type { NavConfig } from "@/types/nav";

export const navConfig: NavConfig = {
    logo: { 
        title: "Logo", 
        href: ROUTES.HOME, 
        svg: "/logo/logo.svg", 
        alt: "Plant Shop Logo",
        width: 120,  
        height: 40,
    },

    mainNav: [{ title: "New & Featured", href: ROUTES.HOME }],
    services: [
        { title: "Maintenance", href: ROUTES.SERVICES.BOOKING },
        { title: "Bulk Installation", href: ROUTES.SERVICES.BOOKING},
        { title: "Consult Doctor", href: ROUTES.SERVICES.BOOKING}
    ],
    categories: [
        { title: "Size", href: ROUTES.CATEGORIES.SIZE},
        { title: "Space", href: ROUTES.CATEGORIES.SPACE},
    ],
    trending: [
        { title: "Trending", href: ROUTES.TRENDING}
    ]
  
};