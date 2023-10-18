"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Department, Subject } from "@prisma/client";
import toast from "react-hot-toast";
import {
    getSubjectById,
    updateSubject,
} from "@/app/(dashboard)/lib/prisma/subject";
import { getAllDepartments } from "@/app/(dashboard)/lib/prisma/department";

interface Props {
    params: {
        id: string;
    };
}
function page({ params }: Props) {
    const { id } = params;
    async function update(value: Subject) {
        const { id, name, departmentId, credit } = value;
        await updateSubject({
            id,
            name,
            credit,
            departmentId,
        });
    }
    const formikSchema = Yup.object<Subject>({
        id: Yup.string().required("Vui lòng nhập mã môn học"),
        name: Yup.string().required("Vui lòng nhập tên môn học"),
        credit: Yup.number()
            .required("Vui lòng nhập số tín chỉ")
            .min(1, "Số tín chỉ không đc nhỏ hơn 1")
            .max(9, "Số tín chỉ không đc lớn hơn 9")
            .typeError("Số tín chỉ phải là số"),
        departmentId: Yup.string().required("Vui lòng chọn khoa"),
    });
    const formik = useFormik<Subject>({
        initialValues: {
            id: "",
            name: "",
            credit: 1,
            departmentId: "",
        },
        validationSchema: formikSchema,
        onSubmit: (value) => {
            console.log(value);
            toast.promise(update(value), {
                loading: "Đang sửa...",
                success: () => {
                    return "Sửa thành công";
                },
                error: "Sửa thất bại có lỗi xảy ra",
            });
        },
    });
    const [department, setDepartment] = React.useState([] as Department[]);

    const [currentSubject, setCurrentSubject] = React.useState<
        Subject & { department?: Department }
    >();

    useEffect(() => {
        (async () => {
            const allDepartment = await getAllDepartments();
            const currentSubject = await getSubjectById(id);
            setCurrentSubject(
                currentSubject as Subject & {
                    department?: Department;
                }
            );
            formik.setValues(currentSubject as Subject);

            setDepartment(allDepartment);
        })();
    }, []);
    return (
        <div className="min-h-screen w-full p-6">
            <div className="my-8">
                <span className="font-bold text-2xl">Thêm mới môn học</span>
            </div>
            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-row gap-8"
            >
                <div className="max-w-md w-full">
                    <div className="form-control">
                        <label htmlFor="name" className="p-2">
                            Mã môn học
                        </label>
                        <input
                            value={formik.values.id}
                            onChange={formik.handleChange}
                            name="id"
                            type="text"
                            disabled
                            className="input input-bordered w-full max-w-sm"
                        />
                        <p>
                            <span className="text-error">
                                {formik.errors.id}
                            </span>
                        </p>
                    </div>
                    <div className="form-control">
                        <label htmlFor="name" className="p-2">
                            Tên môn học
                        </label>
                        <input
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            type="text"
                            name="name"
                            className="input input-bordered w-full max-w-sm"
                        />
                        <p>
                            <span className="text-error">
                                {formik.errors.name}
                            </span>
                        </p>
                    </div>

                    <div className="form-control mt-8 flex flex-row gap-4 justify-between max-w-xs">
                        <input
                            type="submit"
                            className="btn btn-primary"
                            value={"Sửa"}
                        />
                        <input
                            type="reset"
                            className="btn btn-secondary"
                            value={"Xoá hết"}
                            onClick={() => {
                                formik.resetForm({
                                    values: {
                                        id: currentSubject?.id ?? "",
                                        name: "",
                                        credit: 1,
                                        departmentId: "",
                                    },
                                });
                            }}
                        />
                        <Link
                            href={"/subject"}
                            type="submit"
                            className="btn btn-accent"
                        >
                            Quay lại
                        </Link>
                    </div>
                </div>
                <div className=" w-full">
                    <div className="form-control">
                        <label htmlFor="name" className="p-2">
                            Số tín chỉ
                        </label>
                        <input
                            value={formik.values.credit}
                            onChange={formik.handleChange}
                            type="text"
                            name="credit"
                            className="input input-bordered w-full max-w-md"
                        />
                        <p>
                            <span className="text-error">
                                {formik.errors.credit}
                            </span>
                        </p>
                    </div>
                    <div className="form-control">
                        <label htmlFor="name" className="p-2">
                            Thuộc khoa
                        </label>
                        <select
                            onChange={formik.handleChange}
                            name="departmentId"
                            defaultValue={""}
                            className="select select-bordered w-full max-w-md"
                        >
                            <option value="">Chọn khoa</option>
                            {department.map((department) => (
                                <option
                                    selected={
                                        currentSubject?.department?.id ===
                                        department.id
                                    }
                                    value={department.id}
                                    key={department.id}
                                >
                                    {department.name}
                                </option>
                            ))}
                        </select>
                        <p>
                            <span className="text-error">
                                {formik.errors.departmentId}
                            </span>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default page;
