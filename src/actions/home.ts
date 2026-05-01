"use server";

import prisma from "@/lib/prisma";

export async function getFeaturedProducts() {
	try {
		return await prisma.product.findMany({
			// Changed from plant to product
			take: 8,
			include: {
				images: true,
				categories: true,
			},
			orderBy: { createdAt: "desc" },
		});
	} catch (error) {
		console.error("Database error in getFeaturedProducts:", error);
		return [];
	}
}

export async function getHomeCategories() {
	try {
		return await prisma.category.findMany({
			take: 3,
			include: {
				_count: {
					select: { products: true }, // Matches your schema relation name
				},
			},
		});
	} catch (error) {
		console.error("Database error in getHomeCategories:", error);
		return [];
	}
}
