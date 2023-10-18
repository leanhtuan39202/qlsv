"use server"
import { SchoolYear } from "@prisma/client";
import prisma from ".";

const getAllSchoolYear = async () => {
    const schoolYear = await prisma.schoolYear.findMany();
    return schoolYear;
}
const getSchoolYearById = async (id: number) => {
    const schoolYear = await prisma.schoolYear.findUnique({
        where: {
            id,
        }
    });
    return schoolYear;
}

const addSchoolYear = async (schoolYear: SchoolYear) => {
    try {
        await prisma.schoolYear.create({
            data: {
                schoolyear: schoolYear.schoolyear
            },
        });
    }
    catch (error) {
        throw error
    }
}
const deleteSchoolYear = async (id: number) => {
    await prisma.schoolYear.delete({
        where: {
            id,
        }
    })
}

const updateSchoolYear = async (schoolYear: SchoolYear) => {
    await prisma.schoolYear.update({
        where: {
            id: schoolYear.id,
        },
        data: schoolYear,
    });
}
export { getAllSchoolYear, getSchoolYearById, addSchoolYear, deleteSchoolYear, updateSchoolYear };