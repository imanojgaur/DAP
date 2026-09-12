import Image from "next/image";
import Link from "next/link";
import { logoConfig } from "@/config/nav-config";

export function Logo(props: { className?: string }) {
	return (
		<Link
			href={logoConfig.href}
			className={`flex items-center ${props?.className}`}
		>
			<Image
				src={logoConfig.svg}
				alt={logoConfig.alt}
				width={logoConfig.width}
				height={logoConfig.height}
				priority
				className="h-auto w-auto object-contain"
			/>
		</Link>
	);
}
