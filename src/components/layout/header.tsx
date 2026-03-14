import { Logo } from "../shared/logo";
import { CartDrawer } from "./cart";
import MobileNav from "./mobile-nav";
import { Navbar } from "./navbar";
import { SearchBar } from "./search-bar";

export default function Header() {
	return (
		<>
			<Logo />
			<Navbar />
			<SearchBar />
			<MobileNav />
			<CartDrawer />
		</>
	);
}
