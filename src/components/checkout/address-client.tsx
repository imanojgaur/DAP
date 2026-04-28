"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Info } from "lucide-react";
import { AddressSheet } from "@/components/checkout/address-sheet";
import { PaymentAccordion } from "@/components/checkout/payment-accordion";
import { useCartStore } from "@/providers/cart-store";
import { formatPrice } from "@/lib";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CldImage } from "next-cloudinary";

export function AddressClient({ user, initialAddresses = [] }: { user: any, initialAddresses: any[] }) {
    // 1. Manage Step State: "address" or "payment"
    const [step, setStep] = useState<"address" | "payment">("address");
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
        initialAddresses.length > 0 ? initialAddresses[0].id : null
    );

    const items = useCartStore((state) => state.items);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="pb-24 md:pb-12 text-gray-900">
            {/* MOBILE HEADER */}
            <div className="md:hidden flex items-center bg-white h-14 px-4 border-b border-gray-100 sticky top-0 z-50">
                <button type="button" onClick={() => step === "payment" ? setStep("address") : null} className="p-2 -ml-2">
                    <ChevronLeft className="h-6 w-6" />
                </button>
                <h1 className="text-lg font-medium ml-2">
                    {step === "address" ? "Select Address" : "Payment"}
                </h1>
            </div>

            <div className="max-w-6xl mx-auto md:px-8 md:pt-12 flex flex-col md:flex-row gap-8 lg:gap-16">
                
                {/* LEFT COLUMN: Main Flow */}
                <div className="flex-1 flex flex-col">
                    {step === "address" ? (
                        <>
                            <div className="hidden md:block mb-8">
                                <h2 className="text-2xl font-bold tracking-tight mb-1">Choose Address</h2>
                                <p className="text-sm text-gray-500">Select a delivery location</p>
                            </div>

                            <MobileAddressBlock user={user} addresses={initialAddresses} selectedId={selectedAddressId} />
                            
                            <DesktopAddressGrid 
                                user={user} 
                                addresses={initialAddresses} 
                                selectedId={selectedAddressId} 
                                onSelect={setSelectedAddressId}
                                onConfirm={() => setStep("payment")} // Moves to payment
                            />
                        </>
                    ) : (
                        <div className="bg-white p-4 md:p-8 md:rounded-2xl md:border border-gray-100">
                             <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl md:text-2xl font-bold">Select payment option</h2>
                                <button type="button" onClick={() => setStep("address")} className="text-sm font-medium text-blue-600 underline">Change Address</button>
                             </div>
                             <PaymentAccordion addressId={selectedAddressId!} />
                        </div>
                    )}

                    {/* Mobile Only Accordions */}
                    <div className="md:hidden">
                        <OrderDetailsAccordions items={items} total={total} />
                    </div>
                </div>

                {/* RIGHT COLUMN: Desktop Sticky Sidebar */}
                <div className="hidden md:block w-[380px] shrink-0">
                    <div className="sticky top-24 bg-white p-6 rounded-2xl border border-gray-100">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                        {/* We use the same accordion component here for desktop */}
                        <OrderDetailsAccordions items={items} total={total} isDesktop />
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- SHARED ACCORDION COMPONENT ---
function OrderDetailsAccordions({ items, total, isDesktop = false }: { items: any[], total: number, isDesktop?: boolean }) {
    return (
        <div className={`bg-white ${!isDesktop ? "mt-2 px-4 pt-6 pb-24" : ""}`}>
            <Accordion type="multiple" defaultValue={["price"]} className="w-full">
                <AccordionItem value="delivery" className="border-b border-gray-100">
                    <AccordionTrigger className="hover:no-underline py-4">
                        <span className="font-bold text-gray-900">Bag ({items.length})</span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4 pt-2 pb-4 max-h-[400px] overflow-y-auto pr-2">
                            {items.map(item => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="relative h-16 w-14 bg-gray-100 rounded shrink-0">
                                        {item.image && <CldImage src={item.image} alt={item.name} fill className="object-cover rounded" sizes="56px" />}
                                    </div>
                                    <div className="flex flex-col text-xs justify-center flex-1">
                                        <p className="text-gray-900 font-bold line-clamp-1">{item.name}</p>
                                        <p className="text-gray-500">Qty: {item.quantity}</p>
                                        <p className="font-bold mt-1">{formatPrice(item.price * item.quantity)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="price" className="border-b-0">
                    <AccordionTrigger className="hover:no-underline py-4">
                        <span className="font-bold text-gray-900">Price Details</span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3 pt-2">
                            <div className="flex justify-between text-gray-600 text-sm">
                                <span>Bag Total</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600 text-sm items-center">
                                <span className="flex items-center gap-1">Shipping <Info className="h-3 w-3"/></span>
                                <span className="text-green-600 font-bold">Free</span>
                            </div>
                            <div className="flex justify-between items-center font-black text-lg pt-4 border-t border-gray-100 mt-2">
                                <span>Total Amount</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

// --- DESKTOP GRID (Modified with onConfirm) ---
function DesktopAddressGrid({ user, addresses, selectedId, onSelect, onConfirm }: any) {
    return (
        <div className="hidden md:flex overflow-x-auto pb-6 gap-4 snap-x hide-scrollbar">
            {/* Add New Address Card */}
            <div className="shrink-0 w-[300px] snap-start h-[180px]">
                <AddressSheet user={user} label={<div className="flex flex-col items-center justify-center h-full gap-2 text-gray-500 border-2 border-dashed rounded-2xl cursor-pointer hover:border-black transition-all"><span className="text-3xl font-light">+</span><span className="text-sm">Add New Address</span></div>} />
            </div>

            {/* Saved Address Cards */}
            {addresses.map((addr: any, index: number) => {
                const isSelected = selectedId === addr.id;
                return (
                    <div // <--- CHANGED FROM button TO div
                        key={addr.id}
                        role="button" // Accessibility: Tells screen readers this is clickable
                        tabIndex={0}  // Accessibility: Makes it focusable with the Tab key
                        onClick={() => onSelect(addr.id)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(addr.id); }}
                        className={`text-left relative shrink-0 w-[300px] h-[180px] p-5 rounded-2xl border transition-all snap-start flex flex-col cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-black ${
                            isSelected ? "border-blue-200 bg-[#f4f8ff]" : "border-gray-200 bg-gray-50/50"
                        }`}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-sm text-gray-900">{user.name?.split(" ")[0]}</h3>
                            {index === 0 && <span className="bg-blue-100 text-blue-700 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">Default</span>}
                        </div>
                        
                        <div className="text-xs text-gray-600 space-y-0.5 flex-1">
                            <p className="line-clamp-1">{addr.street}</p>
                            <p>{addr.city}-{addr.zipCode}</p>
                            <p className="mt-2 font-medium">+91-{user.phoneNumber || "XXXXXXXXXX"}</p>
                        </div>

                        {isSelected && (
                            <div className="flex gap-3 mt-auto pt-2">
                                {/* EDIT SHEET WIRE */}
                                <button type="button" className="flex-1" onClick={(e) => e.stopPropagation()}>
                                    <AddressSheet 
                                        user={user} 
                                        address={addr} 
                                        label={<div className="py-1.5 border border-gray-300 rounded-full text-[10px] font-bold text-center bg-white hover:border-black transition-all">EDIT</div>} 
                                    />
                                </button>

                                {/* DELIVER BUTTON - LEGAL NOW */}
                                <button 
                                    type="button" 
                                    onClick={(e) => { 
                                        e.stopPropagation(); // Prevents clicking the card again
                                        onConfirm(); 
                                    }} 
                                    className="flex-[2] py-1.5 bg-black text-white rounded-full text-[10px] font-bold text-center hover:bg-gray-800 transition-all"
                                >
                                    DELIVER HERE
                                </button>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

function MobileAddressBlock({ user, addresses, selectedId }: any) {
    const activeAddress = addresses.find((a: any) => a.id === selectedId);
    if (addresses.length === 0) return <div className="md:hidden p-4"><AddressSheet user={user} label="Add Address" /></div>;

    return (
        <div className="md:hidden p-4 border-b border-gray-100 bg-white">
            {activeAddress && (
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="font-bold text-sm mb-1">{user?.name?.split(" ")[0]}</p>
                    <p className="text-xs text-gray-500 line-clamp-1 mb-4">{activeAddress.street}</p>
                    <AddressSheet user={user} label={<span className="text-xs font-bold text-blue-600 underline">CHANGE OR ADD ADDRESS</span>} />
                </div>
            )}
        </div>
    );

}