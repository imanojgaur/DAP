import NextAuth, { type DefaultSession } from "next-auth"

// This tells TypeScript: "Hey, take the default NextAuth Session, and add phoneNumber to it!"
declare module "next-auth" {
  interface Session {
    user: {
      phoneNumber?: string | null
    } & DefaultSession["user"]
  }
}