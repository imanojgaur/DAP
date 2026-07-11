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
    
    care_difficulty care_level DEFAULT 'BEGINER',
    is_pet_safe BOOLEAN DEFAULT false,
    average_rating DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    total_reviews DOUBLE PRECISION NOT NULL DEFAULT 0.0,

    specifications JSONB 

    created_at TIMESTAMPTZ(3) DEFAULT NOW(),      -- eqals @default(now())
    updated_at TIMESTAMPTZ(3)                     -- Handle during query with updated_at = NOW() // no sql method 
);

CREATE TABLE junction_product_category ( 
    product_id UUID REFERENCES products(id),
    category_id UUID REFERENCES categories(id),

    PRIMARY KEY (product_id, category_id)
);

CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
);

CREATE TABLE product_images (
    id UUID PRIMARY KEY gen_random_uuid()
    public_id TEXT NOT NULL
    secure_url TEXT NOT NULL 
    width INTEGER NOT NULL 
    height INTEGER NOT NULL 
    is_primary BOOLEAN NOT NULL true

    product_id UUID REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE reviews ( 
    id UUID PRIMARY KEY gen_random_uuid()
    author VARCHAR(255) NOT NULL
    rating DOUBLE PRECISION NOT NULL 
    title TEXT 
    body TEXT 
    created_at TIMESTAMPTZ

    product_id REFERENCES products(id) ON DELETE CASCADE
);



-- // ==========================================
-- // 6. ENUMS
-- // ==========================================

CREATE TYPE care_level AS ENUM ('BEGINNER', 'MIDLEVEL', 'EXPERT');

