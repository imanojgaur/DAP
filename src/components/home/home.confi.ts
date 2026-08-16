import type { HeaderData, MetaDataItem } from "./section-wrapper";
import { currentYear } from "@/utilities";
import type { EDITORIAL_CARDS_PROPS } from "./editorial-section";
import type { ImageLayoutProps } from "./img-layout";

	// 1. Category Belt logic
	// cat img config
export const images: ImageLayoutProps[][] = [
		[
			{
				sourceType: "nextServer", 
				imageSrc: "/home/deal-of-the-day2.avif", 
				isPrimary: false, 
				alt: "Deal Of The Day"
			},
			{
				sourceType: "nextServer",
				isPrimary: true,
				imageSrc: "/home/deal-of-the-day.webp",
				alt: "Deal Of The Day",
			},
			{
				sourceType: "nextServer", 
				isPrimary: false, 
				imageSrc: '/home/deal-of-the-day5.avif', 
				alt: 'Deal Of The Day', 
			}, 
			{
				sourceType: "nextServer", 
				imageSrc: "/home/deal-of-the-day4.avif",
				isPrimary: false, 
				alt: "Deal Of The Day", 
			}, 
			{
				sourceType: "nextServer", 
				imageSrc: "/home/deal-of-the-day3.avif", 
				isPrimary: false, 
				alt: "Deal Of The Day", 
			}, 
		],
		[
			{
				sourceType: "nextServer",
				isPrimary: true,
				imageSrc: "/home/best-seller.avif",
				alt: "Best Seller",
			},
			{
				sourceType: "nextServer",
				isPrimary: false, 
				imageSrc: '/home/best-seller3.avif', 
				alt: 'Best Seller'
			}, 
			{
				sourceType: "nextServer", 
				isPrimary: false, 
				imageSrc: '/home/best-seller2.avif', 
				alt: 'Best Seller', 
			}
		],
		[
			{
				sourceType: "nextServer",
				isPrimary: true,
				imageSrc: "/home/balconey5.avif",
				alt: "Balcony Plants",
			},
			{
				sourceType: "nextServer",
				isPrimary: false,
				imageSrc: "/home/balconey1.avif",
				alt: "Balcony Plants",
			},
			{
				sourceType: "nextServer",
				isPrimary: false,
				imageSrc: "/home/balconey2.avif",
				alt: "Balcony Plants",
			},
			{
				sourceType: "nextServer",
				isPrimary: false,
				imageSrc: "/home/balconey3.avif",
				alt: "Balcony Plants",
			},
			{
				sourceType: "nextServer",
				isPrimary: false,
				imageSrc: "/home/balconey4.avif",
				alt: "Balcony Plants",
			},
			{
				sourceType: "nextServer",
				isPrimary: false,
				imageSrc: "/home/balconey6.avif",
				alt: "Balcony Plants",
			},
		],
		[
			{
				sourceType: "nextServer",
				isPrimary: true,
				imageSrc: "/home/vastu.avif",
				alt: "Vastu",
			},
			{
				sourceType: "nextServer",
				isPrimary: false,
				imageSrc: "/home/vastu2.avif",
				alt: "Vastu",
			},
		],
		[
			{
				sourceType: "nextServer",
				isPrimary: true,
				imageSrc: "/home/mood-boosting.avif",
				alt: "Mood Boosting",
			},
			{
				sourceType: "nextServer", 
				isPrimary: false, 
				imageSrc: "/home/mood-boosting2.avif", 
				alt: "Mood Boosting", 
			}, 
			{
				sourceType: "nextServer", 
				isPrimary: false, 
				imageSrc: "/home/mood-boosting3.avif", 
				alt: "Mood Boosting", 
			}
		],
		[
			{
				sourceType: "nextServer",
				isPrimary: true,
				imageSrc: "/home/purify2.avif",
				alt: "Air Purifying",
			},
			{
				sourceType: "nextServer",
				isPrimary: false,
				imageSrc: "/home/purify-air1.avif",
				alt: "Air Purifying",
			},
		],
		[
			{
				sourceType: "nextServer",
				isPrimary: true,
				imageSrc: "/home/indoor-plants.avif",
				alt: "Indoor Collection",
			},
		],
	];

	// Category Base Configuration
export const baseCategoryConfig = [
		{ title: "Deal Of The Day", slug: "deal-of-the-day" },
		{ title: "Best Seller", slug: "plants-1" },
		{ title: "Mood Boosting", slug: "mood-improving-plants" },
		{ title: "Air Purifying", slug: "air-purifying-plants" },
		{ title: "Balcony Plants", slug: "balcony-plants" },
		{ title: "Vastu", slug: "vastu-plants" },
		{ title: "Indoor Collection", slug: "indoor-plants" },
	];

// category Header Data
export const catHeader: HeaderData = {
    title: "The Collections",
    description: "Curated greenery for every lifestyle",
    subtitle: "Rare & Handpicked Botanicals",
    hideSubtitleOnMobile: true,
    hideSubtitleOnDesktop: true,
    bodyLayoutClass: "mb-5 md:mb-0 mt-6",
    headerLayoutClass: "px-5 md:px-8 md:pt-6",
};

//2. Home feature Products Belt data
export const featHeader: HeaderData = {
    title: "Featured Products",
    description: "Rare finds and everyday favorites",
    bodyLayoutClass: "mb-5 md:mb-0 mt-8 md:mt-6",
    headerLayoutClass: "px-5 md:px-8 md:pt-6",
};


//Editorial Config
export const edtheader: HeaderData = {
        title: "The Promise",
        bodyLayoutClass: "mt-8 md:mt-0 pt-4 md:pt-7 md:px-7 md:pb-11",
        headerLayoutClass: "px-5 md:px-0",
    };
export const edtMetaData: MetaDataItem[] = [
        { label: "Location", badgeText: "DAP", value: "GreenHouse HQ" },
        { label: "Year", value: `${currentYear}` },
        { label: "Read Time", value: "1 Min" },
    ];

export const EDITORIAL_CARDS_DATA: EDITORIAL_CARDS_PROPS[] = [
        {
            id: "manifesto",
            type: "hero",
            layoutClasses:
                "md:min-w-0 col-span-2 row-span-2 md:col-span-2 md:row-span-2 min-h-[450px] md:min-h-full",
            title: "FARM TO DOOR. NO MIDDLEMAN.",
            subtitle: "Direct from Source",
            description:
                "We ship our plants directly from our climate-controlled greenhouses to your doorstep. No retail markups, no transit stress—just vibrant, healthy greenery at fair prices.",
            linkText: "Read the Manifesto",
            linkHref: "/our-process",
        },
        {
            id: "metrics",
            type: "minimalist",
            layoutClasses:
                "md:min-w-0 col-span-1 row-span-1 md:col-span-1 bg-gray-100 hover:bg-gray-200 text-black",
            title: "0%",
            subtitle: "Retail Markups",
            description:
                "Zero middlemen means we invest margins back into soil quality and careful packaging.",
        },
        {
            id: "guarantee",
            type: "led-glow",
            layoutClasses:
                "md:min-w-0 col-span-1 row-span-1 md:col-span-1 bg-emerald-950/80 border border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]",
            title: "30-Day",
            subtitle: "Ironclad Guarantee",
            description:
                "Hand-inspected before shipping. Doesn't arrive happy? We replace it instantly. No questions asked.",
        },
    ];