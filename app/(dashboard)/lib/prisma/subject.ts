"use server";
import { Subject } from "@prisma/client";
import prisma from ".";

const getAllSubjects = async () => {
    const subjects = await prisma.subject.findMany({
        include: {
            department: true,
        }
    });
    return subjects;
}
const getSubjectById = async (id: string) => {
    const subject = await prisma.subject.findUnique({
        where: {
            id
        },
        include: {
            department: true,
        }
    })
    return subject
}
const addSubject = async (subject: Subject) => {
    await prisma.subject.create({
        data: subject
    })
}
const deleteSubject = async (id: string) => {
    await prisma.subject.delete({
        where: {
            id
        }
    })
}

const updateSubject = async (subject: Subject) => {
    await prisma.subject.update({
        where: {
            id: subject.id
        },
        data: subject
    })
}
export { getAllSubjects, getSubjectById, addSubject, deleteSubject, updateSubject }

