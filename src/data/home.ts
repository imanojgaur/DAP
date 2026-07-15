import prisma from "@/lib/prisma";

export async function getHomeCategories(){
    return await prisma.category.findMany({});
}

//  name, slug, productCount, imageSrc, className = "" }: CategoryCardProps) 
