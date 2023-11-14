"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Instructor, Subject, Term, TermStatus } from "@prisma/client";
import toast from "react-hot-toast";
import { getTermById, updateTerm } from "@/app/(dashboard)/lib/prisma/term";

import { getAllSubjects } from "@/app/(dashboard)/lib/prisma/subject";
import { getAllIntructor } from "@/app/(dashboard)/lib/prisma/instructor";

interface Props {
    params: {
        id: string;
    };
}
function Page({ params }: Props) {
    async function update(value: Term) {
        await updateTerm({
            ...value,
            maxStudent: Number(value.maxStudent),
        });
    }
    const formikSchema = Yup.object<Term>({
        id: Yup.string().required("Vui lòng nhập mã học phần"),
        name: Yup.string().required("Vui lòng nhập tên học phần"),
        instructorId: Yup.string().required("Vui lòng chọn giảng viên"),
        subjectId: Yup.string().required("Vui lòng chọn môn học"),
        maxStudent: Yup.number()
            .required("Vui lòng nhập số lượng sinh viên")
            .min(1, "Số lượng phải lớn hơn 0"),
    });
    const formik = useFormik<Term>({
        initialValues: {
            id: "",
            name: "",
            instructorId: "",
            subjectId: "",
            status: TermStatus.OPEN,
            maxStudent: 0,
        },
        validationSchema: formikSchema,
        onSubmit: (value) => {
            console.log(value);
            toast.promise(update(value), {
                loading: "Đang sửa...",
                success: () => {
                    return "Sửa thành công";
                },
                error: (error) => {
                    return "Sửa thất bại, vui lòng thử lại" + error;
                },
            });
        },
    });

    const [instructorList, setInstructorList] = useState<Instructor[]>([]);

    const [subjectList, setSubjectList] = useState<Subject[]>([]);

    useEffect(() => {
        (async () => {
            const [getInstructor, getSubject, currentTerm] = await Promise.all([
                getAllIntructor(),
                getAllSubjects(),
                getTermById(params.id),
            ]);
            setInstructorList(getInstructor);
            setSubjectList(getSubject);

            formik.setValues({
                id: currentTerm?.id || "",
                name: currentTerm?.name || "",
                instructorId: currentTerm?.instructorId || "",
                subjectId: currentTerm?.subjectId || "",
                status: currentTerm?.status || TermStatus.OPEN,
                maxStudent: currentTerm?.maxStudent || 0,
            });
        })();
    }, []);
    return (
        <div className="min-h-screen w-full p-6">
            <div className="my-8">
                <span className="font-bold text-2xl">Sửa học phần</span>
            </div>
            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-row gap-8"
            >
                <div className="max-w-md w-full">
                    <div className="form-control">
                        <label htmlFor="name" className="p-2">
                            Mã học phần
                        </label>
                        <input
                            value={formik.values.id}
                            onChange={formik.handleChange}
                            name="id"
                            disabled
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
                            Tên học phần
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
                    <div className="form-control">
                        <label htmlFor="name" className="p-2">
                            Sĩ số tối đa
                        </label>
                        <input
                            value={formik.values.maxStudent}
                            onChange={formik.handleChange}
                            type="text"
                            name="maxStudent"
                            className="input input-bordered w-full max-w-sm"
                        />
                        <p>
                            <span className="text-error">
                                {formik.errors.maxStudent}
                            </span>
                        </p>
                    </div>

                    <div className="form-control mt-8 flex flex-row gap-4  max-w-xs">
                        <input
                            type="submit"
                            className="btn btn-primary"
                            value={"Sửa"}
                        />

                        <Link
                            href={"/term"}
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
                            Môn học
                        </label>
                        <select
                            value={formik.values.subjectId || "Chọn Môn học"}
                            onChange={formik.handleChange}
                            name="subjectId"
                            defaultValue={"chọn môn học"}
                            className="select select-bordered w-full max-w-md"
                        >
                            <option value={"chọn môn học"}>Chọn môn học</option>
                            {subjectList?.map((i) => (
                                <option value={i.id} key={i.id}>
                                    {i.id} - {i.name}
                                </option>
                            ))}
                        </select>
                        <p>
                            <span className="text-error">
                                {formik.errors.instructorId}
                            </span>
                        </p>
                    </div>
                    <div className="form-control">
                        <label htmlFor="name" className="p-2">
                            Giảng viên
                        </label>
                        <select
                            value={
                                formik.values.instructorId || "Chọn giảng viên"
                            }
                            onChange={formik.handleChange}
                            name="instructorId"
                            defaultValue={"chọn giảng viên"}
                            className="select select-bordered w-full max-w-md"
                        >
                            <option value={"chọn giảng viên"}>
                                Chọn Giảng viên hướng dẫn
                            </option>
                            {instructorList?.map((i) => (
                                <option value={i.id} key={i.id}>
                                    {i.id} - {i.fullname}
                                </option>
                            ))}
                        </select>
                        <p>
                            <span className="text-error">
                                {formik.errors.instructorId}
                            </span>
                        </p>
                    </div>
                    <div className="form-control">
                        <label htmlFor="name" className="p-2">
                            Trạng thái
                        </label>
                        <select
                            value={formik.values.status || 0}
                            onChange={formik.handleChange}
                            name="status"
                            defaultValue={0}
                            className="select select-bordered w-full max-w-md"
                        >
                            <option value={TermStatus.OPEN}>Mở</option>
                            <option value={TermStatus.CLOSED}>Đóng</option>
                        </select>
                        <p>
                            <span className="text-error">
                                {formik.errors.status}
                            </span>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Page;
