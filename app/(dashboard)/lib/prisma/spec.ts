'use server'
import { Specialized } from "@prisma/client";
import prisma from "."

const getAllSpecialized = async () => {
    const specialized = await prisma.specialized.findMany({
        include: {
            department: true,
        }
    });
    return specialized
}
const getSpecializedById = async (id: string) => {
    const specialized = await prisma.specialized.findUnique({
        where: {
            id,
        },
        include: {
            department: true,
        }
    });
    return specialized
}
const addSpecialized = async (specialized: Specialized) => {
    await prisma.specialized.create({
        data: specialized,
    });
}
const deleteSpecialized = async (id: string) => {
    await prisma.specialized.delete({
        where: {
            id,
        }
    })
}
const updateSpecialized = async (specialized: Specialized) => {
    await prisma.specialized.update({
        where: {
            id: specialized.id,
        },
        data: specialized,
    });
}
export { getAllSpecialized, addSpecialized, deleteSpecialized, updateSpecialized, getSpecializedById }