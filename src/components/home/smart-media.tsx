'use client'
import Image from "next/image";
import { CldImage } from "next-cloudinary";

interface BaseProps {
	alt: string;
	fill: boolean;
	className: string;
	sizes: string;
}

export interface CloudinaryProps extends BaseProps {
	sourceType: "cloudinary";
	publicId: string;
	width: number;
	height: number;
}

export interface NextServerProps extends BaseProps {
	sourceType: "nextServer";
	imageSrc: string;
}

export type SmartMediaProps = CloudinaryProps | NextServerProps;

export function SmartMedia(props: SmartMediaProps) {
	if (props.sourceType === "cloudinary") {
		const { sourceType, publicId, height, width, ...safeProps } = props;
		return (
			<CldImage
				src={publicId}
				{...safeProps}
				aspectRatio={"300:350"}
				crop={"fill"}
				gravity={"auto"}
				format={"auto"}
			/>
		);
	}
	const { sourceType, imageSrc, ...safeProps } = props;
	return <Image src={imageSrc} {...safeProps} />;
}
