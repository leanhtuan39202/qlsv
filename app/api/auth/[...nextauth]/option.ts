import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "process";
import { login } from "@/app/(dashboard)/lib/prisma/user";
export const authOption: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            authorize: async (credentials, _req) => {
                const user = await login(credentials!.username, credentials!.password);
                if (user) {
                    return user
                }
                return null
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    secret: env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
    }
}