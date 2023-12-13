"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Department, Specialized, Subject } from "@prisma/client";
import toast from "react-hot-toast";
import { addSubject } from "../../lib/prisma/subject";
import { getAllDepartments } from "../../lib/prisma/department";
function Page() {
    async function add(value: Subject) {
        const { id, name, departmentId, credit } = value;
        await addSubject({
            id,
            name,
            credit: Number(credit),
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
            toast.promise(add(value), {
                loading: "Đang thêm...",
                success: () => {
                    formik.resetForm({
                        values: {
                            id: "",
                            name: "",
                            credit: 1,
                            departmentId: "",
                        },
                    });
                    return "Thêm thành công";
                },
                error: "Thêm thất bại mã môn học đã tồn tại",
            });
        },
    });
    const [department, setDepartment] = React.useState([] as Department[]);

    useEffect(() => {
        (async () => {
            const allDepartment = await getAllDepartments();
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
                            value={"Thêm"}
                        />
                        <input
                            type="reset"
                            className="btn btn-secondary"
                            value={"Xoá hết"}
                            onClick={() => {
                                formik.resetForm({
                                    values: {
                                        id: "",
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
                            value={formik.values.departmentId || "chọn khoa"}
                            onChange={formik.handleChange}
                            name="departmentId"
                            defaultValue={"chọn khoa"}
                            className="select select-bordered w-full max-w-md"
                        >
                            <option value={"chọn khoa"}>Chọn khoa </option>
                            {department.map((department) => (
                                <option
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

export default Page;
