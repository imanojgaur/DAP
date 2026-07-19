export function CategorySectionWrapper({ children }: { children: React.ReactNode }) { 
    return (
        <section className="max-w-[1600px] mx-auto px-4 md:px-8 py-24">
            {/* Section Header */}
            <div className="flex flex-col mb-12">
                <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">
                    The Collections
                </h2>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-4">
                    Curated greenery for every lifestyle
                </p>
            </div>

            {/* MAIN LAYOUT CONTAINER */}
            {/* Mobile: 2 Columns Masonry | Desktop: Stacked Rows */}
            <div className="columns-2 gap-4 md:columns-1 md:flex md:flex-col md:gap-6 w-full">
                {children}
            </div>
        </section>
    );
}