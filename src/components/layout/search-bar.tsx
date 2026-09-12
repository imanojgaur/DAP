import { DoodleStickerSearch } from "./layout-icon";

export function Search() {
	return (
		<div className="group/search  bg-white hover:bg-white/80 rounded-full pl-2 pr-5 py-1 cursor-pointer">
			<div className="flex justify-center items-center gap-3 ">
				<DoodleStickerSearch className="hover:text-black hover:translate-y-0" />
				<span className="font-[500] text-sm">Search...</span>
			</div>
		</div>
	);
}
