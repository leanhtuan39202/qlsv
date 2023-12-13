import { DEFAULT_PASSWORD } from '@/constants'
import { PrismaClient, Role } from '@prisma/client'
import { Md5 } from 'ts-md5'

const prismaClientSingleton = () => {
    return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

const main = async () => {
    const user = await prisma.user.findUnique({
        where: {
            username: 'admin'
        }
    })
    if (!user) {
        await prisma.user.create({
            data: {
                username: 'admin',
                password: Md5.hashStr(DEFAULT_PASSWORD),
                role: Role.ADMIN
            }
        })
    }
}
main()
export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma