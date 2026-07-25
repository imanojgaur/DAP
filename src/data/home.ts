import prisma from "@/lib/backend/prisma";

export async function getHomeCategories(slug: string[]){
    return await prisma.category.findMany({
        where: {
            slug: {
                in: slug,
            }
        },
        select: {
            name: true,
            slug: true, 
            _count: {
                select: {
                    products: true
                }
            }
        }
    })
    
};
    // no prisma aliasing allowed: {rename _count: product_count}