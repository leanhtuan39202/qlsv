"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Instructor, Subject, Term, TermStatus } from "@prisma/client";
import toast from "react-hot-toast";
import { createTerm } from "../../lib/prisma/term";
import { getAllIntructor } from "../../lib/prisma/instructor";
import { getAllSubjects } from "../../lib/prisma/subject";
function Page() {
    async function add(value: Term) {
        const { id, name, instructorId, subjectId, maxStudent } = value;
        await createTerm({
            id,
            name,
            instructorId,
            subjectId,
            status: TermStatus.OPEN,
            maxStudent: Number(maxStudent),
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
            maxStudent: 60,
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
                            instructorId: "",
                            subjectId: "",
                            status: TermStatus.OPEN,
                            maxStudent: 60,
                        },
                    });
                    return "Thêm thành công";
                },
                error: "Thêm thất bại mã học phần đã tồn tại",
            });
        },
    });

    const [instructorList, setInstructorList] = useState<Instructor[]>([]);

    const [subjectList, setSubjectList] = useState<Subject[]>([]);

    useEffect(() => {
        (async () => {
            const [getInstructor, getSubject] = await Promise.all([
                getAllIntructor(),
                getAllSubjects(),
            ]);
            setInstructorList(getInstructor);
            setSubjectList(getSubject);
        })();
    }, []);
    return (
        <div className="min-h-screen w-full p-6">
            <div className="my-8">
                <span className="font-bold text-2xl">Thêm mới học phần</span>
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
                                        instructorId: "",
                                        subjectId: "",
                                        status: TermStatus.OPEN,
                                        maxStudent: 60,
                                    },
                                });
                            }}
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
                                {formik.errors.subjectId}
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
                </div>
            </form>
        </div>
    );
}

export default Page;
