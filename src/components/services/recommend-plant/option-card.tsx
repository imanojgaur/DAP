import type React from "react";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface OptionCardProps {
	title: React.ReactNode;
	description: string;
	isSelected: boolean;
	onClick: () => void;
}

export function OptionCard({
	title,
	description,
	isSelected,
	onClick,
}: OptionCardProps) {
	return (
		<Card
			className={`cursor-pointer transition-all hover:border-green-500 ${
				isSelected
					? "border-green-600 bg-green-50/50 ring-1 ring-green-600"
					: ""
			}`}
			onClick={onClick}
		>
			<CardHeader>
				<CardTitle className="text-base flex items-center gap-2">
					{title}
				</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
		</Card>
	);
}
