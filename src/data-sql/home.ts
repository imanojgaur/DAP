import prisma from "@/lib/backend/prisma"
import { Prisma } from "../../generated/prisma/client"
// import { withPrismaQuery } from "@/lib/prisma-catch-error";

//cooling down <T = unknown> 
export interface categoriesData {
    name: string
    slug: string
    product_count: number
}

// perfect for smaller datasets . 
export async function getHomeCategories(sluges: string[]){
    try{
        const data = await prisma.$queryRaw<categoriesData[]>`
        SELECT 
        c.name,
        c.slug, 
        COUNT(jcp."B"):: INTEGER AS product_count
        FROM categories c
        LEFT JOIN "_CategoryToProduct" jcp ON c.id = jcp."A"
        WHERE c.slug IN (${Prisma.join(sluges)})  -- create secure parameter: ($1, $2, $3)
        GROUP BY c.id, c.name, c.slug;`;
        return data;
    } catch (e){
        console.error("Error fetching Home Categories: ", e)
        return { message: "fetching Home Categories failed"}
    }
}
