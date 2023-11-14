'use server'
import { revalidatePath } from "next/cache";
import prisma from ".";
import { Term } from "@prisma/client";

const getAllTerm = async () => {
    const term = await prisma.term.findMany();
    return term;
}

const getAllTermInfo = async () => {
    const term = await prisma.term.findMany({
        include: {
            subject: {
                include: {
                    department: true
                }
            },
            instructor: true
        }
    })
    return term
}
const getTermById = async (id: string) => {
    const term = await prisma.term.findUnique({
        where: {
            id
        },
        include: {
            instructor: {
                select: {
                    fullname: true,
                }
            }
        }
    })
    return term
}

const getTermByInstructorId = async (instructorId: string) => {
    const term = await prisma.term.findMany({
        where: {
            instructorId
        },
        include: {
            subject: true,
            Enrollment: true
        }
    })
    return term
}
const getTermByDepartmentId = async (departmentId: string) => {
    const term = await prisma.term.findMany({
        where: {
            subject: {
                is: {
                    departmentId
                }
            }
        },
        include: {
            subject: true,
            instructor: {
                select: {
                    fullname: true,
                }
            },
            Enrollment: true,
            Score: {
                include: {
                    Student: true
                }
            }
        }
    })
    return term
}
const createTerm = async (data: Term) => {
    await prisma.term.create({
        data: {
            ...data
        }
    })
}
const updateTerm = async (data: Term) => {
    await prisma.term.update({
        where: {
            id: data.id
        },
        data
    })
}
const enroll = async (termId: string, studentId: string) => {
    await prisma.enrollment.create({
        data: {
            termId,
            studentId
        }
    })
    await prisma.score.create({
        data: {
            termId,
            studentId
        }
    })
    revalidatePath("/studentpage/term");

}
const unEnroll = async (termId: string, studentId: string) => {
    await prisma.enrollment.delete({
        where: {
            studentId_termId: {
                termId,
                studentId
            }
        }
    })
    await prisma.score.deleteMany({
        where: {
            studentId,
            termId,
        }
    })
    revalidatePath("/studentpage/term");
}
export { getAllTerm, getTermById, getTermByDepartmentId, enroll, unEnroll, createTerm, getAllTermInfo, getTermByInstructorId, updateTerm }