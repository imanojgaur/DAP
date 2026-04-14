import { cleanPlantSlug } from "@/lib";
import { ProductGallery } from "@/components/products/product-gallery";
import { getProductBySlug } from "@/data";
import { notFound } from "next/navigation";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {

    const slug = (await params).slug;
    const productName = cleanPlantSlug(slug);
    const pageName = productName.replace(/[-]/g," ");
    const product = await getProductBySlug(slug)

    if (!product) notFound(); 
    

    return (
        <section> 
            <h1 className="font-bold text-3l capitalize border-4 mx-8 my-4 p-2  rounded-full w-fit">{pageName}</h1>
            <ProductGallery images={product.images}/> 
        </section>
    )
}