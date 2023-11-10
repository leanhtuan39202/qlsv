'use server';

import { Md5 } from 'ts-md5';
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
const resetPassword = async (username: string, password = '1111') => {
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
export { login, getRole, changePassword, resetPassword, getUserbyUsername }