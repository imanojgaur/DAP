"use client";

import Link from "next/link";
import type * as React from "react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { navConfig } from "@/config/nav-config";

export function Navbar() {
    return (
        <NavigationMenu>
            <NavigationMenuList className="gap-2 md:gap-4">
                {navConfig.map((navItem) => (
                    <NavigationMenuItem key={navItem.title}>
                        {navItem.items ? (
                            <>
                                <NavigationMenuTrigger className="bg-transparent hover:bg-transparent data-[state=open]:bg-transparent font-medium text-sm">
                                    {navItem.title}
                                </NavigationMenuTrigger>
                                
                                {/* MEGA MENU CONTENT */}
                                <NavigationMenuContent className="w-full bg-white border-t border-gray-100">
                                    {/* THE FIX: Flex center wrapper for the whole sheet width */}
                                    <div className="w-screen flex justify-center">
                                        {/* THE FIX: flex & justify-center packs the columns tightly in the middle */}
                                        <div className="flex justify-center gap-16 md:gap-24 px-8 py-12 w-full max-w-6xl mx-auto">
                                            {navItem.items.map((subGroup) => (
                                                <div key={subGroup.title} className="flex flex-col space-y-5 min-w-[160px]">
                                                    <Link 
                                                        href={subGroup.href ?? "#"}
                                                        className="text-sm font-bold uppercase tracking-tight text-black hover:text-gray-500 transition-colors"
                                                    >
                                                        {subGroup.title}
                                                    </Link>

                                                    <ul className="flex flex-col space-y-3">
                                                        {subGroup.items?.map((item) => (
                                                            <li key={item.title}>
                                                                <NavigationMenuLink asChild>
                                                                    <Link
                                                                        href={item.href ?? "#"}
                                                                        className="text-sm font-medium text-gray-500 hover:text-black transition-colors block"
                                                                    >
                                                                        {item.title}
                                                                    </Link>
                                                                </NavigationMenuLink>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </NavigationMenuContent>
                            </>
                        ) : (
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href={navItem.href ?? "#"} className="bg-transparent font-medium">
                                    {navItem.title}
                                </Link>
                            </NavigationMenuLink>
                        )}
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}