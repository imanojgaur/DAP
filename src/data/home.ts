import prisma from "@/lib/backend/prisma";

export async function getHomeCategories(slug: string[]) {
	return await prisma.category.findMany({
		where: {
			slug: {
				in: slug,
			},
		},
		select: {
			name: true,
			slug: true,
			_count: {
				select: {
					products: true,
				},
			},
		},
	});
}

export async function getHomeProduct(homeCategory: "home") {
	return await prisma.product.findMany({
		where: {
			categories: {
				some: {
					slug: homeCategory,
				},
			},
		},
		select: {
			id: true,
			name: true,
			slug: true,
			price: true,
			compareAtPrice: true,
			stockQuantity: true,
			totalReviews: true, 
			averageRating: true, 
			images: {
				select: {
					publicId: true,
					height: true,
					width: true,
					isPrimary: true, 
				},
			},
		},
		take: 20,
	});
}
