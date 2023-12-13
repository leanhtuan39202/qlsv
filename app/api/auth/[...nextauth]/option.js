import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "process";
import { login } from "@/app/(dashboard)/lib/prisma/user";
import { Md5 } from "ts-md5";
export const authOption = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            authorize: async (credentials, _req) => {
                const user1 = await login(
                    credentials.username,
                    Md5.hashStr(credentials.password)
                );
                const user = {
                    name: user1?.username,
                    id: user1?.username,
                };
                return user1 ? user : null;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
};
