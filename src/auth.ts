// import NextAuth from "next-auth"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import authConfig from "./auth.config"
// import { prisma } from "./lib/prisma"

// src/auth.ts
import NextAuth from "next-auth"
import authConfig from "./auth.config"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig)

