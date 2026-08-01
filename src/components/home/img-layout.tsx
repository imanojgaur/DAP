import type { DistributiveOmit } from "@/types";
import { SmartMedia, type SmartMediaProps } from "./smart-media";



type  ImageLayoutProps = DistributiveOmit<SmartMediaProps, 'fill' | 'className' | 'sizes'> & {isPrimary?: boolean}

export function DynamicImageGrid ({images}:{images: ImageLayoutProps[]}) {

    return (
        <div>
            {images.map((image) => (
                <SmartMedia 
                key={image.sourceType === 'cloudinary'? image.publicId: image.imageSrc}
                {...image}
                fill
                className="object-cover transform-gpu transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            ))}
        </div>
    )
}

export function HorizontalImgScroller ({images}:{images: ImageLayoutProps[]}) {
    const primaryImage = images.find((image) => image.isPrimary) || images[0]
    const secondaryImages = images.filter((image) => !image.isPrimary).slice(0,4)
    return (
        <div className="absolute inset-0 z-0 flex flex-row overflow-x-auoto snap-x snap-mandatory no-scrollbar">
            
            {primaryImage && <div className="relative w-full h-full snap-o snap-center overflow-hidden">
                <SmartMedia
                {...primaryImage}
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            }

            {secondaryImages?.map((image) => (
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