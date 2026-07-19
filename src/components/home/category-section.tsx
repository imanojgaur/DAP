// CategorySectionWrapper.tsx

export interface HeaderData {
    issue: string;
    title: string;
    description: string;
    publishedYear: string;
    location: string;
    readTime: string;
}

export function CategorySectionWrapper({ 
    children, 
    headerData 
}: { 
    children: React.ReactNode;
    headerData: HeaderData; // Ye prop hum page.tsx se bhejenge
}) { 
    return (
        <section className="relative w-full max-w-[1600px] mx-auto px-4 md:px-8 py-24 overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-3xl opacity-50 -z-10 pointer-events-none" />

            <div className="group flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-gray-200 pb-8 cursor-default">
                
                <div className="flex flex-col max-w-2xl">
                    <div className="flex md:hidden items-center gap-2 bg-emerald-50/50 border border-emerald-100 w-fit px-3 py-1.5 rounded-full mb-4">
                        <span className="text-[9px] font-black uppercase tracking-widest text-emerald-800">
                            Premium & Sourced Locally
                        </span>
                    </div>

                    {/* DYNAMIC TITLE */}
                    <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none text-gray-900 transition-all duration-1000 ease-out group-hover:translate-x-2 group-hover:tracking-tight group-hover:duration-500 group-hover:delay-0 group-hover:text-black">
                        {headerData.title}
                    </h2>
                    
                    <p className="flex items-center gap-4 mt-4 md:mt-6 text-xs font-bold uppercase tracking-[0.2em] text-gray-500 transition-colors duration-1000 delay-300 group-hover:duration-500 group-hover:delay-0 group-hover:text-emerald-600">
                        <span className="hidden md:block h-[2px] w-8 bg-emerald-500 rounded-full transition-all duration-1000 delay-300 ease-out group-hover:delay-0 group-hover:duration-500 group-hover:w-24 group-hover:bg-emerald-400 group-hover:shadow-[0_0_15px_rgba(52,211,153,1)]"></span>
                        
                        {/* DYNAMIC DESCRIPTION */}
                        <span className="transition-all duration-1000 delay-300 ease-out group-hover:delay-0 group-hover:duration-500 group-hover:translate-x-4 group-hover:tracking-[0.3em] group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.2)]">
                            {headerData.description}
                        </span>
                    </p>
                </div>
                
                {/* DYNAMIC METADATA */}
                <div className="hidden md:flex flex-col items-end text-right transition-transform duration-1000 delay-300 ease-out group-hover:delay-0 group-hover:duration-500 group-hover:-translate-x-2">
                    <div className="flex flex-col md:items-end mb-2">
                        <span className="text-[9px] text-gray-400 uppercase tracking-widest mb-1">Published</span>
                        <span className="text-sm text-gray-600 font-bold uppercase tracking-widest">{headerData.publishedYear}</span>
                    </div>
                    <div className="flex flex-col md:items-end mb-2">
                        <span className="text-[9px] text-gray-400 uppercase tracking-widest mb-1">Location</span>
                        <span className="text-sm text-emerald-600 font-bold uppercase tracking-widest">{headerData.location}</span>
                    </div>
                    <div className="flex flex-col md:items-end">
                        <span className="text-[9px] text-gray-400 uppercase tracking-widest mb-1">Read Time</span>
                        <span className="text-sm text-gray-600 font-bold uppercase tracking-widest">{headerData.readTime}</span>
                    </div>
                </div>
            </div>

            <div className="columns-2 gap-4 md:columns-1 md:flex md:flex-col md:gap-6 w-full relative z-10">
                {children}
            </div>
        </section>
    );
}