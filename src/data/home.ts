import prisma from "@/lib/backend/prisma";

export async function getHomeCategories(){
    return await prisma.category.findMany({});
}

//  name, slug, productCount, imageSrc, className = "" }: CategoryCardProps) 
