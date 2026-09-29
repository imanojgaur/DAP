import { PremiumStickerLogo } from "../shared/shared-icon"

export function MinimalHeader () {
    return (
        <header className="group/header fixed left-0 top-0 z-50 min-w-full">
            <div className="relative min-w-[1920px] mx-auto">
                <div className="flex justify-start items-center">
                        <PremiumStickerLogo />
                </div>
            </div>
        </header>
    )
}