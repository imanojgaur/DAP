"use client";

import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function ShopError({
	// error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	// log to error tracking service : datadog/sanatry
	// useEffect(() => {
	// 	// console.error("Shop section error:", error);
	// }, [error]);

	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	function handleReset() {
		startTransition(() => {
			reset();
			router.refresh();
		});
	}

	return (
		<div className="flex min-h-[60vh] flex-col items-center justify-center px-6">
			<div className="max-w-md w-full text-center space-y-6">
				<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted/50 border border-border/50">
					<RefreshCcw
						className={`h-6 w-6 text-muted-foreground ${isPending ? "animate-spin" : ""}`}
						strokeWidth={1.5}
					/>
				</div>

				<div className="space-y-3">
					<h2 className="text-2xl font-light tracking-tight text-foreground">
						We hit a small snag.
					</h2>
					<p className="text-muted-foreground font-light leading-relaxed">
						We're having trouble loading this section of the store right now.
						It's likely a temporary network hiccup.
					</p>
				</div>

				<div className="pt-2">
					<button
						type="button"
						onClick={handleReset}
						disabled={isPending}
						className="inline-flex items-center justify-center rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
					>
						{isPending ? "loading...." : "Try loading again"}
					</button>
				</div>
			</div>
		</div>
	);
}
