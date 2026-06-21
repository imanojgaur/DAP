# DAP[V.1]: High-Performance E-Commerce Engine

**[Live Demo](https://dap-plant-app.vercel.app/)** | 
**[Ml Backend API](https://github.com/imanojgaur/crop-ai-backend)** |
**[ETL Pipeline Repo](https://github.com/imanojgaur/DAP/tree/main/etl)** |
**Status:** **Continuous Optimization**

A full-stack, data-driven e-commerce platform architected for SSR performance and secure transactions built with  decoupled microservices.


### ⚡ Core Architecture & Integrations
- **Frontend & UI:** Next.js (App Router), Zustand (Render-optimized cart), Tailwind CSS, Shadcn UI
- **Backend & Data:** PostgreSQL, Prisma ORM, Supabase
- **Security & Payments:** Auth.js (Google OAuth 2.0), Razorpay (Client-side tokenization)
- **Pipelines & Services:** Playwright (Automated ETL seeding), Cloudinary API (Image CDN), Python ML Model (Deployed via Render)


### ⚙️ System Architecture & Engineering Decisions

**Global State Optimization: [`Zustand`](https://github.com/imanojgaur/DAP/blob/main/src/store/cart-store.ts)**
- Managed dynamic shopping cart logic strictly on the client side.
- Prevented unnecessary re-renders across isolated React components.

**Algorithmic Recommendation Engine [`Prisma`](https://github.com/imanojgaur/DAP/blob/main/src/actions/recommend-plant.ts)**
- Built a custom weighted-scoring algorithm to match plants to user lifestyles.
- Parsed DB JSON fields to dynamically filter by sunlight, water, and pet safety.

**Decoupled ML Microservice [`FastAPI & Render`](https://github.com/imanojgaur/crop-ai-backend)**
- Refactored an open-source ML model to predict optimal crops using 7 NPK and weather inputs.
- Deployed as an isolated FastAPI service, securely queried via Next.js Server Actions.

**Database Architecture: [`Prisma & PostgreSQL`](https://github.com/imanojgaur/DAP/blob/main/prisma/schema.prisma)**
- Designed a relational schema for multi-tier categories and product variations.
- Handled complex hierarchical data and user reviews efficiently.

**Secure Checkout & Authentication**
- Leveraged Auth.js (Google OAuth 2.0) for seamless user session management.
- Implemented Razorpay with client-side tokenization for secure payments.

**Automated ETL Pipelines ([`Playwright`](https://github.com/imanojgaur/DAP/blob/main/etl/extract/scripts/e2-product-page.ts), [`Cloudinary`](https://github.com/imanojgaur/DAP/blob/main/etl/transform/script/t1-cloud-sync-e1.ts) & [`Supabase`](https://github.com/imanojgaur/DAP/blob/main/etl/load/seed-product-t1.ts) )**
- Engineered a scraping pipeline to extract and transform initial store data.
- Seeded the [`Supabase`](https://github.com/imanojgaur/DAP/blob/main/etl/load/seed-product-t1.ts) database automatically while using [`Cloudinary`](https://github.com/imanojgaur/DAP/blob/main/etl/transform/script/t1-cloud-sync-e1.ts)as an Image CDN.


### 💻 Local Setup & Development

**Prerequisites: pnpm** (Strictly required for lockfile consistency).
- Node.js (v20+)
- PostgreSQL (Running instance)

**1. Clone the repository**
```
git clone https://github.com/imanojgaur/DAP.git
cd DAP
```

**2. Install dependencies** 
```
pnpm install
```

**3. Configure Environment Variables**
 
Create a `.env.local` file in the root directory. 
You can use the provided `.env.example` as a template

```
cp .env.example .env.local
```

*(Note: Ping me for the .env.local file for testing purposes if required during evaluation).*

**4. Database Setup (Prisma)**

Push the schema to your database and generate the Prisma Client:

```
npx prisma db push
npx prisma generate
```

**5. Start the development server**

```
pnpm dev
```