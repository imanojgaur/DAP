"use client";

import { useState } from "react";
import { saveAddressAction } from "@/actions/address";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";

export function AddressSheet({
	user,
	autoOpen = false,
	label = "+ Add New Address",
	address, // <--- Added this prop
}: {
	address?: any;
	user: any;
	autoOpen?: boolean;
	label?: React.ReactNode;
}) {
	const [isOpen, setIsOpen] = useState(autoOpen);
	const [isLoading, setIsLoading] = useState(false);

	// Split street into house and road for the form inputs
	const streetParts = address?.street?.split(",") || [];
	const houseValue = streetParts[0]?.trim() || "";
	const roadValue = streetParts.slice(1).join(",").trim() || "";

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setIsLoading(true);
		const formData = new FormData(e.currentTarget);

		// If we are editing, we manually append the ID so the Server Action knows to UPDATE
		if (address?.id) formData.append("addressId", address.id);

		const result = await saveAddressAction(formData);

		if (result?.error) {
			alert(result.error);
		} else {
			setIsOpen(false);
		}
		setIsLoading(false);
	}

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<div className="cursor-pointer w-full">{label}</div>
			</SheetTrigger>
			<SheetContent className="w-full sm:max-w-md p-0 overflow-y-auto bg-white flex flex-col">
				<SheetHeader className="p-6 border-b border-gray-100">
					<SheetTitle className="text-xl font-medium">
						{address ? "Edit Address" : "Add New Address"}
					</SheetTitle>
				</SheetHeader>

				<form onSubmit={onSubmit} className="flex-1 flex flex-col">
					<div className="p-6 space-y-6 flex-1">
						<div className="space-y-4">
							<h3 className="font-bold text-gray-900">Address</h3>
							<div className="space-y-1.5">
								<Label className="text-xs text-gray-500">Pincode</Label>
								<Input
									name="pincode"
									defaultValue={address?.zipCode}
									required
									className="h-12 border-gray-300"
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-1.5">
									<Label className="text-xs text-gray-500">City</Label>
									<Input
										name="city"
										defaultValue={address?.city}
										required
										className="h-12 border-gray-300"
									/>
								</div>
								<div className="space-y-1.5">
									<Label className="text-xs text-gray-500">State</Label>
									<Input
										name="state"
										defaultValue={address?.state}
										required
										className="h-12 border-gray-300"
									/>
								</div>
							</div>
							<div className="space-y-1.5">
								<Label className="text-xs text-gray-500">
									House/ Flat/ Office No.
								</Label>
								<Input
									name="house"
									defaultValue={houseValue}
									required
									className="h-12 border-gray-300"
								/>
							</div>
							<div className="space-y-1.5">
								<Label className="text-xs text-gray-500">
									Road Name/ Area /Colony
								</Label>
								<Input
									name="road"
									defaultValue={roadValue}
									required
									className="h-12 border-gray-300"
								/>
							</div>
						</div>

						<div className="flex items-center justify-between py-4 border-y border-gray-100 my-6">
							<Label
								htmlFor="isDefault"
								className="text-sm font-medium text-gray-900 cursor-pointer"
							>
								Use as default address
							</Label>
							<Switch id="isDefault" name="isDefault" defaultChecked />
						</div>

						<div className="space-y-4">
							<h3 className="font-bold text-gray-900">Contact</h3>
							<div className="space-y-1.5">
								<Label className="text-xs text-gray-500">Name</Label>
								<Input
									name="name"
									defaultValue={user?.name}
									required
									className="h-12 border-gray-300"
								/>
							</div>
							<div className="space-y-1.5">
								<Label className="text-xs text-gray-500">Phone</Label>
								<Input
									name="phone"
									defaultValue={user?.phoneNumber}
									required
									className="h-12 border-gray-300"
								/>
							</div>
						</div>
					</div>

					<div className="p-6 border-t border-gray-100 bg-white">
						<Button
							disabled={isLoading}
							type="submit"
							className="w-full h-14 rounded-full bg-[#111] text-white hover:bg-black font-medium text-lg"
						>
							{isLoading
								? "Saving..."
								: address
									? "Update Address"
									: "Ship to this Address"}
						</Button>
					</div>
				</form>
			</SheetContent>
		</Sheet>
	);
}
