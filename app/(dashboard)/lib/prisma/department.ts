"use server";
import { Department } from "@prisma/client";
import prisma from ".";


const getAllDepartments = async () => {

    const departments = await prisma.department.findMany();
    return departments;

}
const getAllDepartmentsWithFullInfo = async (id: string) => {
    const departments = await prisma.department.findUnique({
        include: {
            classes: true,
            Student: true,
            specialized: true,
            Instructor: true
        },
        where: {
            id
        },
    });
    return departments
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

export { addDepartment, getAllDepartments, deleteDepartment, updateDepartment, getDepartmentById, getAllDepartmentsWithFullInfo };