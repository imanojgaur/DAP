'use client'

import {  PremiumStickerLogo } from "../shared/shared-icon"
import { Button } from "../ui/button";
import { DoddleStickerCart, DoodleStickerSearch, UserAccountIcon } from "./layout-icon";
import { useCart } from "@/store/cart-store";

export function Header({DesktopNav}:{DesktopNav:React.ReactNode}){
    const cartProduct = useCart((state) => state.productCount)
    const decrement = useCart((state) => state.removeProduct)
    return (

        <header className="group fixed left-0 top-0 z-50 w-full">

            {/* Shield: Dropdown text move blow this getting invisible into*/}
            <div className="absolute inset-0 w-full h-full bg-white/80 backdrop-blur-md transition-all group-has-[[data-state=open]]:bg-white group-has-[[data-state=open]]:duration-300 group-has-[[data-state=open]]:delay-0 duration-[1500ms] delay-[200ms] ease-in"/>
        
            {/* 1. THE PAGE BLUR OVERLAY: Fades in ONLY when the group has an open menu*/}
            <div className="absolute top-full left-0 w-screen h-[100vh] bg-black/50 -z-30 opacity-0 pointer-events-none transition-opacity duration-500 group-has-[[data-state=open]]:opacity-100" />
           
            {/* Main Header */}
            <div className="relative w-full max-w-[1920px] mx-auto">

                {/* Eybrow Nav (Help & user Account) */}
                <div className="hidden md:flex gap-2 justify-end items-center h-8 px-[2vw] font-[500] text-sm bg-transparent">

                    <a href="/help">Help</a>

                    <span>|</span>

                    <a href="/profile" className="flex gap-4 items-center">
                    <span> Sign In</span>
                    {/* <span>Hi, Manoj</span> */}
                    <UserAccountIcon />
                    </a>

                </div>

                {/* Desktop Nevigation */}
                <div className="grid grid-cols-[1fr_auto_1fr] px-[2vw] min-h-16 md:h-16 items-center"> 

                    {/* Site Logo */}
                    <div className="flex justify-start items-center">
                        <PremiumStickerLogo />
                    </div>

                    {/* Desktop Nevigation */}
                    <div className="flex gap-6 justify-center items-center">
                        {DesktopNav}
                    </div>

                    {/* Action Group */}
                    <div className="flex justify-end items-center gap-6">
                        <div className="group/search  bg-white hover:bg-white/80 rounded-full pl-2 pr-5 py-1 cursor-pointer">
                            <div className="flex justify-center items-center gap-3 ">
                                <DoodleStickerSearch className="hover:text-black hover:translate-y-0" /> 
                                <span className="font-[500] text-sm">Search...</span> 
                            </div>
                        </div>
          
                        <div className="relative inline-flex items-center justify-center">
                            {/* The Cart Button (Scales everything together) */}
                            <button 
                                type="button" 
                                onClick={decrement} 
                                className="group relative z-10 flex items-center justify-center text-gray-800 transition-all duration-300 ease-out hover:scale-110 hover:text-emerald-500"
                            >
                                {/* 1. The Cart Icon */}
                                <DoddleStickerCart />
                                
                                {/* 2. The Giant Embedded Number */}
                                {/* absolute inset-0 forces it to map exactly to the button's edges */}
                                <span className="absolute inset-0 z-20 flex items-center justify-center pt-2 pointer-events-none">
                                    <span className="text-2xl font-black text-white/90 drop-shadow-[0_2px_5px_rgba(0,0,0,0.6)]">
                                        {cartProduct}
                                    </span>
                                </span>
                            </button>
                        </div>
                    </div>
                    
                </div> 
            </div>
         </header>
    )
}