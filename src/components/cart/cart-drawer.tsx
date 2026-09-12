'use client'

import { useCart } from "@/store/cart-store"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { DoddleStickerCart } from "./cart-icon";
import { CheckCircle2 } from "lucide-react";
import { CartCard, CartSheetFooter } from "./shared";
import { RecentlyAddedItem } from "./shared";

//------------------------------//
// (CONTROLLED BY GLOBAL STATE) //
//------------------------------//

// 1. TRIGGERED BY HEADER CART ICON
//===============================================================
export function HeaderCartTrigger() {
    const addedItem = useCart((state) => state.items)
    const totalItems = useCart((state) => state.productCount)
    
    return (
        <Sheet>
            <SheetTrigger asChild>
                <button type="button" className="relative p-2 hover:bg-muted rounded-full transition-colors">
                    <DoddleStickerCart />
                </button>
            </SheetTrigger>
            
            <SheetContent className="flex flex-col w-full sm:max-w-md">
                {/* IMPROVED HEADER: Clean border, flex-between layout, and dynamic item count badge */}
                <SheetHeader className="flex flex-row justify-between items-center pb-4 pr-15 border-b border-border mt-2">
                    <SheetTitle className="text-xl font-semibold m-0">Your Cart</SheetTitle>
                    {totalItems > 0 && (
                        <span className="bg-muted text-muted-foreground text-md font-medium px-2.5 py-1 rounded-md m-0">
                            {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
                        </span>
                    )}
                </SheetHeader>
                
                <div className="flex-1 overflow-y-auto py-4 no-scrollbar">
                    {addedItem.length > 0 ? (
                        <div className="flex flex-col gap-2">
                            {addedItem.map((item) => (
                                <CartCard 
                                    key={`item.id+${item.id}`}
                                    item={item}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col h-full items-center justify-center text-center gap-4 text-muted-foreground">
                            <DoddleStickerCart /> {/* Reusing your icon as an empty state visual */}
                            <p className="text-sm">Your cart is currently empty.</p>
                        </div>
                    )}
                </div>
                
                {/* Subtotal has been moved into the footer component */}
                <CartSheetFooter />
            </SheetContent>
        </Sheet>
    );
}


// 2.TRIGGERED BY ADD TO CART BUTTON
// ==========================================

export function AddToCartDrawer() {
    const isOpen = useCart((state) => state.isDrawerOpen)
    const setOpen = useCart((state) => state.setDrawerOpen)
    const items = useCart((state) => state.items)
    const lastAddedItem = useCart((state) => state.lastAddedItem)
    
    return (
        <Sheet open={isOpen} onOpenChange={setOpen}>
            {/* Added flex-col here as well */}
            <SheetContent className="flex flex-col">
                <SheetHeader className="mb-4 px-4 pt-4 sm:px-0 sm:pt-0">
                    <div className="flex items-center justify-center gap-2 bg-green-50 border border-green-200 rounded-lg p-3 dark:bg-green-500/10 dark:border-green-500/20">
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0" />
                        <SheetTitle className="text-green-800 dark:text-green-400 text-sm font-medium m-0">
                            Successfully added to cart!
                        </SheetTitle>
                    </div>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-4 py-2">
                    {items && items.length > 0 ? (
                        <div className="flex flex-col gap-1">
                            {items.map((item) => (
                                
                                (item.id === lastAddedItem) ? (
                                    <RecentlyAddedItem key={item.id} item={item} />
                                ) : (
                                    <CartCard key={item.id} item={item} />
                                )
                            ))}
                        </div>
                    ) : (
                        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                            No items added recently.
                        </div>
                    )}
                </div>

                <CartSheetFooter />
            </SheetContent>
        </Sheet>
    )
}
