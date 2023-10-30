'use server';
import { redirect } from 'next/navigation';
import prisma from '.'

const login = async (username: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: {
            username,
            password
        }
    })

    return user
}
const getRole = async (username: string | undefined) => {
    if (!username) {
        return redirect('/login')
    }
    const user = await prisma.user.findUnique({
        where: {
            username
        }
    })
    return user?.role
}
export { login, getRole }