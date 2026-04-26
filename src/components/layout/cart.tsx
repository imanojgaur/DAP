"use client"

import Link from "next/link";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useCartStore } from "@/providers/cart-store";
import { formatPrice } from "@/lib";
import { ROUTES } from "@/lib"; // Adjust this import path if needed
import { CldImage } from "next-cloudinary"; // 1. Import Cloudinary Image

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";

export function CartDrawer() {
    const items = useCartStore((state) => state.items);
    const removeItem = useCartStore((state) => state.removeItem);

    const cartCount = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button type="button" className="relative flex items-center p-2 text-muted-foreground hover:text-foreground transition-colors">
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-700 text-[10px] text-white font-bold">
                            {cartCount}
                        </span>
                    )}
                </button>
            </SheetTrigger>

            <SheetContent side="right" className="w-full sm:max-w-lg flex flex-col h-full">
                <SheetHeader>
                    <SheetTitle className="text-left text-2xl">Cart ({cartCount})</SheetTitle>
                </SheetHeader>

                {items.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <ShoppingCart className="w-16 h-16 text-gray-200 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">Your cart is empty</h3>
                        <p className="text-sm text-gray-500 mb-6">Start adding some greenery to your space!</p>
                        <SheetClose asChild>
                            <Link href={ROUTES.CATEGORIES.ROOT} className="text-green-700 hover:underline font-bold">
                                Browse Plants
                            </Link>
                        </SheetClose>
                    </div>
                ) : (
                    <>
                        <div className="mt-8 flex-1 overflow-y-auto flex flex-col gap-6 pr-2">
                            {items.map((item) => (
                                <div key={item.id} className="flex items-center justify-between border-b pb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gray-50 rounded-md overflow-hidden shrink-0 relative">
                                            {/* 2. Replace <img> with <CldImage> */}
                                            {item.image ? (
                                                <CldImage 
                                                    src={item.image} 
                                                    alt={item.name} 
                                                    fill
                                                    sizes="64px"
                                                    className="object-cover" 
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-xs">
                                                    No Img
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-medium line-clamp-1">{item.name}</span>
                                            <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2 shrink-0 ml-2">
                                        <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                                        <button type="button"
                                            onClick={() => removeItem(item.id)}
                                            className="text-xs text-red-500 hover:text-red-700 transition-colors flex items-center"
                                        >
                                            <Trash2 className="w-3 h-3 mr-1"/> Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t bg-background pt-6 pb-2 mt-auto">
                            <div className="flex justify-between font-bold text-xl mb-4 text-gray-900">
                                <span>Subtotal</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>
                            
                            <SheetClose asChild>
                                <Link href={ROUTES.CART} className="flex w-full items-center justify-center rounded-xl bg-green-700 py-4 text-white font-bold text-lg hover:bg-green-800 transition-all shadow-md">
                                    View Full Cart
                                </Link>
                            </SheetClose>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
}