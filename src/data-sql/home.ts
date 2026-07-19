import prisma from "@/lib/backend/prisma"
import { Prisma } from "../../generated/prisma/client"
// import { withPrismaQuery } from "@/lib/prisma-catch-error";

//cooling down <T = unknown> 
export interface categoriesData {
    slug: string
    product_count: number
}

export async function getHomeCategories(categories: string[]){
    try{
        const data = await prisma.$queryRaw<categoriesData[]>`
        SELECT 
        c.slug, 
        COUNT(jcp."A") OVER(PARTITION BY c.slug) AS product_count
        FROM categories c
        LEFT JOIN "_CategoryToProduct" jcp ON c.id = jcp."A"
        WHERE c.name IN (${Prisma.join(categories)}) ; -- create secure parameter: ($1, $2, $3)
        `
        console.log(data);
        return data;
    } catch (e){
        console.error("Error fetching Home Categories: ", e)
        return { message: "fetching Home Categories failed"}
    }
}