import { cache } from "react";
import prisma from "@/lib/prisma";

export const getProductBySlug = cache(async (slug: string) => {
	try {
		// 1. The return goes INSIDE the try block
		const product = await prisma.product.findUnique({
			where: { slug },
			include: {
				images: {
					orderBy: { isPrimary: "desc" },
				},
				categories: {
					select: {
						name: true,
						slug: true,
					},
				},
				reviews: {
					take: 4,
					orderBy: { date: "desc" },
				},
			},
		});

		// 2. If plant doesn't exist, product is already `null` here. We just return it.
		return product;
	} catch (error) {
		// 3. This ONLY runs if actual database crashes
		console.error("Database Error:", error);
		return null;
	}
});
