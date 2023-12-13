"use server";
import { Role, Student, StudentInfo } from "@prisma/client";
import prisma from ".";
import { Md5 } from "ts-md5";
import { DEFAULT_PASSWORD } from "@/constants";


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
            specialized: true,
            Enrollment: {
                include: {
                    term: true
                }
            }
        }
    })
    return student
}
const getStudentByIdToUpdate = async (id: string) => {
    const student = await prisma.student.findUnique({
        where: {
            id
        },
    })
    const studentInfo = await prisma.studentInfo.findUnique({
        where: {
            id
        }
    })

    return {
        StudentInfo: studentInfo,
        student: student
    }
}
const deleteStudent = async (id: string) => {
    await prisma.student.delete({
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
const createStudent = async (student: Student, StudentInfo: StudentInfo) => {
    try {

        //check student exist
        const checkStudent = await prisma.student.findUnique({
            where: {
                id: student.id
            }
        })
        if (checkStudent) {
            throw new Error('Mã sinh viên đã tồn tại')
        }
        //check unique email
        const checkEmail = await prisma.studentInfo.findUnique({
            where: {
                email: StudentInfo.email
            }
        });
        if (checkEmail) {
            throw new Error('Email đã tồn tại');
        }
        //check id card
        const checkIdCard = await prisma.studentInfo.findUnique({
            where: {
                identificationNumber: StudentInfo.identificationNumber
            }
        })
        if (checkIdCard) {
            throw new Error('Số CCCD đã tồn tại');
        }
        //check student phone number
        const checkPhone = await prisma.studentInfo.findUnique({
            where: {
                phone: StudentInfo.phone
            }
        })
        if (checkPhone) {
            throw new Error('Số điện thoại đã tồn tại');
        }

        //check father phone number
        const checkFatherPhone = await prisma.studentInfo.findUnique({
            where: {
                fatherPhone: StudentInfo.fatherPhone as string || ''
            }
        })

        if (checkFatherPhone) {
            throw new Error('SĐT cha đã tồn tại');
        }
        //check father phone number
        const checkMotherPhone = await prisma.studentInfo.findUnique({
            where: {
                motherPhone: StudentInfo.motherPhone as string || ''
            }
        })

        if (checkMotherPhone) {
            throw new Error('SĐT mẹ đã tồn tại');
        }

        await prisma.user.create({
            data: {
                password: Md5.hashStr(DEFAULT_PASSWORD),
                username: student.id,
                role: Role.STUDENT
            }
        })
        await prisma.student.create({
            data: student
        })
        await prisma.studentInfo.create({
            data: StudentInfo
        })

    } catch (error) {
        throw error
    }

}
const updateStudent = async (student: Student, StudentInfo: StudentInfo) => {
    await prisma.student.update({
        where: {
            id: student.id
        },
        data: student
    })
    await prisma.studentInfo.update({
        where: {
            id: StudentInfo.id
        },
        data: StudentInfo
    })
}
const getTopStudent = async () => {
    const top10 = await prisma.studentInfo.findMany({
        include: {
            Student: true
        },

        take: 10
    })
    return top10
}
export { getAllStudents, getAllStudent, getStudentById, deleteStudent, createStudent, updateStudent, getTopStudent, getStudentByIdToUpdate };