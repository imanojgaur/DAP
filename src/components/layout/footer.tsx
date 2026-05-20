import Link from "next/link";

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="w-full bg-white border-t border-gray-100 pb-12 pt-8">
			{/* Using max-w-7xl to match standard page gutters for a "good gap" */}
			<div className="max-w-7xl mx-auto px-6 md:px-10">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
					{/* Left Side: Copyright */}
					<div className="text-sm font-bold uppercase tracking-tight text-black">
						© {currentYear} DAP, Inc. All rights reserved
					</div>

					{/* Right Side: Policy Links */}
					<nav className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm font-bold text-gray-400 uppercase tracking-tight">
						<Link
							href="/terms"
							className="hover:text-black transition-colors duration-200"
						>
							Terms of Use
						</Link>
						<Link
							href="/privacy-policy"
							className="hover:text-black transition-colors duration-200"
						>
							Privacy Policy
						</Link>
						<Link
							href="/claim-policy"
							className="hover:text-black transition-colors duration-200"
						>
							Store Claim Policy
						</Link>
					</nav>
				</div>
			</div>
		</footer>
	);
}
