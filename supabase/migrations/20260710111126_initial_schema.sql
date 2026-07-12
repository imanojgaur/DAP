-- // ==========================================
-- // 1. ENUMS
-- // ==========================================

CREATE TYPE care_level AS ENUM ('BEGINNER', 'MIDLEVEL', 'EXPERT');

-- // ==========================================
-- // 2. PRODUCT CATALOG
-- // ==========================================

CREATE TABLE products(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shopify_id TEXT UNIQUE,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL ,
    description TEXT,

    price INTEGER NOT NULL,
    compare_at_price INTEGER,
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    
    care_difficulty care_level DEFAULT 'BEGINNER',
    is_pet_safe BOOLEAN DEFAULT false,
    average_rating DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    total_reviews DOUBLE PRECISION NOT NULL DEFAULT 0.0,

    specifications JSONB, 

    created_at TIMESTAMPTZ(3) DEFAULT NOW(),      -- eqals @default(now())
    updated_at TIMESTAMPTZ(3)                     -- Handle during query with updated_at = NOW() // no sql method 
);


CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL
);

CREATE TABLE product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    public_id TEXT NOT NULL,
    secure_url TEXT NOT NULL,
    width INTEGER NOT NULL,
    height INTEGER NOT NULL,
    is_primary BOOLEAN NOT NULL DEFAULT true,

    product_id UUID REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE reviews ( 
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author TEXT NOT NULL,
    rating DOUBLE PRECISION NOT NULL,
    title TEXT,
    body TEXT NOT NULL,
    created_at TIMESTAMPTZ(3) DEFAULT NOW(),

    product_id UUID REFERENCES products(id) ON DELETE CASCADE
);


-- // ==========================================
-- // 4. JUNCTION TABLES & INDEXES
-- // ==========================================

-- M:N for products and categories with indexing
CREATE TABLE junction_product_category ( 
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,

    PRIMARY KEY (product_id, category_id)
);
--Indexing: for category to product maping.
CREATE INDEX find_category_products ON junction_product_category(category_id);
