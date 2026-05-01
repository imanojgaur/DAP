"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function OrderSuccessPopup() {
	const router = useRouter();
	const [countdown, setCountdown] = useState(5);

	useEffect(() => {
		// 1. Timer to redirect to home after 5 seconds
		const redirectTimer = setTimeout(() => {
			router.push("/");
		}, 5000);

		// 2. Visual countdown interval
		const interval = setInterval(() => {
			setCountdown((prev) => prev - 1);
		}, 1000);

		return () => {
			clearTimeout(redirectTimer);
			clearInterval(interval);
		};
	}, [router]);

	return (
		<>
			{/* Dark overlay to focus on the success message */}
			<div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[150] animate-in fade-in duration-500" />

			<div
				className="fixed z-[200] w-full bg-white shadow-2xl transition-all duration-500 ease-out 
                /* MOBILE: Center Card */
                bottom-0 left-0 rounded-t-[40px] p-10 pb-12 animate-in slide-in-from-bottom-full
                /* DESKTOP: Center Screen */
                md:top-1/2 md:left-1/2 md:bottom-auto md:right-auto md:-translate-x-1/2 md:-translate-y-1/2 md:w-[450px] md:rounded-[40px] md:zoom-in-95"
			>
				<div className="flex flex-col items-center text-center">
					<div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
						<CheckCircle2 className="h-10 w-10 text-green-700" />
					</div>

					<h2 className="text-5xl font-black italic mb-2 tracking-tighter text-gray-900">
						DAM!
					</h2>
					<p className="text-lg font-bold text-gray-800 mb-1">
						Order Placed Successfully
					</p>
					<p className="text-gray-500 text-sm mb-8">
						Taking you home in{" "}
						<span className="font-bold text-black">{countdown}s</span>...
					</p>

					<div className="flex flex-col gap-3 w-full">
						<Button
							asChild
							className="w-full h-14 rounded-full bg-black text-white font-bold text-lg"
						>
							<Link href="/orders">Track My Order</Link>
						</Button>
						<Button
							variant="ghost"
							asChild
							className="w-full h-12 text-gray-500 font-medium"
						>
							<Link href="/">Continue Shopping</Link>
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}
