'use client'

import { type ReceivedItemInfo, useCart } from "@/store/cart-store"
import { Button } from "../ui/button"
import { SheetClose, SheetFooter } from "../ui/sheet"
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import React from 'react';
import { CartQuantityControle } from './cart-actions'

// ==========================================
// REUSABLE UI COMPONENTS
// ==========================================

export const CartCard = React.memo(function CartCardBase ({item} : {item: ReceivedItemInfo}) {
    return (
        <div className="flex justify-start w-full gap-4 px-4 py-4 hover:bg-muted/50 transition-colors rounded-md shadow-md"> 
            <SheetClose asChild>
                <Link href={item.href} className="relative h-28 w-24 shrink-0 overflow-hidden rounded-md border">
                    {item.imgSrc && 
                        <CldImage 
                            src={item.imgSrc} 
                            alt={item.title}
                            aspectRatio={30/20}
                            fill
                            className="object-cover"
                            sizes="96px"
                        />
                    }
                </Link>
            </SheetClose>
            <div className="flex flex-col flex-1 min-w-0">
                <SheetClose asChild> 
                    <Link href={item.href} className="flex flex-col gap-1.5 py-2">
                        <h4 className="line-clamp-2 font-medium text-sm text-foreground text-start">{item.title}</h4> 
                        <div className="flex items-center justify-start gap-2">
                            <span className="font-semibold text-sm">₹ {item.price}</span>
                            {item.comparPriceAt && (
                                <span className="text-xs line-through text-muted-foreground">₹ {item.comparPriceAt}</span>
                            )}
                        </div>
                    </Link>
                </SheetClose>

                <CartQuantityControle productId = {item.id} className=""/>
           </div>
        </div> 
    )
})


export const RecentlyAddedItem = React.memo(function RecentlyAddedItem({ item }: {item: ReceivedItemInfo}) {
    return (
        <div className="relative mb-6 rounded-lg border-2 border-primary/20 bg-primary/5 overflow-hidden shadow-sm">
            {/* The Badge */}
            <div className="absolute top-0 left-0 z-10 rounded-br-lg bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                Recently Added
            </div>
            
            {/* We push the cart card down slightly so the badge doesn't overlap the image */}
            <div className="pt-3">
                <CartCard item={item} />
            </div>
        </div>
    )
}) 

//--------------------------------------------------------------------------------------------------//

export function CartSheetFooter() {
    const addedItems = useCart((state) => state.items)
    const totalPrice = addedItems.reduce((acc, item) => acc + item.price, 0)

    if (addedItems.length === 0) return null;

    return (
        // 1. Reduced pt-6 to pt-4, and gap-4 to gap-3 to save vertical space
        <SheetFooter className="mt-auto flex flex-col pt-4 border-t border-border gap-3 sm:flex-col shadow-md border-b">
            
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

