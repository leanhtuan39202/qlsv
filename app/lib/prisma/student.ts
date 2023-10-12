"use server";
import { Student } from "@prisma/client";
import prisma from ".";

const getAllStudents = async () => {
    const students = await prisma.student.findMany({
        select: {
            id: true,
            fullname: true,
            address: true,
            gpa: true,
            status: true,
            gender: true,

        }
    });
    return students;
}
const getStudentById = async (id: string) => {

}
const deleteStudent = async (id: string) => {

}
const addStudent = async (student: Student) => {

}
const updateStudent = async (student: Student) => {

}
const getTopStudent = async () => {

}
export { getAllStudents }