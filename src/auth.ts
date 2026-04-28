import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Nodemailer from "next-auth/providers/nodemailer"
import Google from "next-auth/providers/google"
import prisma from "@/lib/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
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
  
  // ADD THIS CALLBACKS SECTION!
  callbacks: {
    async jwt({ token, user }) {
      // 'user' is only passed the very first time you log in
      if (user) {
        token.sub = user.id; 
      }
      return token;
    },
    async session({ session, token }) {
      // Transfer the ID from the token to the session so your Server Actions can see it
      if (session.user && token.sub) {
        session.user.id = token.sub; 
      }
      return session;
    }
  },

  pages: {
    signIn: '/login', 
  }
})