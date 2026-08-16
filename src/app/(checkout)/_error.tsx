// "use client";

// import { AlertCircle, ArrowLeft } from "lucide-react";
// import Link from "next/link";

// export default function CheckoutError({
// 	error,
// 	reset,
// }: {
// 	error: Error & { digest?: string };
// 	reset: () => void;
// }) {
// 	return (
// 		<div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
// 			<div className="max-w-md w-full text-center space-y-6">
// 				<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-500/10">
// 					<AlertCircle className="h-8 w-8 text-orange-600" strokeWidth={1.5} />
// 				</div>

// 				<div className="space-y-2">
// 					<h2 className="text-2xl font-semibold tracking-tight text-foreground">
// 						Checkout is temporarily paused
// 					</h2>
// 					<p className="text-muted-foreground font-light leading-relaxed">
// 						We are currently unable to securely process payments due to a
// 						gateway connection issue. No charges have been made to your account.
// 					</p>
// 				</div>

// 				<div className="pt-4 border-t border-border/50">
// 					<p className="text-sm font-medium text-foreground mb-4">
// 						Till then, feel free to explore the rest of the store.
// 					</p>

// 					<Link
// 						href="/"
// 						className="inline-flex items-center justify-center gap-2 rounded-full bg-muted px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/80"
// 					>
// 						<ArrowLeft className="h-4 w-4" />
// 						Explore the site
// 					</Link>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
