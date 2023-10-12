"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Department, Specialized } from "@prisma/client";
import toast from "react-hot-toast";
import { addSpecialized } from "@/app/lib/prisma/spec";
import { getAllDepartments } from "@/app/lib/prisma/department";
function page() {
    async function add(value: Specialized) {
        const { id, name, description, department_id } = value;
        await addSpecialized({
            id,
            name,
            description,
            department_id,
        });
    }
    const formikSchema = Yup.object<Specialized>({
        id: Yup.string().required("Vui lòng nhập mã chuyên ngành"),
        name: Yup.string().required("Vui lòng nhập tên chuyên ngành"),
        description: Yup.string(),
        department_id: Yup.string().required("Vui lòng chọn chuyên khoa"),
    });
    const formik = useFormik<Specialized>({
        initialValues: {
            id: "",
            name: "",
            description: "",
            department_id: "",
        },
        validationSchema: formikSchema,
        onSubmit: (value) => {
            console.log(value);
            toast.promise(add(value), {
                loading: "Đang thêm...",
                success: "Thêm thành công",
                error: "Thêm thất bại mã chuyên ngành đã tồn tại",
            });
            formik.resetForm({
                values: {
                    id: "",
                    name: "",
                    description: "",
                    department_id: "",
                },
            });
        },
    });
    const [department, setDepartment] = React.useState([] as Department[]);

    useEffect(() => {
        (async () => {
            const allDepartment = await getAllDepartments();
            setDepartment(allDepartment);
            formik.setFieldValue("department_id", department[0]?.id);
        })();
    }, []);
    return (
        <div className="min-h-screen w-full p-6">
            <div className="my-8">
                <span className="font-bold text-2xl">
                    Thêm mới chuyên ngành
                </span>
            </div>
            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-row gap-8"
            >
                <div className="max-w-md">
                    <div className="form-control">
                        <label htmlFor="name" className="p-2">
                            Mã chuyên ngành
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
                            Tên chuyên ngành
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
                            Khoa
                        </label>
                        <select
                            onChange={formik.handleChange}
                            name="department_id"
                            defaultValue={department[0]?.id}
                            className="select select-bordered w-full max-w-sm"
                        >
                            {department.map((department) => (
                                <option
                                    value={department.id}
                                    key={department.id}
                                >
                                    {department.name}
                                </option>
                            ))}
                        </select>
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
                                        id: "",
                                        name: "",
                                        department_id: "",
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
