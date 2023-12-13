"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
    Classes,
    Department,
    Instructor,
    SchoolYear,
    Specialized,
} from "@prisma/client";
import toast from "react-hot-toast";
import { getAllIntructor } from "@/app/(dashboard)/lib/prisma/instructor";
import { getAllDepartments } from "@/app/(dashboard)/lib/prisma/department";
import { getAllSchoolYear } from "@/app/(dashboard)/lib/prisma/schoolyear";
import { getAllSpecialized } from "@/app/(dashboard)/lib/prisma/spec";
import {
    getClassByIdWithNoRelation,
    updateClass,
} from "@/app/(dashboard)/lib/prisma/classes";

interface Props {
    params: {
        id: string;
    };
}
function Page({ params }: Props) {
    const { id } = params;
    const [listIntructor, setListIntructor] = useState<Instructor[]>([]);

    const [listDepartment, setListDepartment] = useState<Department[]>([]);

    const [listSchoolYear, setListSchoolYear] = useState<SchoolYear[]>([]);

    const [currentClass, setCurrentClass] = useState<any | null>(null);

    async function update(value: Classes) {
        return await updateClass(id, {
            ...value,
            schoolyear_id: Number(value.schoolyear_id),
        });
    }
    const formikSchema = Yup.object({
        id: Yup.string().required("Vui lòng nhập mã lớp"),
        name: Yup.string().required("Vui lòng nhập tên lớp"),
        department_id: Yup.string().required("Vui lòng chọn khoa"),
        schoolyear_id: Yup.string().required("Vui lòng chọn niên khoá"),
        instructorId: Yup.string().required(
            "Vui lòng chọn giáo viên chủ nhiệm"
        ),
    });

    const formik = useFormik<Classes>({
        initialValues: {
            id: "",
            name: "",
            department_id: null,
            schoolyear_id: null,
            instructorId: null,
        },
        validationSchema: formikSchema,
        onSubmit: (value) => {
            console.log(value);
            toast.promise(update(value), {
                loading: "Đang sửa...",
                success: "Sửa thành công",
                error: (error) => {
                    return "Sửa thất bại" + error;
                },
            });
        },
    });

    useEffect(() => {
        (async () => {
            const [allIntructor, allDepartment, allSchoolYear, currentClass] =
                await Promise.all([
                    getAllIntructor(),
                    getAllDepartments(),
                    getAllSchoolYear(),
                    getClassByIdWithNoRelation(id),
                ]);

            setListIntructor(allIntructor.filter((i) => i.Classes === null));
            setListDepartment(allDepartment);
            setListSchoolYear(allSchoolYear);
            setCurrentClass(currentClass);
            formik.setValues(currentClass as any);
        })();
    }, []);

    return (
        <div className="min-h-screen w-full p-6">
            <div className="my-8">
                <span className="font-bold text-2xl">Chỉnh sửa lớp học</span>
            </div>
            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-row gap-8"
            >
                <div className="w-96">
                    <div className="form-control">
                        <label htmlFor="name" className="p-2">
                            Mã lớp
                        </label>
                        <input
                            onChange={formik.handleChange}
                            name="id"
                            type="text"
                            value={formik.values.id}
                            disabled
                            className="input input-bordered w-full max-w-sm"
                        />
                        <p>
                            <span className="text-error">
                                {formik.touched.id && formik.errors.id}
                            </span>
                        </p>
                    </div>
                    <div className="form-control">
                        <label htmlFor="name" className="p-2">
                            Tên lớp
                        </label>
                        <input
                            onChange={formik.handleChange}
                            type="text"
                            name="name"
                            value={formik.values.name}
                            className="input input-bordered w-full max-w-sm"
                        />
                        <p>
                            <span className="text-error">
                                {formik.touched.name && formik.errors.name}
                            </span>
                        </p>
                    </div>

                    <div className="form-control">
                        <label htmlFor="name" className="p-2">
                            Giáo viên chủ nhiệm
                        </label>

                        <select
                            className="select select-bordered w-full max-w-sm"
                            name="instructorId"
                            onChange={formik.handleChange}
                        >
                            {listIntructor.map((instructor) => (
                                <option
                                    selected={
                                        currentClass?.Instructor?.id ===
                                        instructor.id
                                    }
                                    key={instructor.id}
                                    value={instructor.id}
                                >
                                    {instructor.id} - {instructor.fullname}
                                </option>
                            ))}
                        </select>
                        <p>
                            <span className="text-error">
                                {formik.touched.instructorId &&
                                    formik.errors.instructorId}
                            </span>
                        </p>
                    </div>

                    <div className="form-control mt-8 flex flex-row gap-4 justify-between w-80">
                        <input
                            type="submit"
                            className="btn btn-primary"
                            value={"Sửa"}
                        />
                        <input
                            type="reset"
                            className="btn btn-secondary"
                            value={"Xoá hết"}
                        />
                        <Link
                            href={"/classes"}
                            type="submit"
                            className="btn btn-accent"
                        >
                            Quay lại
                        </Link>
                    </div>
                </div>
                <div className="w-96">
                    <div className="form-control">
                        <label htmlFor="name" className="p-2">
                            Khoa
                        </label>
                        <select
                            className="select select-bordered w-full max-w-sm"
                            name="department_id"
                            onChange={formik.handleChange}
                        >
                            {listDepartment.map((department) => (
                                <option
                                    selected={
                                        currentClass?.department?.id ===
                                        department.id
                                    }
                                    key={department.id}
                                    value={department.id}
                                >
                                    {department.name}
                                </option>
                            ))}
                        </select>
                        <p>
                            <span className="text-error">
                                {formik.touched.department_id &&
                                    formik.errors.department_id}
                            </span>
                        </p>
                    </div>

                    <div className="form-control">
                        <label htmlFor="name" className="p-2">
                            Niên khoá
                        </label>
                        <select
                            className="select select-bordered w-full max-w-sm"
                            name="schoolyear_id"
                            onChange={formik.handleChange}
                        >
                            {listSchoolYear.map((schoolyear) => (
                                <option
                                    selected={
                                        currentClass?.schoolyear?.schoolyear ===
                                        schoolyear.schoolyear
                                    }
                                    key={schoolyear.id}
                                    value={schoolyear.id}
                                >
                                    {schoolyear.schoolyear}
                                </option>
                            ))}
                        </select>
                        <p>
                            <span className="text-error">
                                {formik.touched.schoolyear_id &&
                                    formik.errors.schoolyear_id}
                            </span>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Page;
