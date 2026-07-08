import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
    name: string;
    slug: string;
    productCount: number;
    imageSrc: string;
    className?: string; // Prop to adjust layout.
}

export function CategoryCard({ name, slug, productCount, imageSrc, className = "" }: CategoryCardProps) {
    return (
        <Link
            href={`/collections/${slug}`}
            className={`group relative overflow-hidden rounded-[2.5rem] bg-gray-100 flex flex-col justify-end p-10 min-h-[300px] md:min-h-[400px] ${className}`}
        >
            {/* THE IMAGE LAYER */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={imageSrc}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Deep Scrim Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
            </div>

            {/* TEXT CONTENT */}
            <div className="relative z-10">
                <span className="text-white/70 text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">
                    Explore {productCount} Varieties
                </span>
                <h3 className="text-3xl md:text-4xl font-black italic text-white uppercase tracking-tighter leading-none mb-4">
                    {name}
                </h3>
                <div className="flex items-center gap-2">
                    <span className="h-1 w-0 bg-white group-hover:w-12 transition-all duration-500 ease-in-out" />
                    <span className="text-white text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        Shop Now
                    </span>
                </div>
            </div>
        </Link>
    );
}