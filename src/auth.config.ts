
// src/auth.config.ts
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma"
import { compare } from "bcryptjs"
import { loginSchema } from "./lib/schemas/loginSchema"

const authConfig = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validated = loginSchema.safeParse(credentials)
        if (!validated.success) return null

        const { email, password } = validated.data

        const user = await prisma.user.findUnique({ where: { email } })
        if (!user || !user.passwordHash) return null

        const isValid = await compare(password, user.passwordHash)
        if (!isValid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      },
    }),
  ],
} satisfies Parameters<typeof NextAuth>[0]

export default authConfig


// import Credentials from "next-auth/providers/credentials"
// import type { NextAuthConfig } from "next-auth"
// import { loginSchema } from "./lib/schemas/loginSchema"
// import { prisma } from "./lib/prisma"
// import { compare } from "bcryptjs"




// const authConfig: NextAuthConfig = {
//   providers: [
//     Credentials({
//       name: 'credentials',
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(creds) {
//           console.log('authorize called with:', creds);
//         const validated = loginSchema.safeParse(creds)

//         if (!validated.success){
//            throw new Error("Invalid input")
//         }

//         const { email, password } = validated.data

//         const user = await prisma.user.findUnique({
//           where: { email }
//         })

//         if (!user || !user.passwordHash){
//              throw new Error("Email not found")
//         }

//         const isValid = await compare(password, user.passwordHash)
//          if (!isValid) {
//          throw new Error("Invalid password")
//         }

//         // Ce qui est retourné ici sera stocké dans `session.user`
//         return {
//           id: user.id,
//           name: user.name,
//           email: user.email
//         }
//       }
//     })
//   ]
// }

// export default authConfig

