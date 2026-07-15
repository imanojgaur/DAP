import prisma from "@/lib/prisma"
import { Prisma } from "../../generated/prisma/client"
// import { withPrismaQuery } from "@/lib/prisma-catch-error";

export async function getHomeCategories(categories: string[]){
    try{
        const data = prisma.$queryRaw`
        SELECT 
        c.slug, 
        c.name, 
        COUNT(jcp.B) OVER(PARTITION BY c.id) AS product_count
        FROM categories c
        INNER JOIN _CategoryToProduct jcp ON c.id = jcp.A 
        WHERE c.name IN (${Prisma.join(categories)}) ; -- create secure parameter: ($1, $2, $3)
        `
        return data;
    } catch (e){
        console.error("Error fetching Home Categories", e)
        return { message: "fetching Home Categories failed"}
    }

    
    
}