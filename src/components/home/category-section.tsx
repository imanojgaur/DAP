export function CategorySectionWrapper({ children }: { children: React.ReactNode }) {
    return (
        <section className="max-w-[1600px] mx-auto px-4 md:px-8 py-24">
            <div className="flex flex-col mb-12">
                <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">
                    The Collections
                </h2>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-4">
                    Curated greenery for every lifestyle
                </p>
            </div>

            {/* THE MAGIC LAYOUT (No F-shape ever) */}
            <div className="flex flex-wrap gap-6">
                {children}
            </div>
        </section>
    );
}