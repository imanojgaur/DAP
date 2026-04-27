"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getUserAddresses() {
    const session = await auth();
    if (!session?.user?.id) return [];

    return prisma.address.findMany({
        where: { userId: session.user.id },
        orderBy: { id: 'desc' } // Most recent first
    });
}

export async function saveAddressAction(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    try {
        await prisma.address.create({
            data: {
                userId: session.user.id,
                street: `${formData.get("house")}, ${formData.get("road")}`,
                city: formData.get("city") as string,
                state: formData.get("state") as string,
                zipCode: formData.get("pincode") as string,
                type: "Billing", // Defaulting to HOME for now based on schema
            }
        });
        
        revalidatePath("/checkout");
        return { success: true };
    } catch (error) {
        return { error: "Failed to save address" };
    }
}