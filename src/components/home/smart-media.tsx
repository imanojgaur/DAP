import Image from "next/image";
import { CldImage } from "next-cloudinary";

interface SmartMediaProps {
    sourceType: 'cloudinary' | 'nextServer'
    src: string, 
    width?: number, 
    height?: number, 
    alt: string, 
    fill: boolean, 
    className: string, 
    sizes: string, 
}

export function SmartMedia({sourceType, width, height,...safeProps}:SmartMediaProps ){
    if(sourceType === 'cloudinary'){
        return (
            <CldImage 
            width={width}
            height={height}
            {...safeProps}
            aspectRatio={"300:350"}
            crop={"fill"}
            gravity={"auto"}
            format={"auto"}
            />
        )
    } 
    return (
    <Image 
    {...safeProps}
    />)
        
}