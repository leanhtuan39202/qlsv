"use server";
import { Student, StudentInfo } from "@prisma/client";
import prisma from ".";


const getAllStudents = async () => {
    const students = await prisma.student.findMany({
        include: {
            StudentInfo: true,
            classes: true,
            department: true,
            schoolyear: true,
            specialized: true
        }
    });
    return students;
}
const getAllStudent = async () => {
    const students = await prisma.student.findMany({
    });
    return students;
}
const getStudentById = async (id: string) => {
    const student = await prisma.student.findUnique({
        where: {
            id
        },
        include: {
            StudentInfo: true,
            classes: true,
            department: true,
            schoolyear: true,
            specialized: true
        }
    })

    return student
}
const deleteStudent = async (id: string) => {
    return await prisma.student.delete({
        where: {
            id
        }
    })
}
const createStudent = async (student: Student, StudentInfo: StudentInfo) => {
    await prisma.student.create({
        data: student
    })
    await prisma.studentInfo.create({
        data: StudentInfo
    })
}
const updateStudent = async (student: Student) => {

}
const getTopStudent = async () => {

}
export { getAllStudents, getAllStudent, getStudentById, deleteStudent, createStudent, updateStudent, getTopStudent }