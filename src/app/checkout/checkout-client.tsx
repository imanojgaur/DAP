"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { AddressSheet } from "@/components/checkout/address-sheet";
import { OrderSummary } from "@/components/checkout/order-summary";
import { PaymentAccordion } from "@/components/checkout/payment-accordion";

export function CheckoutClient({ user, addresses = [] }: { user: any, addresses: any[] }) {
    const [step, setStep] = useState<"address" | "payment">("payment");
    
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
        addresses.length > 0 ? addresses[0].id : null
    );
    const hasAddress = addresses.length > 0;

    return (
        <div className="min-h-screen bg-gray-50/30 pb-24 md:pb-12">
            
            {/* --- MOBILE HEADER --- */}
            <div className="md:hidden flex items-center bg-white h-14 px-4 border-b border-gray-100 sticky top-0 z-50">
                {step === "payment" ? (
                    <button type="button" onClick={() => setStep("address")} className="p-2 -ml-2">
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                ) : (
                    <Link href="/cart" className="p-2 -ml-2">
                        <ChevronLeft className="h-6 w-6" />
                    </Link>
                )}
                <h1 className="text-lg font-medium ml-2">
                    {step === "address" ? "Select Address & Pay" : "Payment"}
                </h1>
            </div>

            {/* --- PROGRESS INDICATOR (Desktop) --- */}
            <div className="hidden md:flex justify-center items-center py-8 border-b border-gray-100 bg-white">
                <div className="flex items-center gap-4 text-sm font-medium">
                    <span className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-black text-white flex items-center justify-center text-xs">✓</div> 
                        Sign Up
                    </span>
                    <div className="w-16 h-px bg-black"></div>
                    <span className="flex items-center gap-2">
                        <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${step === 'address' ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>
                            {step === 'payment' ? '✓' : '2'}
                        </div> 
                        Address
                    </span>
                    <div className={`w-16 h-px ${step === 'payment' ? 'bg-black' : 'bg-gray-200'}`}></div>
                    <span className={`flex items-center gap-2 ${step === 'payment' ? 'text-black' : 'text-gray-400'}`}>
                        <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${step === 'payment' ? 'bg-black text-white' : 'bg-gray-200'}`}>3</div> 
                        Payment
                    </span>
                </div>
            </div>

            <div className="max-w-6xl mx-auto md:px-8 md:pt-12 flex flex-col md:flex-row gap-8 lg:gap-16">
                
                {/* LEFT COLUMN: Main Flow */}
                <div className="flex-1 flex flex-col gap-2 md:gap-8">
                    
                    {/* ADDRESS VIEW */}
                    {step === "address" && (
                        <div className="bg-white p-4 md:p-8 md:rounded-2xl md:border border-gray-100 overflow-hidden">
                            <h2 className="text-xl md:text-2xl font-bold mb-2">Choose Address</h2>
                            <p className="text-sm text-gray-500 mb-6 hidden md:block">Detailed address will help our delivery partner reach your doorstep quickly</p>
                            
                            <div className="flex overflow-x-auto pb-4 gap-4 snap-x hide-scrollbar">
                                {/* 1. Add New Address Card */}
                                <div className="shrink-0 w-[280px] snap-start">
                                    <AddressSheet 
                                        user={user} 
                                        autoOpen={!hasAddress}
                                        label={
                                            <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-500 py-4">
                                                <span className="text-2xl leading-none">+</span>
                                                <span className="font-medium text-sm">Add New Address</span>
                                            </div>
                                        } 
                                    />
                                </div>

                                {/* 2. Saved Addresses */}
                                {addresses.map((addr) => {
                                    const isSelected = selectedAddressId === addr.id;
                                    return (
                                        <div 
                                            key={addr.id} 
                                            className={`relative shrink-0 w-[280px] p-5 rounded-xl border-2 transition-all snap-start flex flex-col ${
                                                isSelected ? "border-black bg-gray-50/30 shadow-sm" : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        >
                                            <button 
                                                type="button"
                                                onClick={() => setSelectedAddressId(addr.id)}
                                                className="absolute inset-0 w-full h-full z-10 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
                                                aria-label={`Select address ${addr.street}`}
                                            />

                                            <div className="flex items-center gap-2 mb-2 relative z-0">
                                                <h3 className="font-bold text-gray-900 line-clamp-1">{user.name?.split(" ")[0]}</h3>
                                                {isSelected && <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">Selected</span>}
                                            </div>
                                            <p className="text-sm text-gray-600 line-clamp-2 min-h-[40px] relative z-0">{addr.street}</p>
                                            <p className="text-sm text-gray-600 relative z-0">{addr.city}, {addr.zipCode}</p>
                                            <p className="text-sm text-gray-600 mt-2 relative z-0">+91-{user.phoneNumber || "XXXXXXXXXX"}</p>
                                            
                                            {isSelected && (
                                                <div className="flex gap-3 mt-auto pt-4 relative z-20">
                                                    <button type="button" className="flex-1 py-2 border border-gray-300 rounded-full text-sm font-medium hover:border-black transition-colors bg-white">
                                                        Edit
                                                    </button>
                                                    <button 
                                                        type="button" 
                                                        onClick={(e) => { e.stopPropagation(); setStep("payment"); }} 
                                                        className="flex-[2] py-2 bg-[#111] text-white rounded-full text-sm font-medium hover:bg-black transition-colors"
                                                    >
                                                        Deliver here
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* PAYMENT VIEW */}
                    {step === "payment" && hasAddress && selectedAddressId && (
                         <div className="bg-white p-4 md:p-8 md:rounded-2xl md:border border-gray-100 mt-2 md:mt-0">
                             <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl md:text-2xl font-bold">Select payment option</h2>
                                <button type="button" onClick={() => setStep("address")} className="text-sm font-medium text-gray-500 underline">Change Address</button>
                             </div>
                             <PaymentAccordion addressId={selectedAddressId} />
                         </div>
                    )}

                    {/* MOBILE ORDER SUMMARY */}
                    <div className="md:hidden mt-2">
                        <OrderSummary />
                    </div>
                </div>

                {/* RIGHT COLUMN: Desktop Order Summary */}
                <div className="hidden md:block w-[350px] shrink-0">
                    <OrderSummary />
                </div>
            </div>

            {/* MOBILE STICKY BOTTOM CTA */}
            {step === "address" && hasAddress && selectedAddressId && (
                <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-50 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                    <button 
                        type="button" 
                        onClick={() => setStep("payment")} 
                        className="w-full h-14 rounded-full bg-[#111] text-white font-medium text-lg"
                    >
                        Proceed to Pay
                    </button>
                </div>
            )}
        </div>
    );
}