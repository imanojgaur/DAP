import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";

import { CounterStoreProvider } from '@/providers/counter-store-provider'


const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "DAP - Bring Greenery Home",
	description:
		"Modern plant e-commerce app with curated plants, pots, tools, and gardening services",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<CounterStoreProvider>
				    <Header />
				    <main>{children}</main>
				</CounterStoreProvider>
				<Analytics />
			</body>
		</html>
	);
}
