"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Logo } from "../shared/logo";
import { CartDrawer } from "./cart";
import { Navbar } from "./desktop-nav";
import MobileNav from "./mobile-nav";
import { SearchBar } from "./search-bar";
import { CartSync } from "@/components/cart/cart-sync";
import { UserDropdown } from "./user-dropdown";

export function Header() {
    const { data: session } = useSession();

    return (
        <div className="sticky top-0 z-50 flex w-full flex-col bg-white">
            
            {/* --- DESKTOP TOP STRIP (Minimal Nike Vibe) --- */}
            <div className="hidden md:flex w-full bg-[#f5f5f5] border-b border-gray-200 h-9">
                <div className="container mx-auto flex h-full items-center justify-end px-4 sm:px-8">
                    <div className="flex items-center gap-4 text-xs font-medium text-gray-600">
                        <Link href="/help" className="hover:text-black transition-colors">Help</Link>
                        <span className="h-3 w-px bg-gray-300"></span>
                        
                        {session?.user ? (
                            <UserDropdown user={session.user} />
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link href="/login" className="hover:text-black transition-colors">Sign In</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* --- MAIN HEADER --- */}
            <header className="w-full border-b border-gray-200">
                <div className="container mx-auto flex h-[60px] items-center justify-between px-4 sm:px-8">
                    <div className="flex w-32 items-center justify-start">
                        <Logo />
                    </div>

                    <CartSync />

                    <div className="hidden flex-1 justify-center md:flex px-8">
                        <Navbar />
                    </div>

                    <div className="flex w-auto items-center justify-end gap-3 sm:gap-5">
                        <div className="items-center  sm:flex">
                            <SearchBar />
                        </div>
                        <CartDrawer />
                        <div className="md:hidden flex items-center">
                            <MobileNav />
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

