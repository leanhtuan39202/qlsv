"use server";
import { Md5 } from 'ts-md5';
import prisma from '.'
import { Instructor, Role } from '@prisma/client';
const getAllIntructor = async () => {
    const allInstructor = prisma.instructor.findMany({
        include: {
            department: true,
            Classes: true
        }
    });

    return allInstructor;
}
const getInstructorById = async (id: string) => {
    const instructor = prisma.instructor.findUnique({
        where: {
            id
        },
        include: {
            department: true,
            Classes: true
        }
    })
    return instructor
}
const addInstructor = async (instructor: Instructor) => {

    //check unique email
    const checkEmail = await prisma.instructor.findUnique({
        where: {
            email: instructor.email
        }
    })
    if (checkEmail) {
        throw new Error('Email đã được sử dụng')
    }
    //check unique id
    const checkId = await prisma.instructor.findUnique({
        where: {
            id: instructor.id
        }
    })
    if (checkId) {
        throw new Error('Mã giảng viên đã tồn tại')
    }
    //check phone 
    const checkPhone = await prisma.instructor.findUnique({
        where: {
            phone: instructor.phone
        }
    });
    if (checkPhone) {
        throw new Error('Số điện thoại đã tồn tại');
    }

    await prisma.user.create({
        data: {
            password: Md5.hashStr('1111'),
            username: instructor.id,
            role: Role.INSTRUCTOR
        }
    })
    await prisma.instructor.create({
        data: instructor
    })
}
const deleteInstructor = async (id: string) => {
    await prisma.instructor.delete({
        where: {
            id
        }
    })
    await prisma.user.delete({
        where: {
            username: id
        }
    })

}

const updateInstructor = async (instructor: Instructor) => {
    await prisma.instructor.update({
        where: {
            id: instructor.id
        },
        data: instructor
    })
}
export { getAllIntructor, getInstructorById, addInstructor, deleteInstructor, updateInstructor }