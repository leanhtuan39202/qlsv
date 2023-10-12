"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {
    updateDepartment,
    getDepartmentById,
} from "@/app/lib/prisma/department";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Department } from "@prisma/client";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

interface Props {
    params: {
        id: string;
    };
}
function page({ params }: Props) {
    async function add(value: Department) {
        const { id, name, founding, description } = value;
        await updateDepartment({
            id,
            name,
            description,
            founding: new Date(founding),
        });
    }
    console.log(params.id);
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
                loading: "Đang sửa...",
                success: "Sửa thành công",
                error: "Sửa thất bại, có lỗi xảy ra vui lòng thử lại",
            });
        },
    });

    useEffect(() => {
        (async () => {
            const currentDepartment = await getDepartmentById(params.id);
            formik.setValues(currentDepartment as Department);
        })();
    }, []);

    return (
        <div className="min-h-screen w-full p-6">
            <div className="my-8">
                <span className="font-bold text-2xl">Sửa thông tin khoa</span>
            </div>
            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-row gap-8"
            >
                <div>
                    <div className="form-control">
                        <label htmlFor="name" className="p-2">
                            Mã khoa
                        </label>
                        <input
                            onChange={formik.handleChange}
                            name="id"
                            type="text"
                            disabled
                            value={formik.values.id}
                            className="input input-bordered w-full max-w-xs"
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
                            value={formik.values.name}
                            className="input input-bordered w-full max-w-xs"
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
                            value={
                                new Date(formik.values.founding)

                                    .toISOString()
                                    .split("T")[0]
                            }
                            required
                            onChange={formik.handleChange}
                            name="founding"
                            type="date"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                    <div className="form-control mt-4 flex flex-row gap-4 justify-between">
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
                        spellCheck={false}
                        onChange={formik.handleChange}
                        name="description"
                        cols={30}
                        rows={4}
                        value={formik.values.description || ""}
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
