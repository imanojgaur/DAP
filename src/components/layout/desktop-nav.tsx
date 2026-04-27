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
            <NavigationMenuList>
                {navConfig.map((navItem) => (
                    <NavigationMenuItem key={navItem.title}>
                        {navItem.items ? (
                            <>
                                <NavigationMenuTrigger>{navItem.title}</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[600px] md:grid-cols-3 lg:w-[800px]">
                                        {navItem.items.map((subItem) => 
                                            subItem.items ? (
                                                <li key={subItem.title} className="flex flex-col space-y-2">
                                                    <h4 className="text-sm font-bold leading-none text-foreground px-3 py-2">
                                                        {subItem.title}
                                                    </h4>
                                                    <ul className="flex flex-col space-y-1">
                                                        {subItem.items.map((nestedItem) => (
                                                            <ListItem
                                                                key={nestedItem.title}
                                                                title={nestedItem.title}
                                                                href={nestedItem.href ?? "#"}
                                                            />
                                                        ))}
                                                    </ul>
                                                </li>
                                            ) : (
                                                /* FIX: Render ListItem directly so we don't nest <li> inside <li> */
                                                <ListItem
                                                    key={subItem.title}
                                                    title={subItem.title}
                                                    href={subItem.href ?? "#"}
                                                />
                                            )
                                        )}
                                    </ul>
                                </NavigationMenuContent>
                            </>
                        ) : (
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href={navItem.href ?? "#"}>{navItem.title}</Link>
                            </NavigationMenuLink>
                        )}
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}

function ListItem({ title, href, ...props }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link
                    href={href}
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                </Link>
            </NavigationMenuLink>
        </li>
    );
}