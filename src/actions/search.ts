"use server";

import prisma from '@/lib/prisma';

export async function getUnifiedSearchData() {
    try {
        // Parallel fetching for speed
        const [plants, categories] = await Promise.all([
            prisma.plant.findMany({
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    price: true,
                    images: { where: { isPrimary: true }, take: 1, select: { publicId: true, secureUrl: true } }
                }
            }),
            prisma.plantCategory.findMany({
                select: { id: true, name: true, slug: true }
            })
        ]);

        return { plants, categories };
    } catch (error) {
        console.error("Search fetch error:", error);
        return { plants: [], categories: [] };
    }
}