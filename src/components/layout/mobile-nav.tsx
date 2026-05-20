"use client";

import {
	ChevronLeft,
	ChevronRight,
	HelpCircle,
	LogOut,
	Menu,
} from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { navConfig, siteName } from "@/config/nav-config";
import type { NavItem } from "@/types/nav";
import { ProfileEditorSheet } from "./profile-editor-sheet";

type NavLevel = { title: string; items: NavItem[] };

export default function MobileNav() {
	const { data: session } = useSession();
	const [menuStack, setMenuStack] = useState<NavLevel[]>([
		{ title: siteName, items: navConfig },
	]);

	const currentView = menuStack[menuStack.length - 1];
	const isRoot = menuStack.length === 1;

	const handleForward = (item: NavItem) => {
		if (item.items)
			setMenuStack([...menuStack, { title: item.title, items: item.items }]);
	};
	const handleBack = () => {
		if (menuStack.length > 1) setMenuStack(menuStack.slice(0, -1));
	};
	const handleOpenChange = (open: boolean) => {
		if (!open)
			setTimeout(
				() => setMenuStack([{ title: siteName, items: navConfig }]),
				300,
			);
	};

	return (
		<Sheet onOpenChange={handleOpenChange}>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="md:hidden">
					<Menu className="h-6 w-6" />
					<span className="sr-only">Toggle mobile menu</span>
				</Button>
			</SheetTrigger>

			<SheetContent
				side="right"
				className="w-[85vw] sm:w-[400px] p-0 flex flex-col bg-white"
			>
				<SheetTitle className="sr-only">Navigation Menu</SheetTitle>

				<SheetHeader className="flex flex-col items-start px-6 pt-8 pb-6 border-b border-gray-100">
					{!isRoot && (
						<div className="flex h-8 w-full items-center mb-4">
							<button
								type="button"
								onClick={handleBack}
								className="-ml-2 flex items-center text-sm font-medium text-gray-500 hover:text-black"
							>
								<ChevronLeft className="h-5 w-5 mr-1" /> Back
							</button>
						</div>
					)}

					{isRoot && session?.user ? (
						<div className="flex w-full items-center gap-4">
							{/* Column 1: The Avatar with Pencil (Imports Sheet) */}
							<ProfileEditorSheet user={session.user} />

							{/* Column 2: The Text Stack */}
							<div className="flex flex-col text-left justify-center pt-1">
								<span className="text-lg font-medium text-black leading-none mb-1.5">
									Hi, {session.user.name?.split(" ")[0] || "There"}
								</span>
								<span className="text-sm text-gray-500 font-normal leading-none">
									{session.user.phoneNumber || session.user.email}
								</span>
							</div>
						</div>
					) : (
						<SheetTitle className="mt-2 text-2xl font-black text-left">
							{currentView.title}
						</SheetTitle>
					)}
				</SheetHeader>

				<ScrollArea className="flex-1">
					<div className="flex flex-col px-6 py-2">
						{currentView.items.map((item) => (
							<div
								key={item.title}
								className="border-b border-gray-100 last:border-0"
							>
								{item.items ? (
									<button
										type="button"
										onClick={() => handleForward(item)}
										className="flex w-full items-center justify-between py-4 text-left text-base font-medium hover:text-gray-600 transition-colors"
									>
										{item.title}{" "}
										<ChevronRight className="h-5 w-5 text-gray-400" />
									</button>
								) : (
									<SheetClose asChild>
										<Link
											href={item.href || "#"}
											className="block w-full py-4 text-left text-base font-medium hover:text-gray-600 transition-colors"
										>
											{item.title}
										</Link>
									</SheetClose>
								)}
							</div>
						))}
					</div>
				</ScrollArea>

				<div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-4">
					<Button
						variant="ghost"
						className="w-full justify-start text-gray-600 font-medium px-0 hover:bg-transparent hover:text-black"
					>
						<HelpCircle className="h-5 w-5 mr-3" /> Help
					</Button>
					{session?.user && (
						<Button
							variant="ghost"
							onClick={() => signOut()}
							className="w-full justify-start text-gray-600 font-medium px-0 hover:bg-transparent hover:text-black"
						>
							<LogOut className="h-5 w-5 mr-3" /> Logout
						</Button>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
}
