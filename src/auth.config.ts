import Credentials from "next-auth/providers/credentials"

import type { NextAuthConfig } from "next-auth"
import { loginSchema } from "./lib/schemas/loginSchema"
import { getUserById } from "./app/actions/authActions"
import { compare } from "bcryptjs"
 

export default {
  providers: [Credentials({
    name: 'credentials',
    async authorize(creds) {
       const validated = loginSchema.safeParse(creds)

       if(validated.success) {
        // const {email, password} = validated.data;
        const {id, password} = validated.data;
        const user = await getUserById(id)
        if(!user || !(await compare(password, user.passwordHash))) return null;

        return user;
       
      }

       return null
    }
  })],
} satisfies NextAuthConfig