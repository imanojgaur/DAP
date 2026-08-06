"use client";

import { useTransition } from "react";
import { updateOrderStatus } from "@/actions/view-orders";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { OrderStatus } from "../../../../generated/prisma/client";

export function StatusDropdown({

	return (
<Select
	defaultValue={currentStatus}
	onValueChange={handleStatusChange}
	disabled={isPending}
>
	<SelectTrigger className="w-[180px]">
		<SelectValue placeholder="Select status" />
	</SelectTrigger>
	<SelectContent>
		<SelectItem value={`PENDING`}>Pending</SelectItem>
		<SelectItem value={`PROCESSING`}>Processing</SelectItem>
		<SelectItem value={`SHIPPED`}>Shipped</SelectItem>
		<SelectItem value={`DELIVERED`}>Delivered</SelectItem>
		<SelectItem value={`CANCELLED`}>Cancelled</SelectItem>
	</SelectContent>
</Select>;
)
}
