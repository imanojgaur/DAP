import Link from "next/link";

export interface BaseProps {
	endPoint: string;
	className?: string;
}

interface OverlayProps {
	overlayContent: React.ReactNode;
	productFragment?: never;
}

interface FragmentProps {
	productFragment: React.ReactNode;
	overlayContent?: never;
}

// Mutually exclusive content
type Content = OverlayProps | FragmentProps;

interface HorizontalImgScroller {
	imgScroller: React.ReactNode;
	dynamicImgGrid?: never;
}

interface DynamicImgGrid {
	dynamicImgGrid: React.ReactNode;
	imgScroller?: never;
}
// Mutually exclusive Images Layout
type ImageLayout = HorizontalImgScroller | DynamicImgGrid;

type ImageCoverProps = BaseProps & Content & ImageLayout;

export function ImageCover({
	endPoint,
	className,
	overlayContent,
	productFragment,
	imgScroller,
	dynamicImgGrid,
}: ImageCoverProps) {
	return (
		<>
			<div
				className={`
                group relative z-10 hover:z-50 transform-gpu break-inside-avoid 
                shrink-0 min-w-[40vw] w-[222px] md:min-w-[23vw] md:flex-1
                mb-3 md:mb-0   
                ${className}
         
                transition-transform duration-700 ease-out hover:-translate-y-2
            `}
			>
				{/* 2. THE FAKE SHADOW DIV */}
				<div className="absolute inset-0 rounded-[1.5rem] md:rounded-[2.5rem] shadow-[0_0_10px_10px_rgba(16,185,129,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none -z-10" />

				{/* 3. THE ACTUAL CARD  */}
				<div
					className="group
                    relative flex flex-col justify-end w-full h-full 
                    bg-gray-900 overflow-hidden p-6 md:p-10
                    rounded-[1.5rem] md:rounded-[2.5rem] 
                    min-h-[250px] md:!min-h-[350px]
                    shadow-lg
                "
				>
					{/* Background Image Carousel*/}
					{dynamicImgGrid ? dynamicImgGrid : imgScroller}

					{/* {sibling link} */}
					<Link 
					href={endPoint}
					className="absolute inset-0 z-20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500"
					>
						<span className="sr-only">Go to {endPoint}</span>
					</Link>
					{/* Content Overlay*/}
					{overlayContent && (
						<div className="relative z-20 pointer-events-none transform transition-transform duration-700 ease-out group-hover:-translate-y-2">
							{overlayContent}
						</div>
					)}
				</div>
			</div>
			{productFragment && <div className="mt-2 px-2">{productFragment}</div>}
		</>
	);
}

export interface OverlayTextProps {
	title: string;
	subtitle: string;
	callToActionText: string;
}

export function OverlayText({
	title,
	subtitle,
	callToActionText,
}: OverlayTextProps) {
	return (
		<>
			<span className="text-white/70 group-hover:text-emerald-400 group-hover:drop-shadow-[0_0_10px_rgba(52,211,153,0.8)] transition-all duration-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-1.5 block">
				{subtitle}
			</span>

			{/* Heading */}
			<h3 className="text-2xl md:text-4xl font-black italic text-white uppercase tracking-tighter leading-none mb-3 drop-shadow-lg transition-all duration-1000 delay-300 ease-out group-hover:delay-0 group-hover:duration-500 group-hover:translate-x-2 group-hover:tracking-[0.05em]">
				{title}
			</h3>

			{/* {blur out text at hover} */}
			<div className="flex items-center gap-2 md:gap-3 overflow-hidden">
				<span className="h-[2px] w-0 bg-gradient-to-r from-emerald-400 to-green-300 group-hover:w-10 transition-all duration-500 ease-out rounded-full shadow-[0_0_12px_rgba(52,211,153,1)]" />

				<span className="flex items-center gap-1 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)] text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-75">
					{callToActionText}
					<svg
						aria-hidden="true"
						className="w-3.5 h-3.5 md:w-4 md:h-4 ml-1 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-150"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={3}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M14 5l7 7m0 0l-7 7m7-7H3"
						/>
					</svg>
				</span>
			</div>
		</>
	);
}
