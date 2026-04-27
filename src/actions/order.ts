"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function placeOrderAction(addressId: string) {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };
    const userId = session.user.id;

    try {
        // 1. We use a Prisma Transaction. If any step fails, the whole thing rolls back.
        const orderId = await prisma.$transaction(async (tx) => {
            
            // 2. Fetch the user's DB cart AND the live product prices
            const cartItems = await tx.cartItem.findMany({
                where: { userId },
                include: { product: true }
            });

            if (cartItems.length === 0) throw new Error("Cart is empty");

            // 3. Calculate the true, secure total from the DB
            const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

            // 4. Create the main Order and all the OrderItems at the exact same time
            const order = await tx.order.create({
                data: {
                    userId,
                    addressId, // The missing link we just added!
                    totalPrice: total,
                    sourceLocation: "MAIN_WAREHOUSE", // Default warehouse
                    items: {
                        create: cartItems.map(item => ({
                            plantId: item.plantId,
                            quantity: item.quantity,
                            priceAtPurchase: item.product.price // Lock in the price!
                        }))
                    }
                }
            });

            // 5. Empty the user's cart now that the order is placed
            await tx.cartItem.deleteMany({
                where: { userId }
            });

            return order.id;
        });

        return { success: true, orderId };
    } catch (error: any) {
        console.error("Order failed:", error);
        return { success: false, error: error.message };
    }
}