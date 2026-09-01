# DAP[V.1]: High-Performance E-Commerce Engine

**[Live Demo](https://dap-plant-app.vercel.app/)** | 
**[Ml Backend API](https://github.com/imanojgaur/crop-ai-backend)** |
**[ETL Pipeline Repo](https://github.com/imanojgaur/DAP/tree/main/etl)** |
**Status:** **Continuous Optimization**

A full-stack, data-driven e-commerce platform architected for SSR performance and secure transactions built with  decoupled microservices.

### ✨ Application Preview 
<!-- Put them side-by-side or stack them neatly.
<!-- <p align="center">
  <!-- Replace the src links below with your actual raw GitHub or Cloudinary image/GIF links -->
  <!-- <img src="LINK_TO_YOUR_DESKTOP_HOMEPAGE_AND_CART_GIF.gif" width="48%" alt="Desktop Homepage and Cart UX" /> -->
  <!-- <img src="LINK_TO_YOUR_ML_PREDICTION_GIF.gif" width="48%" alt="ML Crop Recommendation UX" /> -->
<!-- </p> --> 

<!-- If you record a longer 2-3 minute video where you are speaking and walking through the code (which is fantastic for interviews), the file will be too large to upload directly to GitHub.

If you use Loom or YouTube, GitHub doesn't allow <iframe> video embeds. Instead, you use a clever markdown trick: you show a picture of the video (a thumbnail with a play button), and when they click the picture, it opens your Loom video.

The code looks like this:

Markdown
[![Watch the video](https://img.youtube.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID) -->
<!-- If you use Loom, Loom actually provides a "Copy GIF Thumbnail" option when you click Share, which generates this exact markdown code for you automatically! -->
<!-- Method 1: The "Drag & Drop" Magic (Easiest & Best for MP4/GIF)
If you record a 20-30 second screen recording on your laptop (using Mac's built-in recorder, Xbox Game Bar on Windows, or an extension) and save it as an .mp4 or .gif:

Go to your repository on GitHub.com.

Click the pencil icon ✏️ to edit your README.md.

Take your .mp4 or .gif file from your desktop and literally drag and drop it into the GitHub text editor.

GitHub will show a loading bar that says "Uploading your files..."

When it finishes, GitHub will automatically write a URL into your code that looks like this: https://github.com/user-attachments/assets/xyz123....

That is GitHub hosting the video for you for free! Just place that URL into the <video> or <img> tag in your markdown. (Note: The file must be under 10MB for this to work).

M -->
- **Desktop Homepage**
<!-- video of navbar, scroll down and glassmorphism effect stoping at carousel and moving it adding an item to cart with right side drawer and lastly moving down to editorial -->
- **ML Crop Recommendin ux Preview**

### ⚙️ System Architecture Diagram

<!-- <p align="center">
  <img src="LINK_TO_YOUR_MACRO_ARCHITECTURE_DIAGRAM.png" width="80%" alt="System Architecture Diagram" />
</p> -->

<!-- A system architecture diagram shows the "macro" flow: (using a free tool like Excalidraw or draw.io).

Client (Browser) -> Next.js Client Components (Zustand)

Server -> Next.js Server Actions & API Routes

Databases/APIs -> Supabase (PostgreSQL), Auth.js, Cloudinary

Microservice -> FastAPI (Render) ML Model -->

### ⚡ Core Architecture & Integrations
- **Frontend & UI:** Next.js (App Router), Zustand (Render-optimized cart), Tailwind CSS, Shadcn UI
- **Backend & Data:** PostgreSQL, Prisma ORM, Supabase
- **Security & Payments:** Auth.js (Google OAuth 2.0), Razorpay (Client-side tokenization)
- **Pipelines & Services:** Playwright (Automated ETL seeding), Cloudinary API (Image CDN), Python ML Model (Deployed via Render)


### ⚙️ System Architecture & Engineering Decisions

**Premium UI/UX Implementation: [`Live Demo`](https://dap-plant-app.vercel.app/)**
- Engineered a responsive "Nike-style" mega menu, glassmorphism navigation. 
- Custom carousels focusing on zero layout shifts (CLS) and fluid client-side transitions.

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
<!-- ER Diagram of db Below here -->
<!-- <p align="center">
  <img src="LINK_TO_YOUR_DATABASE_ER_DIAGRAM.png" width="80%" alt="Database Entity Relationship Diagram" />
</p> -->

**Secure Checkout**
- Implemented Razorpay with client-side tokenization for secure payments.

**Authentication**
- Leveraged Auth.js (Google OAuth 2.0) for seamless user session management.

**Automated ETL Pipelines ([`Playwright`](https://github.com/imanojgaur/DAP/blob/main/etl/extract/scripts/e2-product-page.ts), [`Cloudinary`](https://github.com/imanojgaur/DAP/blob/main/etl/transform/script/t1-cloud-sync-e1.ts) & [`Supabase`](https://github.com/imanojgaur/DAP/blob/main/etl/load/seed-product-t1.ts) )**
- Engineered a scraping pipeline to extract and transform initial store data.
- Seeded the [`Supabase`](https://github.com/imanojgaur/DAP/blob/main/etl/load/seed-product-t1.ts) database automatically while using [`Cloudinary`](https://github.com/imanojgaur/DAP/blob/main/etl/transform/script/t1-cloud-sync-e1.ts)as an Image CDN.


### 💻 Local Setup & Development

**Prerequisites**
- Node.js (v20+)
- pnpm (Strictly required for lockfile consistency).
- PostgreSQL (Running instance local instance or Supabase URL)

**1. Clone the repository**
```bash
git clone https://github.com/imanojgaur/DAP.git
cd DAP
``` 
**2. Install dependencies** 

```bash
pnpm install
```

**3. Configure Environment Variables**
 
Create a `.env.local` file in the root directory. 
You can use the provided `.env.example` as a template

```bash
cp .env.example .env.local
```
> [!IMPORTANT]
> **Authentication Requirement:** You must generate a `NEXTAUTH_SECRET` (e.g., using `openssl rand -base64 32`) in your `.env.local` so the session provider initializes without errors.
> 
> 💡 *Evaluating this project? Ping me directly for a testing `.env.local` file with pre-filled sandbox keys to skip this configuration entirely.*

**4. Database Setup (Prisma)**

Push the schema to your database and generate the Prisma Client:

```bash
pnpm prisma db push
pnpm prisma generate
pnpm db:seed 
```

**5. Start the development server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

