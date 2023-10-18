"use client";
import Link from "next/link";
import React, { useEffect } from "react";

import * as Yup from "yup";
import { useFormik } from "formik";
import { Department, Specialized } from "@prisma/client";
import toast from "react-hot-toast";
import {
    getSpecializedById,
    updateSpecialized,
} from "@/app/(dashboard)/lib/prisma/spec";
import { getAllDepartments } from "@/app/(dashboard)/lib/prisma/department";

interface Props {
    params: {
        id: string;
    };
}
function Page({ params }: Props) {
    async function add(value: Specialized) {
        const { id, name, department_id, description } = value;
        await updateSpecialized({
            id,
            name,
            description,
            department_id,
        });
    }
    const formikSchema = Yup.object({
        id: Yup.string().required("Vui lòng nhập mã chuyên ngành"),
        name: Yup.string().required("Vui lòng nhập tên chuyên ngành"),
        department_id: Yup.string().required("Vui lòng chọn khoa"),
        description: Yup.string(),
    });

    const [currentSpecialized, setcurrentSpecialized] = React.useState<
        Specialized & { department: Department }
    >();

    const formik = useFormik<Specialized>({
        initialValues: {
            id: "",
            name: "",
            department_id: "",
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

    const [department, setDepartment] = React.useState([] as Department[]);
    useEffect(() => {
        (async () => {
            const currentSpecialized = await getSpecializedById(params.id);
            setcurrentSpecialized(
                currentSpecialized as Specialized & {
                    department: Department;
                }
            );
            formik.setValues(currentSpecialized as Specialized);
            const allDepartment = await getAllDepartments();
            setDepartment(allDepartment);
        })();
    }, []);

    console.log(formik.values.department_id);
    return (
        <div className="min-h-screen w-full p-6">
            <div className="my-8">
                <span className="font-bold text-2xl">
                    Sửa thông tin chuyên ngành
                </span>
            </div>
            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-row gap-8"
            >
                <div>
                    <div className="form-control">
                        <label htmlFor="name" className="p-2">
                            Mã chuyên ngành
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
                            Tên chuyên ngành
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
                            Khoa
                        </label>
                        <select
                            name="department_id"
                            onChange={formik.handleChange}
                            className="select select-bordered w-full max-w-xs"
                            defaultValue={currentSpecialized?.department?.id}
                        >
                            <option value={currentSpecialized?.department?.id}>
                                {currentSpecialized?.department?.name}
                            </option>
                            {department
                                .filter(
                                    (d) =>
                                        d.id !==
                                        currentSpecialized?.department?.id
                                )
                                .map((d) => (
                                    <option key={d.id} value={d.id}>
                                        {d.name}
                                    </option>
                                ))}
                        </select>
                        <p>
                            <span className="text-error">
                                {formik.errors.department_id}
                            </span>
                        </p>
                    </div>
                    <div className="form-control mt-4 flex flex-row gap-4 justify-between">
                        <input
                            type="button"
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
                                        description: "",
                                        department_id: "",
                                    },
                                });
                            }}
                        />
                        <Link
                            href={"/department"}
                            type="button"
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

export default Page;
