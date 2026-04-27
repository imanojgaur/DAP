"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { AddressSheet } from "@/components/checkout/address-sheet";
import { OrderSummary } from "@/components/checkout/order-summary";
import { PaymentAccordion } from "@/components/checkout/payment-accordion";

export function CheckoutClient({ user, defaultAddress }: { user: any, defaultAddress: any }) {
    // This state controls whether we are looking at the Address Step or the Payment Step
    const [step, setStep] = useState<"address" | "payment">("address");
    const hasAddress = !!defaultAddress;

    return (
        <div className="min-h-screen bg-gray-50/30 pb-24 md:pb-12">
            {/* --- MOBILE HEADER --- */}
            <div className="md:hidden flex items-center bg-white h-14 px-4 border-b border-gray-100 sticky top-0 z-10">
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

            <div className="max-w-6xl mx-auto md:px-8 md:pt-12 flex flex-col md:flex-row gap-8 lg:gap-16">
                
                {/* LEFT COLUMN: Main Flow */}
                <div className="flex-1 flex flex-col gap-2 md:gap-8">
                    
                    {/* ADDRESS VIEW */}
                    {step === "address" && (
                        <div className="bg-white p-4 md:p-8 md:rounded-2xl md:border border-gray-100">
                            <h2 className="hidden md:block text-2xl font-bold mb-6">Choose Address</h2>
                            
                            {hasAddress ? (
                                <div className="border border-gray-200 rounded-xl p-5 bg-gray-50/50">
                                    <h3 className="font-bold text-gray-900 mb-1">Deliver to {user.name?.split(" ")[0]}, {defaultAddress.zipCode}</h3>
                                    <p className="text-sm text-gray-600 mt-2">{defaultAddress.street}</p>
                                    <p className="text-sm text-gray-600">{defaultAddress.city}, {defaultAddress.state}</p>
                                    <p className="text-sm text-gray-600 mt-2">+91-{user.phoneNumber || "0000000000"}</p>
                                    
                                    <div className="mt-5 pt-5 border-t border-gray-200">
                                        <AddressSheet user={user} label="Change or Add Address" />
                                    </div>
                                </div>
                            ) : (
                                // Auto-opens if no address exists!
                                <AddressSheet user={user} autoOpen={true} />
                            )}
                        </div>
                    )}

                    {/* PAYMENT VIEW */}
                    {step === "payment" && hasAddress && (
                         <div className="bg-white p-4 md:p-8 md:rounded-2xl md:border border-gray-100 mt-2 md:mt-0">
                             <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl md:text-2xl font-bold">Select payment option</h2>
                                <button type="button" onClick={() => setStep("address")} className="text-sm font-medium text-gray-500 underline">Change Address</button>
                             </div>
                             <PaymentAccordion addressId={defaultAddress.id} />
                         </div>
                    )}

                    {/* MOBILE ORDER SUMMARY */}
                    <div className="md:hidden mt-2">
                        <OrderSummary isMobile={true} />
                    </div>
                </div>

                {/* RIGHT COLUMN: Desktop Order Summary */}
                <div className="hidden md:block w-[350px] shrink-0">
                    <OrderSummary isMobile={false} />
                </div>
            </div>

            {/* MOBILE STICKY BOTTOM CTA (Only on Address Step) */}
            {step === "address" && hasAddress && (
                <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-40 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                    <button type="button" 
                        onClick={() => setStep("payment")} 
                        className="w-full h-14 rounded-full bg-[#111] text-white font-medium text-lg"
                    >
                        Proceed to Pay
                    </button>
                </div>
            )}
            
            {/* DESKTOP PROCEED TO PAY BUTTON */}
            {step === "address" && hasAddress && (
                 <div className="hidden md:block w-[350px] ml-auto mt-4">
                     <button type="button"
                        onClick={() => setStep("payment")} 
                        className="w-full h-14 rounded-full bg-[#111] hover:bg-black text-white font-medium text-lg"
                    >
                        Proceed to Pay
                    </button>
                 </div>
            )}
        </div>
    );
}