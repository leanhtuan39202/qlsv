"use client";

import {
    getSchoolYearById,
    updateSchoolYear,
} from "@/app/(dashboard)/lib/prisma/schoolyear";
import { SchoolYear } from "@prisma/client";
import { useFormik } from "formik";
import Link from "next/link";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import * as Yub from "yup";
interface Props {
    params: {
        id: string;
    };
}
function Page({ params }: Props) {
    const [currentSchoolYear, setcurrentSchoolYear] =
        React.useState<SchoolYear | null>({} as SchoolYear);
    const { id } = params;
    useEffect(() => {
        (async () => {
            const currentSchoolYear = await getSchoolYearById(+id);
            setcurrentSchoolYear(currentSchoolYear);
            formik.setValues(currentSchoolYear as SchoolYear);
        })();
    }, []);

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
            toast.promise(updateSchoolYear(value), {
                loading: "Đang sửa...",
                success: () => {
                    return "Sửa thành công";
                },
                error: "Sửa thất bại xin thử lại sau ",
            });
        },
    });
    return (
        <div className="min-h-screen w-full p-6">
            <div className="my-8">
                <span className="font-bold text-2xl">
                    Sửa thông tin nên khoá
                </span>
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
                        onChange={formik.handleChange}
                        value={formik.values.schoolyear}
                        className="input input-bordered w-full max-w-lg"
                    />
                    <p className="mt-2">
                        <span className="text-error ">
                            {formik.errors.schoolyear}
                        </span>
                    </p>
                </div>
                <div className="form-control mt-4 flex flex-row justify-between max-w-xs">
                    <button type="submit" className="btn btn-primary w-fit">
                        Sửa
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary w-fit"
                        onClick={() =>
                            formik.resetForm({
                                values: {
                                    schoolyear: "",
                                    id: 0,
                                },
                            })
                        }
                    >
                        Xoá hết
                    </button>
                    <Link href={"/schoolyear"} className="btn btn-accent w-fit">
                        Quay lại
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Page;
