import type { Metadata } from "next";
import { MinimalHeader } from "@/components/auth/header";

export const metadata: Metadata = {
	title: "Secure Authentication | DAP",
	description:
		"Authenticate yourself to complete your purchase securely. DAP uses industry-standard encryption to protect your personal.",
	robots: {
		index: false,
		follow: false,
		nocache: true,
	},
};

export default function CheckoutLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen bg-[#f7f7f7] font-sans selection:bg-black selection:text-white flex flex-col">
			<MinimalHeader />
			<main className="flex-1">{children}</main>
			<footer className="py-6 text-center text-xs text-gray-400 border-t border-gray-200 bg-white mt-auto">
				<p>Secure Authentication powered by DAP Systems. All rights reserved.</p>
			</footer>
		</div>
	);
}
