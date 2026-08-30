import { DesktopNav } from "@/components/layout/desktop-nav";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function ShopLayout({
	children,
}: Readonly<{children: React.ReactNode}>) {
	return (
		<div className="flex flex-col min-h-screen">
			<Header DesktopNav={<DesktopNav />}/>
			<main className="flex-grow mt-10">{children}</main>
			<Footer />
		</div>
	);
}
