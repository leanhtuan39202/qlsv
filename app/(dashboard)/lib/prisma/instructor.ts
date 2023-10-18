"use server";
import prisma from '.'
import { Instructor, Department } from '@prisma/client';
const getAllIntructor = async () => {
    const allInstructor = prisma.instructor.findMany({
        include: {
            department: true
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
            classes: true
        }
    })
    return instructor
}
const addInstructor = async (instructor: Instructor) => {
    await prisma.instructor.create({
        data: instructor
    })
}
export { getAllIntructor, getInstructorById, addInstructor }