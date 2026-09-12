import Link from "next/link";
import { navConfig } from "@/config/nav-config";
import { cn } from "@/utilities/utils";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

export function DesktopNav() {
	return (
		<NavigationMenu className="hidden md:flex">
			<NavigationMenuList>
				{navConfig?.map((navHeading) => {
					const contCols = navHeading.items?.length;
					return (
						<NavigationMenuItem key={navHeading.title}>
							{
								contCols ? (
									// Handle dropdown triggers
									<>
										<NavigationMenuTrigger className="cursor-pointer bg-white rounded-full data-[state=open]:bg-slate-100 data-[state=open]:text-gray-700 transition-colors">
											{navHeading.title}
										</NavigationMenuTrigger>

										<NavigationMenuContent>
											<div className="grid grid-cols-[1fr_auto_1fr] w-screen max-w-[1920px] mt-10 mb-5 mx-auto">
												{/*Left spacer */}
												<div />
												{/* Main Content */}
												<div
													style={
														{
															gridTemplateColumns: `repeat(${contCols}, minmax(0, 1fr))`,
														} as React.CSSProperties
													}
													className="grid gap-20 justify-center"
												>
													{navHeading.items
														? navHeading.items.map((contCol) => (
																<div
																	key={contCol.title}
																	className="flex flex-col"
																>
																	<h4 className="cursor-pointer text-gray-700 hover:text-gray-500 font-bold text-sm px-4 mb-4">
																		{contCol.title}
																	</h4>
																	<ul key={contCol.title}>
																		{contCol.items
																			? contCol.items.map((item) => (
																					<ListItem
																						key={item.title}
																						href={item.href}
																						title={item.title}
																						className="line-clamp-0 px-4 text-gray-500 text-sm hover:text-gray-900"
																					/>
																				))
																			: null}
																	</ul>
																</div>
															))
														: null}
												</div>
												{/* right spacer */}
												<div />
											</div>
										</NavigationMenuContent>
									</>
								) : null
								// // Handle direct links
								// <NavigationMenuLink asChild className={cn(
								//     navigationMenuTriggerStyle(),
								//     "bg-white rounded-full px-4 py-2 h-auto hover:bg-gray-100"
								// )}>
								//     <Link href={navHeading.href}>{navHeading.title}</Link>
								// </NavigationMenuLink>
							}
						</NavigationMenuItem>
					);
				})}
			</NavigationMenuList>
		</NavigationMenu>
	);
}

function ListItem({
	className,
	title,
	children,
	href,
	...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
	return (
		<li {...props}>
			<NavigationMenuLink asChild>
				<Link href={href} className="px-0 hover:bg-white">
					<div
						className={cn(
							"flex flex-col justify-center item-center gap-1",
							className,
						)}
					>
						<div className="leading-none font-medium">{title}</div>
						<div className="line-clamp-2 text-muted-foreground">{children}</div>
					</div>
				</Link>
			</NavigationMenuLink>
		</li>
	);
}
