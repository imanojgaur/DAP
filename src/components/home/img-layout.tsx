import type { DistributiveOmit } from "@/types";
import { SmartMedia, type SmartMediaProps } from "./smart-media";

type ImageLayoutProps = DistributiveOmit<SmartMediaProps, 'fill' | 'className' | 'sizes'>

export function DynamicImageGrid (images: ImageLayoutProps[]) {
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

export function HorizontalImgScroller (images: ImageLayoutProps[]) {
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