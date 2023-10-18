'use server'
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
export { login }