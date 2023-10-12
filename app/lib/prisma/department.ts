"use server";
import { Department } from "@prisma/client";
import prisma from ".";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const getAllDepartments = async (input?: string) => {
    if (!input) {
        const departments = await prisma.department.findMany();
        return departments;
    } else {
        const departments = await prisma.department.findMany({
            where: {
                name: {
                    contains: input,
                },

            },
        });
        return departments;
    }

}
const getDepartmentById = async (id: string) => {
    const department = await prisma.department.findUnique({
        where: {
            id,
        },
    })
    return department
}
const deleteDepartment = async (id: string) => {
    await prisma.department.delete({
        where: {
            id,
        },
    });
}
const addDepartment = async (department: Department) => {
    await prisma.department.create({
        data: department,
    });
}
const updateDepartment = async (department: Department) => {
    await prisma.department.update({
        where: {
            id: department.id,
        },
        data: department,
    });

}

export { addDepartment, getAllDepartments, deleteDepartment, updateDepartment, getDepartmentById }