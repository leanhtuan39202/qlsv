"use client";
import { SchoolYear } from "@prisma/client";
import { useFormik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import * as Yub from "yup";
import Link from "next/link";
import { addSchoolYear } from "../../lib/prisma/schoolyear";
function page() {
    const validationSchema = Yub.object({
        schoolyear: Yub.string()
            .required("Vui lòng nhập niên khoá")
            .matches(/^(19|20)\d{2} - (19|20)\d{2}$/, {
                message:
                    "Niên khoá phải theo định dạng  yyyy - yyyy ví dụ 2023 - 2024",
            }),
    });
    const formik = useFormik<SchoolYear>({
        initialValues: {
            schoolyear: "",
            id: 0,
        },
        validationSchema,
        onSubmit: (value) => {
            toast.promise(addSchoolYear(value), {
                loading: "Đang thêm...",
                success: () => {
                    formik.resetForm({
                        values: {
                            schoolyear: "",
                            id: 0,
                        },
                    });
                    return "Thêm thành công";
                },
                error: "Thêm thất bại ",
            });
        },
    });

    return (
        <div className="min-h-screen w-full p-6">
            <div className="my-8">
                <span className="font-bold text-2xl">Thêm mới niên khoá</span>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-control">
                    <label htmlFor="name" className="p-2">
                        Nhập niên khóa
                    </label>
                    <input
                        type="text"
                        placeholder="ex: 2022-2023"
                        name="schoolyear"
                        value={formik.values.schoolyear}
                        onChange={formik.handleChange}
                        className="input input-bordered w-full max-w-lg"
                    />
                    <p className="mt-2">
                        <span className="text-error ">
                            {formik.errors.schoolyear}
                        </span>
                    </p>
                </div>
                <div className="form-control mt-4 flex justify-between flex-row gap-2 max-w-xs">
                    <button className="btn btn-primary w-fit" type="submit">
                        Thêm
                    </button>
                    <button
                        onClick={() =>
                            formik.resetForm({
                                values: {
                                    schoolyear: "",
                                    id: 0,
                                },
                            })
                        }
                        className="btn btn-secondary w-fit"
                    >
                        Xoá hết
                    </button>
                    <Link href="/schoolyear" className="btn btn-accent w-f">
                        Quay lại
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default page;
