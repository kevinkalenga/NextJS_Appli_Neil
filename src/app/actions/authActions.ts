'use server';

import { signIn } from "next-auth/react";
import { prisma } from "@/lib/prisma";
import { LoginSchema } from "@/lib/schemas/loginSchema";
import { registerSchema, RegisterSchema } from "@/lib/schemas/registerSchema";
import { ActionResult } from "@/types";
import bcrypt from "bcryptjs";

export async function signInUser(data: LoginSchema): Promise<ActionResult<string>> {
    try {
        const result = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
        });

        if (result?.error) {
            return { status: 'error', error: result.error };
        }

        return { status: 'success', data: 'Logged in' };
    } catch (error: unknown) {
        console.error('Sign-in error:', error);

        const err = error as { name?: string };

        if (err?.name === 'CredentialsSignin') {
            return { status: 'error', error: 'Invalid credentials' };
        }

        return { status: 'error', error: 'Something went wrong' };
    }
}












export async function registerUser(data: RegisterSchema): Promise<ActionResult<User>> {
    try {
        const validated = registerSchema.safeParse(data);

        if (!validated.success) {
            return { status: 'error', error: validated.error.errors };
        }

        const { name, email, password } = validated.data;

        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            return { status: 'error', error: 'User already exists' };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash: hashedPassword,
            },
        });

        return { status: 'success', data: user };
    } catch (error) {
        console.error('Register error:', error);
        return { status: 'error', error: 'Something went wrong' };
    }
}

export async function getUserById(email: string) {
    return prisma.user.findUnique({ where: { email } });
}



