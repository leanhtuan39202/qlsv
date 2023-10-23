"use server";
import prisma from '.'
import { Instructor } from '@prisma/client';
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