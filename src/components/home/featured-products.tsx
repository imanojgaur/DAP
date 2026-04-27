import { getFeaturedProducts } from "@/actions/home";
import { ProductCard } from "@/components/collections/product-card"; 
import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";

export async function FeaturedProducts() {
    const products = await getFeaturedProducts();

    if (!products || products.length === 0) return null;

    return (
        <section className="max-w-[1600px] mx-auto px-4 md:px-8 py-20">
             <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase">Fresh Arrivals</h2>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">The latest from our greenhouse</p>
                </div>
                <Link href={ROUTES.CATEGORIES.ROOT} className="font-black uppercase tracking-tighter border-b-2 border-black pb-1 hover:text-green-700 hover:border-green-700 transition-all">
                    View All
                </Link>
            </div>

            <div className="flex overflow-x-auto pb-10 gap-6 snap-x hide-scrollbar md:grid md:grid-cols-4 md:overflow-visible">
                {products.map((product) => {
                    // Normalize the product object for the ProductCard component
                    const normalizedProduct = {
                        ...product,
                        // Ensure price is converted from 71900 to 719 for display if your ProductCard handles it
                        // Or keep it as is if formatPrice handles subunits (multiply by 100 was seen in previous code)
                        price: product.price
                    };

                    return (
                        <div key={product.id} className="shrink-0 w-[300px] snap-start md:w-full">
                            <ProductCard plant={normalizedProduct as any} />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}