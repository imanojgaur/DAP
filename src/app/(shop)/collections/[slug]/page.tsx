import { ProductCard } from "@/components/collections/product-card";
import { getPlantsForCards } from "@/data";
import { Leaf } from "lucide-react";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    // 1. Await params and format the title
    const slug = (await params).slug;
    const pageName = slug.split("-").join(" ");

    // 2. Fetch the plants for this specific slug
    const plants = await getPlantsForCards(slug);

    return (
        <div className="min-h-screen bg-background">
            {/* Tighter, Left-Aligned Hero Header */}
            <section className="relative w-full bg-gradient-to-b from-muted/50 to-background pt-12 pb-8 px-4 md:pt-16 md:pb-10">
                <div className="container mx-auto max-w-7xl space-y-5">
                    {/* Subtle Icon Accent */}
                    <div className="inline-flex items-center justify-center p-2.5 bg-primary/5 rounded-full">
                        <Leaf className="w-5 h-5 text-primary/80" strokeWidth={1.5} />
                    </div>
                    
                    {/* Elegant Typography - Left Aligned */}
                    <h1 className="text-3xl md:text-5xl font-light tracking-tight capitalize text-foreground">
                        {pageName}
                    </h1>
                    
                    {/* Removed mx-auto to keep it left-aligned */}
                    <p className="text-base md:text-lg text-muted-foreground font-light max-w-2xl">
                        Curated selections for your green space. Exploring{" "}
                        <span className="font-medium text-foreground">{plants.length}</span> unique varieties.
                    </p>
                </div>
                
                {/* Left-to-right fading divider line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-border/60 via-border/20 to-transparent" />
            </section>

            {/* Main Content Area */}
            <section className="container mx-auto py-10 px-4 md:px-8">
                {/* 3. Conditional Rendering: Empty State vs Grid */}
                {plants.length === 0 ? (
                    <div className="max-w-2xl mx-auto text-center py-20 px-6 rounded-2xl bg-muted/10 border border-border/30 backdrop-blur-sm">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-background border border-border/50 mb-6 shadow-sm">
                            <Leaf className="w-8 h-8 text-muted-foreground opacity-40" strokeWidth={1} />
                        </div>
                        <h2 className="text-2xl font-medium text-foreground tracking-tight">
                            This collection is resting
                        </h2>
                        <p className="text-muted-foreground mt-3 text-lg font-light">
                            We are currently cultivating new plants for this category. Please check back soon.
                        </p>
                    </div>
                ) : (
                    /* 4. The Responsive Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
                        {plants.map((plant) => (
                            <ProductCard key={plant.id} plant={plant} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}