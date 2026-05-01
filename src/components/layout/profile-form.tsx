"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export function ProfileForm({
	user,
	onSubmit,
}: {
	user: any;
	onSubmit?: () => void;
}) {
	const [firstName, ...lastNameArr] = (user.name || "").split(" ");
	const lastName = lastNameArr.join(" ");

	return (
		<div className="flex h-full flex-col">
			<div className="flex-1 space-y-6 px-6 py-6 overflow-y-auto">
				<div className="space-y-4">
					<div className="space-y-1.5">
						<Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
							First Name*
						</Label>
						<Input
							defaultValue={firstName}
							className="h-12 border-gray-300 focus-visible:ring-black"
						/>
					</div>
					<div className="space-y-1.5">
						<Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
							Last Name*
						</Label>
						<Input
							defaultValue={lastName}
							className="h-12 border-gray-300 focus-visible:ring-black"
						/>
					</div>
					<div className="space-y-1.5">
						<Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
							Shopping Preference*
						</Label>
						<Select defaultValue="mens">
							<SelectTrigger className="h-12 border-gray-300 focus:ring-black">
								<SelectValue placeholder="Select preference" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="mens">Men's / Indoor</SelectItem>
								<SelectItem value="womens">Women's / Outdoor</SelectItem>
								<SelectItem value="both">Everything</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				<hr className="border-gray-100" />

				{/* Locked Fields */}
				<div className="space-y-4 opacity-70">
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-1.5">
							<Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
								DOB (Locked)
							</Label>
							<Input
								defaultValue="20-05-2002"
								disabled
								className="h-12 bg-gray-50 cursor-not-allowed"
							/>
						</div>
						<div className="space-y-1.5">
							<Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
								Phone (Locked)
							</Label>
							<Input
								defaultValue={user.phoneNumber || "+1 000-0000"}
								disabled
								className="h-12 bg-gray-50 cursor-not-allowed"
							/>
						</div>
					</div>
					<div className="space-y-1.5">
						<Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
							Email Address*
						</Label>
						<Input
							defaultValue={user.email}
							disabled
							className="h-12 bg-gray-50 cursor-not-allowed"
						/>
					</div>
				</div>
			</div>

			{/* Sticky Bottom Actions */}
			<div className="border-t border-gray-100 bg-white p-6 pb-8 space-y-3">
				<Button
					type="button"
					onClick={onSubmit}
					className="w-full h-14 rounded-full bg-black text-white hover:bg-gray-800 text-base font-medium"
				>
					Update Details
				</Button>
				<Button
					type="button"
					variant="ghost"
					className="w-full text-gray-500 hover:text-black font-medium"
				>
					Delete Account
				</Button>
			</div>
		</div>
	);
}
