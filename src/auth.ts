import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Nodemailer from "next-auth/providers/nodemailer"
import Google from "next-auth/providers/google"
import prisma from "@/lib/prisma" // Adjust this import based on where your PrismaClient is

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  
  // Force JWT for lightning-fast Edge performance
  session: { strategy: "jwt" },
  
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Nodemailer({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  
  // Point NextAuth to our custom UI pages (we will build this next)
  pages: {
    signIn: '/login', 
  }
})