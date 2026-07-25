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

export async function getHomeProduct(homeCategory: 'home') {
    return await prisma.product.findFirst({
        where: {
            categories: { 
                some: {
                    slug: homeCategory,
                }
            }
        },
        select: { 
            id: true,
            name: true, 
            slug: true, 
            price: true, 
            compareAtPrice: true, 
            stockQuantity: true, 
        },
        take: 10, 
    })
    
}