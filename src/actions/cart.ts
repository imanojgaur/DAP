"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function syncCartAction(localItems: any[]) {
	// 1. Get the session
	const session = await auth();

	// Extract the ID to a constant immediately to satisfy TypeScript's strict null checks
	const userId = session?.user?.id;

	// If there is no valid userId string, reject it
	if (!userId) {
		return { success: false, error: "Unauthorized" };
	}

	try {
		// 2. Perform a lightning-fast upsert for each item
		const syncPromises = localItems.map((item) =>
			prisma.cartItem.upsert({
				where: {
					// Use our new @@unique constraint compound key
					userId_plantId: {
						userId: userId, // <-- TS knows this is 100% a string now
						plantId: item.id,
					},
				},
				update: {
					// If it exists, update the quantity
					quantity: item.quantity,
				},
				create: {
					// If it doesn't exist, create the whole row
					userId: userId, // <-- TS knows this is 100% a string now
					plantId: item.id,
					quantity: item.quantity,
				},
			}),
		);

		await Promise.all(syncPromises);

		return { success: true };
	} catch (error) {
		console.error("Cart sync failed:", error);
		return { success: false, error: "Failed to sync cart" };
	}
}
