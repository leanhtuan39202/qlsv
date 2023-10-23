'use server'
import { Classes, Student } from "@prisma/client";
import prisma from ".";

const getAllClasses = async () => {
    const classes = await prisma.classes.findMany({
        include: {
            department: true,
            Instructor: true,
            Student: true,
            schoolyear: true,
            specialized: true
        }
    });
    return classes;
}
const getClassById = async (id: string) => {
    const classes = await prisma.classes.findUnique({
        where: {
            id,
        },
        include: {
            department: true,
            Instructor: true,
            Student: true,
            schoolyear: true,
            specialized: true
        }
    });
    return classes;
}
const getClassByIdWithNoRelation = async (id: string) => {
    const classes = await prisma.classes.findUnique({
        where: {
            id,
        },
    });
    return classes;
}
const createClass = async (data: Classes, student?: Student[],) => {
    const classes = await prisma.classes.create({
        data: {
            ...data,
            Student: {
                createMany: {
                    data: student ? student : [],
                }
            }
        }
    });
    return classes;
}
const updateClass = async (id: string, data: Classes) => {
    const classes = await prisma.classes.update({
        where: {
            id
        },
        data
    });
    return classes;
}

const deleteClass = async (id: string) => {
    const classes = await prisma.classes.delete({
        where: {
            id
        }
    });
    return classes;
}
export { getAllClasses, getClassById, createClass, deleteClass, updateClass, getClassByIdWithNoRelation };
