import Image from "next/image";
import Link from "next/link";
import { navConfig } from "@/config/nav-config";


export function Logo() {
	return (
		<Link href={navConfig.logo.href} className="pl-6 py-4">
			<Image
				src={navConfig.logo.svg}
				alt={navConfig.logo.alt}
				width={navConfig.logo.width}
				height={navConfig.logo.height}
				priority
				className="h-auto w-auto object-contain"
			/>
		</Link>
	);
}
