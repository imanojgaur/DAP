"use client";

import { useTransition } from "react";
import { updateOrderStatus } from "@/actions/view-orders";
import type { OrderStatus } from "../../../../generated/prisma/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function StatusDropdown({ orderId, currentStatus }: { orderId: string, currentStatus: OrderStatus }) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (newStatus: OrderStatus) => {
    startTransition(async () => {
      // Calls the Server Action we wrote in step 1
      await updateOrderStatus(orderId, newStatus);
    });
  };

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
    </Select>
  );
}