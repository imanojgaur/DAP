import "./globals.css";
import { ArrowRight, Compass } from "lucide-react";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function GlobalNotFound() {
	return (
		<html lang="en" className={inter.className}>
			<body className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground antialiased">
				<div className="flex flex-col items-center text-center px-6 max-w-2xl">
					<div className="mb-6 rounded-full bg-muted/50 p-4">
						<Compass
							className="h-10 w-10 text-muted-foreground"
							strokeWidth={1}
						/>
					</div>

					<h1 className="text-4xl font-light tracking-tight mb-4">
						Looks like you wandered off the path.
					</h1>
					<p className="text-muted-foreground text-lg font-light mb-10 max-w-lg">
						We couldn't find the page you were looking for. We think you
						probably wanted to go to our homepage, or let us show you our latest
						curated collections.
					</p>

					<div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
						<Link
							href="/"
							className="w-full sm:w-auto px-8 py-3 rounded-full bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
						>
							Return Homepage
						</Link>

						<Link
							href="/collections/new-and-featured"
							className="group flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-3 rounded-full border border-border bg-background font-medium hover:border-foreground/50 transition-colors"
						>
							View Latest Collections
							<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Link>
					</div>
				</div>
			</body>
		</html>
	);
}
