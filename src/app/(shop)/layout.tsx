import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function ShopLayout({
	children,
}: Readonly<{children: React.ReactNode}>) {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-grow">{children}</main>
			<Footer />
		</div>
	);
}
