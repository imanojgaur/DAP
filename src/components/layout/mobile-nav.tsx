"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

// Import your config
import { navConfig, siteName } from "@/config/nav-config";
import type { NavItem } from "@/types/nav";

// Types derived from your config structure
type NavLevel = {
    title: string;
    items: NavItem[];
};

export default function MobileNav() {
    // 1. STATE: Keep track of the navigation history (The Stack)
    // Initial state is just the root level with your site name and base config
    const [menuStack, setMenuStack] = useState<NavLevel[]>([
        { title: siteName, items: navConfig },
    ]);

    // The current view is always the last item in the stack
    const currentView = menuStack[menuStack.length - 1];
    const isRoot = menuStack.length === 1;

    // 2. ACTIONS
    // Go deeper: Push the clicked category into the stack
    const handleForward = (item: NavItem) => {
        if (item.items) {
            // 1st time (Inside IF - This is CORRECT)
            setMenuStack([...menuStack, { title: item.title, items: item.items }]);
        }
    };

    // Go back: Remove the last category from the stack
    const handleBack = () => {
        if (menuStack.length > 1) {
            setMenuStack(menuStack.slice(0, -1));
        }
    };

    // UX Trick: Reset the menu back to 'All' when the user closes the sheet
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            // setTimeout ensures the reset happens AFTER the sheet visually slides away
            setTimeout(() => setMenuStack([{ title: siteName, items: navConfig }]), 300);
        }
    };

    // 3. DYNAMIC BACK BUTTON TEXT
    // If we are at Level 2, say "< All". If deeper, say "< Previous Category Name"
    const backText =
        menuStack.length === 2
            ? "All"
            : menuStack.length > 2
            ? menuStack[menuStack.length - 2].title
            : "";

    return (
        <Sheet onOpenChange={handleOpenChange}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle mobile menu</span>
                </Button>
            </SheetTrigger>

            {/* Note: p-0 removes default Shadcn padding so we can design edge-to-edge */}
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0 flex flex-col">
                
                {/* --- HEADER SECTION (UPDATED FOR 2 ROWS) --- */}
                <SheetHeader className="flex flex-col items-start px-6 pt-4 pb-4 border-b border-border/50">
                    
                    {/* Row 1: Back Button area (h-8 ensures it aligns perfectly with the 'X' button on the right) */}
                    <div className="flex h-8 w-full items-center">
                        {!isRoot && (
                            <button type="button"
                                onClick={handleBack}
                                /* -ml-2 pulls the icon slightly left so it aligns perfectly with the text below it */
                                className="-ml-2 flex items-center text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
                            >
                                <ChevronLeft className="h-5 w-5" />
                                {backText}
                            </button>
                        )}
                    </div>

                    {/* Row 2: The Main Category Title (Now sitting safely on its own line) */}
                    <SheetTitle className="mt-2 text-2xl font-black uppercase tracking-wider text-left">
                        {currentView.title}
                    </SheetTitle>
                </SheetHeader>

                {/* --- BODY SECTION --- */}
                <ScrollArea className="flex-1">
                    <div className="flex flex-col px-6 py-2">
                        {currentView.items.map((item) => (
                            <div key={item.title} className="border-b border-border/30 last:border-0">
                                {/* If item has sub-categories, render an Arrow button */}
                                {item.items ? (
                                    <button type="button"
                                        onClick={() => handleForward(item)}
                                        className="flex w-full items-center justify-between py-5 text-left text-[1.1rem] font-medium hover:text-primary transition-colors"
                                    >
                                        {item.title}
                                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                    </button>
                                ) : (
                                    /* If item is a final link, render a Link and close the sheet on click */
                                    <SheetClose asChild>
                                        <Link
                                            href={item.href || "#"}
                                            className="block w-full py-5 text-left text-[1.1rem] font-medium hover:text-primary transition-colors"
                                        >
                                            {item.title}
                                        </Link>
                                    </SheetClose>
                                )}
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}