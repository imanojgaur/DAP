import type { DistributiveOmit } from "@/types";
import { SmartMedia, type SmartMediaProps } from "./smart-media";



type  ImageLayoutProps = DistributiveOmit<SmartMediaProps, 'fill' | 'className' | 'sizes'> & {isPrimary?: boolean}

export function DynamicImageGrid ({images}:{images: ImageLayoutProps[]}) {
    const isPrimary = images.find((image) => image.isPrimary) || images[0]
    const secondaryImages = images.filter((image) => !image.isPrimary).slice(0,4)

    const noOfImages = secondaryImages.length
    let secImgsLayout = ''

    switch(noOfImages){
        case 2:
            secImgsLayout = 'flex flex-row overflow-x-auto snap-x snap-mendatory no-scrollbar'
            break
        case 3:
            secImgsLayout = 'grid grid-col-2 grid-row-2 gap-0 snap-x snap-mendatory'
            break
        default:
            secImgsLayout = 'grid grid-col-2 grid-row-2 gap-0 snap-x snap-mendatory'
    }

    return (
        <div 
        style={`--grid-layout:${secImgsLayout}` as React.CSSProperties} 
        className="absolute z-0 w-full h-full overflow-hidden"
        >
            <div className="relative w-full h-full z-10 group-hover:z-0 overflow-hidden">
                <SmartMedia 
                {...isPrimary}
                fill
                className="object-cover transform-gpu transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            {secondaryImages.length > 0 && <div className={`absolute w-full h-full inset-0 z-0 group-hover:z-10 var(--grid-layout) overflow-hidden`}>
                {secondaryImages.map((image) => (
                    <div key={image.sourceType === 'cloudinary'? image.publicId: image.imageSrc}
                    className="relative"
                    >
                        <SmartMedia 
                        {...image}
                        fill
                        className="object-cover transform-gpu transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                ))}
            </div>}
        </div>
    )
}

export function HorizontalImgScroller ({images}:{images: ImageLayoutProps[]}) {
    const primaryImage = images.find((image) => image.isPrimary) || images[0]
    const secondaryImages = images.filter((image) => !image.isPrimary)
    return (
        <div className="absolute inset-0 z-0 flex flex-row overflow-x-auto snap-x snap-mandatory no-scrollbar">
            
            {primaryImage && <div className="relative w-full h-full snap-0 snap-center overflow-hidden">
                <SmartMedia
                {...primaryImage}
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            }

            {secondaryImages.length > 0 && secondaryImages.map((image) => (
                // Give Image a physical wrapper to not let stack
                <div key={image.sourceType === 'cloudinary'? image.publicId: image.imageSrc}
                className="relative w-full h-full snap-0 snap-center overflow-hidden"
                >
                    <SmartMedia 
                    {...image}
                    fill
                    className="object-cover transform-gpu transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            ))}
            {/* Gradient overlay  */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 group-hover:backdrop-blur-[2px] transition-all duration-700" />
        </div>
    )
}