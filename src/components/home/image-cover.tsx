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
                w-full h-full md:flex-1
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
