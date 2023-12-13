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
    Student,
} from "@prisma/client";
import toast from "react-hot-toast";
import { createClass } from "../../lib/prisma/classes";
import { getAllSpecialized } from "../../lib/prisma/spec";
import { getAllSchoolYear } from "../../lib/prisma/schoolyear";
import { getAllIntructor } from "../../lib/prisma/instructor";
import { getAllDepartments } from "../../lib/prisma/department";

function Page() {
    const [listIntructor, setListIntructor] = useState<Instructor[]>([]);

    const [listDepartment, setListDepartment] = useState<Department[]>([]);

    const [listSchoolYear, setListSchoolYear] = useState<SchoolYear[]>([]);

    async function add(value: Classes, student?: Student[]) {
        return await createClass(
            {
                ...value,
                schoolyear_id: Number(value.schoolyear_id),
            },
            student
        );
    }
    const formikSchema = Yup.object({
        id: Yup.string().required("Vui lòng nhập mã lớp"),
        name: Yup.string().required("Vui lòng nhập tên lớp"),
        department_id: Yup.string().required("Vui lòng chọn khoa"),
        schoolyear_id: Yup.string().required("Vui lòng chọn niên khoá"),
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
            toast.promise(add(value), {
                loading: "Đang thêm...",
                success: "Thêm thành công",
                error: (error) => {
                    console.log(error);
                    return "Thêm thất bại" + error;
                },
            });
        },
    });

    useEffect(() => {
        (async () => {
            const [allIntructor, allDepartment, allSchoolYear] =
                await Promise.all([
                    getAllIntructor(),
                    getAllDepartments(),
                    getAllSchoolYear(),
                ]);

            setListIntructor(allIntructor.filter((i) => i.Classes === null));
            setListDepartment(allDepartment);
            setListSchoolYear(allSchoolYear);
        })();
    }, []);

    return (
        <div className="min-h-screen w-full p-6">
            <div className="my-8">
                <span className="font-bold text-2xl">Thêm mới lớp học</span>
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
                            <option value={""}>Chọn giáo viên</option>
                            {listIntructor.map((instructor) => (
                                <option
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
                            value={"Thêm"}
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
                            <option value={""}>Chọn khoa</option>
                            {listDepartment.map((department) => (
                                <option
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
                            <option value={""}>Chọn niên khoá</option>
                            {listSchoolYear.map((schoolyear) => (
                                <option
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
