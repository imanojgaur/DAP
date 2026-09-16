import { currentYear } from "@/utils/date";
import type { EDITORIAL_CARDS_PROPS } from "./editorial-section";
import type { ImageLayoutProps } from "./img-layout";
import type { HeaderData, MetaDataItem } from "./section-wrapper";

// ============================================================================
// 1. CATEGORY BELT CONFIGURATION
// ============================================================================

export const catHeader: HeaderData = {
    title: "The Collections",
    description: "Curated greenery for every lifestyle",
    subtitle: "Rare & Handpicked Botanicals",
    hideSubtitleOnMobile: true,
    hideSubtitleOnDesktop: true,
};

export const baseCategoryConfig = [
    { title: "Deal Of The Day", slug: "deal-of-the-day" },
    { title: "Best Seller", slug: "plants-1" },
    { title: "Mood Boosting", slug: "mood-improving-plants" },
    { title: "Air Purifying", slug: "air-purifying-plants" },
    { title: "Balcony Plants", slug: "balcony-plants" },
    { title: "Vastu", slug: "vastu-plants" },
    { title: "Indoor Collection", slug: "indoor-plants" },
];

// Note: Indices strictly map to the baseCategoryConfig array above.
export const images: ImageLayoutProps[][] = [
    // 0. Deal Of The Day
    [
        {
            sourceType: "nextServer",
            imageSrc: "/home/deal-of-the-day2.avif",
            isPrimary: false,
            alt: "Deal Of The Day",
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
            imageSrc: "/home/deal-of-the-day5.avif",
            alt: "Deal Of The Day",
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
    // 1. Best Seller
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
            imageSrc: "/home/best-seller3.avif",
            alt: "Best Seller",
        },
        {
            sourceType: "nextServer",
            isPrimary: false,
            imageSrc: "/home/best-seller2.avif",
            alt: "Best Seller",
        },
    ],
    // 2. Balcony Plants
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
    // 3. Vastu
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
    // 4. Mood Boosting
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
        },
    ],
    // 5. Air Purifying
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
    // 6. Indoor Collection
    [
        {
            sourceType: "nextServer",
            isPrimary: true,
            imageSrc: "/home/indoor-plants.avif",
            alt: "Indoor Collection",
        },
    ],
];

// ============================================================================
// 2. FEATURED PRODUCTS CONFIGURATION
// ============================================================================

export const featHeader: HeaderData = {
    title: "Featured Products",
    description: "Rare finds and everyday favorites",
};

// ============================================================================
// 3. EDITORIAL PROMISE SECTION
// ============================================================================

export const edtheader: HeaderData = {
    title: "The Promise",
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
        title: "0%",
        subtitle: "Retail Markups",
        description:
            "Zero middlemen means we invest margins back into soil quality and careful packaging.",
    },
    {
        id: "guarantee",
        type: "led-glow",
        title: "30-Day",
        subtitle: "Ironclad Guarantee",
        description:
            "Hand-inspected before shipping. Doesn't arrive happy? We replace it instantly. No questions asked.",
    },
];