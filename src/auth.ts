import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { prisma } from "./lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"

const nextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
}

const handler = NextAuth(nextAuthOptions)

export const GET = handler
export const POST = handler


