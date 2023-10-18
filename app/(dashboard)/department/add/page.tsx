"use client";
import Link from "next/link";
import React from "react";
import { addDepartment } from "@/app/(dashboard)/lib/prisma/department";
import { redirect } from "next/navigation";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Department } from "@prisma/client";
import toast from "react-hot-toast";
function page() {
    async function add(value: Department) {
        const { id, name, founding, description } = value;
        await addDepartment({
            id,
            name,
            description,
            founding: new Date(founding),
        });
    }
    const formikSchema = Yup.object({
        id: Yup.string().required("Vui lòng nhập mã khoa"),
        name: Yup.string().required("Vui lòng nhập tên khoa"),
        founding: Yup.date().required("vui lòng chọn ngày"),
        description: Yup.string(),
    });
    const formik = useFormik<Department>({
        initialValues: {
            id: "",
            name: "",
            founding: new Date(),
            description: "",
        },
        validationSchema: formikSchema,
        onSubmit: (value) => {
            toast.promise(add(value), {
                loading: "Đang thêm...",
                success: "Thêm thành công",
                error: "Thêm thất bại mã khoa đã tồn tại",
            });
            formik.resetForm();
        },
    });
    return (
        <div className="min-h-screen w-full p-6">
            <div className="my-8">
                <span className="font-bold text-2xl">Thêm mới khoa</span>
            </div>
            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-row gap-8"
            >
                <div className="max-w-md">
                    <div className="form-control">
                        <label htmlFor="name" className="p-2">
                            Mã khoa
                        </label>
                        <input
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
                            Tên khoa
                        </label>
                        <input
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
                    <div className="form-control">
                        <label htmlFor="name" className="p-2">
                            Ngày thành lập
                        </label>
                        <input
                            required
                            onChange={formik.handleChange}
                            name="founding"
                            type="date"
                            className="input input-bordered w-full max-w-sm"
                        />
                    </div>
                    <div className="form-control mt-4 flex flex-row gap-4 justify-between">
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
                                        id: formik.values.id,
                                        name: "",
                                        founding: new Date(),
                                        description: "",
                                    },
                                });
                            }}
                        />
                        <Link
                            href={"/department"}
                            type="submit"
                            className="btn btn-accent"
                        >
                            Quay lại
                        </Link>
                    </div>
                </div>
                <div className="form-control">
                    <label htmlFor="name" className="p-2">
                        Mô tả
                    </label>
                    <textarea
                        onChange={formik.handleChange}
                        name="description"
                        cols={60}
                        rows={4}
                        className="textarea textarea-bordered textarea-lg w-full max-w-lg "
                    />
                    <p>
                        <span className="text-error">
                            {formik.errors.description}
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default page;
