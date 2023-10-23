"use server";
import { Student } from "@prisma/client";
import prisma from ".";

const getAllStudents = async () => {
    const students = await prisma.student.findMany({
        include: {
            StudentInfo: true
        }
    });
    return students;
}
const getAllStudents1 = async () => {
    const students = await prisma.student.findMany({

    });
    return students;
}
const getStudentById = async (id: string) => {

}
const deleteStudent = async (id: string) => {

}
const createStudent = async (student: Student) => {

}
const updateStudent = async (student: Student) => {

}
const getTopStudent = async () => {

}
export { getAllStudents, getAllStudents1 }