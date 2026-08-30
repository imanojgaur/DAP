import {  PremiumStickerLogo } from "../shared/shared-icon"
import { DoddleStickerCart, DoodleStickerSearch, UserAccountIcon } from "./layout-icon";

export function Header({DesktopNav}:{DesktopNav:React.ReactNode}){
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
                        <DoddleStickerCart />
                    </div>
                    
                </div> 
            </div>
         </header>
    )
}