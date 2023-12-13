'use server';

import { Md5 } from 'ts-md5';
import { redirect } from 'next/navigation';
import prisma from '.'
import { Role } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { DEFAULT_PASSWORD } from '@/constants';

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

const changePassword = async (username: string, password: string) => {
    const user = await prisma.user.update({
        where: {
            username
        },
        data: {
            password: Md5.hashStr(password)
        }
    })
    return user
}
const getUserbyUsername = async (userName: string) => {
    const user = await prisma.user.findUnique({
        where: {
            username: userName
        }
    })
    return user
}

const getUserByRole = async (role: Role) => {
    const user = await prisma.user.findMany({
        where: {
            role
        }
    })
    return user
}
const resetPassword = async (username: string, password = DEFAULT_PASSWORD) => {
    const user = await prisma.user.update({
        where: {
            username
        },
        data: {
            password: Md5.hashStr(password)
        }
    })
    revalidatePath('/users')
    return user
}
export { login, getRole, changePassword, resetPassword, getUserbyUsername, getUserByRole }