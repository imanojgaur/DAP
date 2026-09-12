import { cn } from "@/utilities/utils";

// Search Icons
export const DoodleStickerSearch = ({ className }: { className?: string }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			focusable="false"
			aria-hidden="true"
			role="img"
			className={cn(
				"w-8 h-8 cursor-pointer hover:-translate-y-1 hover:text-teal-600 transition-all duration-300",
				className,
			)}
		>
			<defs>
				<filter id="search-shadow" x="-20%" y="-20%" width="140%" height="140%">
					<feDropShadow
						dx="1"
						dy="1"
						stdDeviation="1.5"
						floodColor="#000000"
						floodOpacity="0.3"
					/>
				</filter>
				<g
					id="search-doodle"
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M13.962 16.296a6.716 6.716 0 01-3.462.954 6.728 6.728 0 01-4.773-1.977A6.728 6.728 0 013.75 10.5c0-1.864.755-3.551 1.977-4.773A6.728 6.728 0 0110.5 3.75c1.864 0 3.551.755 4.773 1.977A6.728 6.728 0 0117.25 10.5a6.726 6.726 0 01-.921 3.407c-.517.882-.434 1.988.289 2.711l3.853 3.853" />
				</g>
			</defs>
			<use
				href="#search-doodle"
				stroke="#ffffff"
				strokeWidth="4"
				filter="url(#search-shadow)"
			/>
			<use href="#search-doodle" stroke="currentColor" strokeWidth="1.5" />
		</svg>
	);
};

export const HouseSearchIcon = ({ className }: { className?: string }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-label="Search Bar"
			focusable="false"
			className={cn(
				"w-12 h-12 hover:text-teal-600 transition-colors duration-300",
				className,
			)}
		>
			<path d="M3 10l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
			<path d="M9 22V12h6v10"></path>
			<path d="M17 5V3h3v5"></path>
			<circle cx="16" cy="16" r="5" fill="#ffffff" stroke="none" />
			<circle
				cx="16"
				cy="16"
				r="4"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
			></circle>
			<line x1="22" y1="22" x2="18.8" y2="18.8"></line>
		</svg>
	);
};

export const HandSearchDoodle = ({ className }: { className?: string }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 100 100"
			focusable="false"
			aria-label="Search Bar"
			className={cn(
				"w-24 h-24 hover:scale-105 transition-transform duration-300",
				className,
			)}
		>
			<circle cx="50" cy="50" r="40" fill="#FFF3C4" />
			<g
				fill="none"
				stroke="#111111"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<circle cx="45" cy="35" r="18" fill="#ffffff" />
				<path d="M22 25 Q15 35 25 48" />
				<path d="M18 20 Q8 35 20 52" />
				<path d="M40 52 L35 75 Q45 85 55 70" />
				<path d="M52 50 Q65 48 70 55 Q75 65 55 70" />
				<path d="M50 58 Q60 55 65 60 Q65 65 53 65" />
				<path d="M48 65 Q58 63 60 67 Q60 70 50 72" />
				<path d="M68 55 Q85 50 95 52" />
				<path d="M55 70 Q75 75 85 82" />
			</g>
		</svg>
	);
};

// User Account Icons
export const UserAccountIcon = ({ className }: { className?: string }) => (
	<svg
		aria-hidden="true"
		focusable="false"
		viewBox="0 0 24 24"
		role="img"
		className={cn(
			"w-6 h-6 text-[#111111] hover:text-gray-600 cursor-pointer transition-colors",
			className,
		)}
		fill="none"
	>
		<path
			stroke="currentColor"
			strokeWidth="1.5"
			d="M3.75 21v-3a3.75 3.75 0 013.75-3.75h9A3.75 3.75 0 0120.25 18v3M12 3.75a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z"
		></path>
	</svg>
);
