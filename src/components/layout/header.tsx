import { Logo } from "../shared/logo";

export function Header(){
    return (

        <header className="bg-[#ffffff]">  

            <div className="max-w-[1920px] mx-auto">

                {/* Eybrow Nav (Help & user Account) */}
                <div className="hidden md:flex gap-2 justify-end items-center h-8 bg-[#f5f5f5] px-[2vw] font-[500] text-sm">

                    <a href="/help">Help</a>

                    <span>|</span>

                    <a href="/profile" className="flex gap-4 items-center">
                    <span> Sign In</span>
                    {/* <span>Hi, Manoj</span> */}
                    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none"><path stroke="#111111" strokeWidth="1.5" d="M3.75 21v-3a3.75 3.75 0 013.75-3.75h9A3.75 3.75 0 0120.25 18v3M12 3.75a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z"></path></svg>
                    </a>

                </div>

                {/* Main Nevigation Header */}
                <div className="grid grid-cols-[1fr_auto_1fr] px-[2vw] min-h-16 md:h-16 items-center"> 
                    {/* Site Logo */}
                    <div className="flex justify-start items-center">
                        <Logo className="h-full w-24"/>
                    </div>

                    {/* Desktop Nevigation */}
                    <nav className="flex gap-6 justify-center items-center">
                        <a href="/something/.svg">something 1</a>
                        <a href="/fuckyou">another thing 2</a>
                        <a href="/someting">what thing 3</a>
                    </nav>

                    {/* Action Group */}
                    <div className="flex justify-end items-center gap-6">
                        <div>something too 1</div>
                        <div>something too 2</div>
                    </div>
                </div>
                
            </div>
         </header>
    )
}