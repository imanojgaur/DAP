"use server"

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function saveAddressAction(formData: FormData) {
	const session = await auth();
	if (!session?.user?.id) return { error: "Unauthorized" };

	const addressId = formData.get("addressId") as string; // Check for ID

	const data = {
		userId: session.user.id,
		street: `${formData.get("house")}, ${formData.get("road")}`,
		city: formData.get("city") as string,
		state: formData.get("state") as string,
		zipCode: formData.get("pincode") as string,
		type: "Billing" as const,
	};

	try {
		if (addressId) {
			// UPDATE WIRE
			await prisma.address.update({
				where: { id: addressId },
				data,
			});
		} else {
			// CREATE WIRE
			await prisma.address.create({ data });
		}

		revalidatePath("/address");
		return { success: true };
	} catch (error) {
		return { error: "Action failed" };
	}
}
