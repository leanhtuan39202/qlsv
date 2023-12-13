import NextAuth from "next-auth"
import { authOption } from "./option"

const handler = NextAuth(authOption as any)

export { handler as GET, handler as POST }