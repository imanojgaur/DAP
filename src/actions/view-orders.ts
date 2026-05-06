"use server";

import prisma from "@/lib/prisma";
import type { OrderStatus } from "@../../../generated/prisma/client";
import { revalidatePath } from "next/cache";

// 1. Fetch orders for a specific customer
export async function getCustomerOrders(userId: string) {
  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: { product: true } 
        }
      },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: orders };
  } catch (error) {
    return { success: false, error: "Failed to fetch orders" };
  }
}

// 2. Fetch ALL orders for the Admin dashboard
export async function getAllAdminOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: { user: true }, // See who ordered it
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: orders };
  } catch (error) {
    return { success: false, error: "Failed to fetch all orders" };
  }
}

// 3. Update the Order Status (Admin only)
export async function updateOrderStatus(orderId: string, newStatus: OrderStatus) {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus },
    });

    // Here is where you would trigger Nodemailer if newStatus === 'SHIPPED'!

    // Force Next.js to refresh the pages so the UI updates instantly
    revalidatePath("/admin/orders");
    revalidatePath("/my-orders");

    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update status" };
  }
}