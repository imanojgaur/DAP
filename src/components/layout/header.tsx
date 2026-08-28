import {  PremiumStickerLogo } from "../shared/svg-icon"
import { DoddleStickerCart, DoodleStickerSearch, UserAccountIcon } from "./svg-icon";

export function Header({DesktopNav}:{DesktopNav:React.ReactNode}){
    return (

        <header className="group fixed left-0 top-0 z-50 w-full">

            {/* Shield: Dropdown text move blow this getting invisible into*/}
            <div className="absolute inset-0 w-full h-full bg-white/80 backdrop-blur-md transition-colors group-has-[[data-state=open]]:bg-white group-has-[[data-state=open]]:duration-0 group-has-[[data-state=open]]:delay-0 duration-0 delay-[400ms]"/>
            
            {/* 1. THE PAGE BLUR OVERLAY: Fades in ONLY when the group has an open menu*/}
            <div className="absolute top-full left-0 w-screen h-[100vh] bg-black/50 backdrop-blur-md -z-30 opacity-0 pointer-events-none transition-opacity duration-500 group-has-[[data-state=open]]:opacity-100" />

            <div className="relative w-full max-w-[1920px] mx-auto">

                {/* Eybrow Nav (Help & user Account) */}
                <div className="hidden md:flex gap-2 justify-end items-center h-8 bg-[#f5f5f5] px-[2vw] font-[500] text-sm">

                    <a href="/help">Help</a>

                    <span>|</span>

                    <a href="/profile" className="flex gap-4 items-center">
                    <span> Sign In</span>
                    {/* <span>Hi, Manoj</span> */}
                    <UserAccountIcon />
                    </a>

                </div>

                {/* Main Nevigation Header */}
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
                        <div className="group/search flex justify-center items-center gap-3 bg-[#f5f5f5] hover:bg-gray-200 rounded-full pl-2 pr-4 py-1.5 transition-colors duration-300">
                            <DoodleStickerSearch className="group-hover:text-emerald-700 hover:translate-y-0" /> 
                            <span className="font-[700] text-md group-hover:text-emerald-700">Search...</span> 
                        </div>
                        <DoddleStickerCart />
                    </div>
                    
                </div> 
            </div>
         </header>
    )
}