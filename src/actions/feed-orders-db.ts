"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function placeOrderAction(addressId: string) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    try {
        // 1. Get the current cart items from DB
        const cartItems = await prisma.cartItem.findMany({
            where: { userId: session.user.id },
            include: { product: true }
        });

        if (cartItems.length === 0) return { error: "Cart is empty" };

        // 2. Calculate total price
        const totalPrice = cartItems.reduce((acc, item) => {
            return acc + (item.product.price * item.quantity);
        }, 0);

        // Verify address exists before starting transaction
        const addressExists = await prisma.address.findUnique({
            where: { id: addressId }
        });

        if (!addressExists) return { error: "Invalid delivery address selected." };

        // 3. Create the Order in a Transaction (all or nothing)
        const order = await prisma.$transaction(async (tx) => {
            // Create the main Order
           const newOrder = await tx.order.create({
                data: {
                    userId: session.user.id!, 
                    
                    // USE THE RAW ID FIELD NAME HERE
                    addressId: addressId, 
                    
                    totalPrice: totalPrice,
                    status: "PENDING",
                    sourceLocation: "Main Warehouse",
                    items: {
                        create: cartItems.map((item) => ({
                            plantId: item.plantId,
                            quantity: item.quantity,
                            priceAtPurchase: item.product.price,
                        })),
                    },
                },
            });

            // 4. Clear the database cart
            await tx.cartItem.deleteMany({
                where: { userId: session.user.id! }
            });

            return newOrder;
        });

        revalidatePath("/orders");
        return { success: true, orderId: order.id };

    } catch (error) {
        console.error("Order Error:", error);
        return { error: "Failed to place order. Please check your connection." };
    }
}