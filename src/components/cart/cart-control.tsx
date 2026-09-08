'use client'

import { type item, useCart } from "@/store/cart-store"
import { Button } from "../ui/button"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { DoddleStickerCart } from "./cart-icon";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { CheckCircle2 } from "lucide-react";

// ==========================================
// 1. ACTION TRIGGERS
// ==========================================

export function AddToCartButton(productInfo: item) {
    const addProductToCart = useCart((state) => state.addProduct)
    
    // productInfo represents the entire props object here, which perfectly matches the Zustand store item!
    return (
        <Button onClick={() => addProductToCart(productInfo)}>
            Add To Cart 
        </Button>
    )
}

export function HeaderCartTrigger() {
    const addedItem = useCart((state) => state.items)
    
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
                    {addedItem.length > 0 && (
                        <span className="bg-muted text-muted-foreground text-md font-medium px-2.5 py-1 rounded-md m-0">
                            {addedItem.length} {addedItem.length === 1 ? 'Item' : 'Items'}
                        </span>
                    )}
                </SheetHeader>
                
                <div className="flex-1 overflow-y-auto py-4 no-scrollbar">
                    {addedItem.length > 0 ? (
                        <div className="flex flex-col gap-2">
                            {addedItem.map((item, index) => (
                                <CartCard 
                                    key={`item.id+${index}`}
                                    id={item.id} 
                                    href={item.href} 
                                    imgSrc={item.imgSrc} 
                                    title={item.title} 
                                    price={item.price}
                                    comparPriceAt={item.comparPriceAt}
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

// ==========================================
// 2. DRAWERS (CONTROLLED BY GLOBAL STATE)
// ==========================================

export function AddToCartDrawer() {
    const isOpen = useCart((state) => state.isDrawerOpen)
    const setOpen = useCart((state) => state.setDrawerOpen)
    const lastItem = useCart((state) => state.items[state.items.length - 1])
    
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

                {/* flex-1 wrapper forces the footer down */}
                <div className="flex-1 overflow-y-auto">
                    {lastItem ? (
                        <CartCard 
                            id={lastItem.id} 
                            href={lastItem.href} 
                            imgSrc={lastItem.imgSrc} 
                            title={lastItem.title} 
                            price={lastItem.price}
                            comparPriceAt={lastItem.comparPriceAt}
                        />
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

// ==========================================
// 3. REUSABLE UI COMPONENTS
// ==========================================

function CartCard({ href, imgSrc, title, price, comparPriceAt }: item) {
    return (
        <SheetClose asChild>
            <Link href={href} className="flex justify-start w-full gap-4 px-4 py-4 hover:bg-muted/50 transition-colors rounded-md">
                {imgSrc && 
                    <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-md border">
                        <CldImage 
                            src={imgSrc} 
                            alt={title}
                            aspectRatio={30/20}
                            fill
                            className="object-cover"
                            sizes="96px"
                        />
                    </div>
                }
                <div className="flex flex-col flex-1 min-w-0 py-2">
                    <h4 className="line-clamp-2 font-medium text-sm text-foreground">{title}</h4> 
                    <div className="flex items-center justify-start gap-2 mt-auto">
                        <span className="font-semibold text-sm">₹ {price}</span>
                        {comparPriceAt && (
                            <span className="text-xs line-through text-muted-foreground">₹ {comparPriceAt}</span>
                        )}
                    </div>
                </div>
            </Link>
        </SheetClose>
    )
}

function CartSheetFooter() {
    const addedItems = useCart((state) => state.items)
    const totalPrice = addedItems.reduce((acc, item) => acc + item.price, 0)

    if (addedItems.length === 0) return null;

    return (
        // 1. Reduced pt-6 to pt-4, and gap-4 to gap-3 to save vertical space
        <SheetFooter className="mt-auto flex flex-col pt-4 border-t border-border gap-3 sm:flex-col">
            
            {/* THE PREMIUM COMPACT BLOCK */}
            <div className="flex flex-col w-full gap-1">
                {/* items-baseline aligns the bottom of the text perfectly */}
                <div className="flex items-baseline justify-between w-full">
                    {/* Uppercase + tracking-wider gives that high-end brand feel */}
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Subtotal
                    </span>
                    {/* Large, crisp price */}
                    <span className="text-xl font-bold tracking-tight text-foreground">
                        ₹ {totalPrice}
                    </span>
                </div>
                
                {/* 11px text, right-aligned to tuck perfectly under the price */}
                <p className="text-[11px] text-muted-foreground text-right leading-none">
                    Taxes & shipping calculated at checkout
                </p>
            </div>

            {/* BUTTONS (Untouched) */}
            <div className="flex flex-col gap-2 w-full mt-1">
                <SheetClose asChild>
                    <Button variant="outline" className="w-full" asChild>
                        <Link href="/cart">View Cart</Link>
                    </Button>
                </SheetClose>
                <SheetClose asChild>
                    <Button className="w-full" asChild>
                        <Link href="/checkout">Proceed To Checkout</Link>
                    </Button>
                </SheetClose>
            </div>
        </SheetFooter>
    );
}

