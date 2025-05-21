
// src/auth.ts
import { getServerSession } from "next-auth";
import { authConfig } from "./auth.config";

export const auth = () => getServerSession(authConfig);
export { signIn, signOut } from "next-auth/react";


