import { redirect } from "next/navigation";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function getCheckoutAddresses() {
	const session = await auth();

	// 1. If not logged in -> Redirect to login page instantly
	if (!session?.user?.id) {
		redirect("/login?callbackUrl=/address");
	}

	// 2. If logged in -> Fetch their addresses
	const addresses = await prisma.address.findMany({
		where: { userId: session.user.id },
		orderBy: { id: "desc" },
	});

	// 3. Return the user and addresses to the client
	return {
		user: session.user,
		addresses: addresses,
	};
}
