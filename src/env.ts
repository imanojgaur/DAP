import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    // 1. Database (Supabase)
    DATABASE_URL: z.url("CRITICAL_ORM: DATABASE_URL is missing or invalid!!"), 
    DIRECT_URL: z.url("CRITICAL_ORM: DIRECT_URL missing or Invalid!"), 
   
    DATABASE_PASSWORD: z.string().min(1, "RAW_SQL: DATABASE_PASSWORD is missing").optional(),

    // 2. Authentication (Better Auth)
    BETTER_AUTH_SECRET: z.string().min(32, "CRITICAL_BETTER_AUTH: BETTER_AUTH_SECRET must be at least 32 characters long!"),
    BETTER_AUTH_URL: z.url("CRITICAL_BETTER_AUTH: BETTER_AUTH_URL missing app url!"),
    GOOGLE_CLIENT_ID: z.string().endsWith(".apps.googleusercontent.com", "GOOGLE_CLIENT_ID: Invalid format"),
    GOOGLE_CLIENT_SECRET: z.string().startsWith("GOCSPX-", "GOOGLE_CLIENT_SECRET: Invalid, check starts with GOCSPX-"),

    // 3. Email (Resend)
    API_KEY_RESEND: z.string().startsWith("re_", "RESEND: API Key invalid"),
    EMAIL_SERVER_USER: z.string().min(1, "RESEND: User missing"),
    EMAIL_SERVER_PASSWORD: z.string().startsWith("re_", "RESEND: Password invalid"),
    EMAIL_SERVER_HOST: z.string().min(1, "RESEND: Host missing"),
    EMAIL_SERVER_PORT: z.string().min(1, "RESEND: Port missing"),
    EMAIL_FROM: z.string().email().startsWith("onboarding@resend.dev", "Resend: Onboarding email is missing"),

    // 4. Payments (Razorpay Server Secrets)
    RAZORPAY_KEY_SECRET: z.string().min(1, "RAZORPAY: Razorpay secret is required"),

    // 5. Media & Storage (Cloudinary Server Secrets)
    CLOUDINARY_API_KEY: z.string().min(1, "CLOUDINARY: Cloudinary API Key is required"),
    CLOUDINARY_API_SECRET: z.string().min(1, "CLOUDINARY: Cloudinary API Secret is required"),
    CLOUDINARY_URL: z.string().startsWith("cloudinary://", "CLOUDINARY: Invalid Cloudinary URL format"),

    // 6. Microservices
    CROP_AI_SECRET_KEY: z.string().min(32, "CROP_AI_BACKEND: Crop AI secret must be at least 32 chars"),
    AI_API_URL_RENDER: z.url("CRITICAL_CROP_AI_BACKEND:  url is missing."),
    AI_API_URL_LOCAL: z.url("CRITICAL_CROP_AI_BACKEND: Local AI url is missing."),
  },

  client: {
    // 4. Payments (Public Key)
    NEXT_PUBLIC_RAZORPAY_KEY_ID: z.string().startsWith("rzp_", "RAZORPAY_CLIENT: Razorpay Key ID must start with rzp_"),

    // 5. Media (Public Cloud Name)
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().min(1, "CLOUDINARY_CLIENT: Cloudinary cloud name is required"),
  },

  experimental__runtimeEnv: {
    NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
});