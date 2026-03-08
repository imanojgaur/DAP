import { ROUTES } from "@/lib/constants/routes";
import type { NavConfig } from "@/types/nav";

export const navConfig: NavConfig = {
  mainNav: [{ title: "New & Featured", href: ROUTES.HOME }],
  services: [
    { title: "Maintenance", href: ROUTES.SERVICES.MAINTENANCE },
    { title: "Bulk Installation", href: ROUTES.SERVICES.MAINTENANCE},
    { title: "Consult Doctor", href: ROUTES.SERVICES.MAINTENANCE}
   ],
   categories: [
    { title: "Size", href: ROUTES.CATEGORIES.SIZE},
    { title: "Space", href: ROUTES.CATEGORIES.SPACE},
   ],
   trending: [
    { title: "Trending", href: ROUTES.TRENDING}
   ]
  
};