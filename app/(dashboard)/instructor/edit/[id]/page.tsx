"use client";
import { Classes, Department, Gender, Instructor } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import {
    getInstructorById,
    updateInstructor,
} from "@/app/(dashboard)/lib/prisma/instructor";
import { getAllDepartments } from "@/app/(dashboard)/lib/prisma/department";

interface Props {
    params: {
        id: string;
    };
}
type instructorMixed = Instructor & {
    department: Department | null;
    Classes: Classes | null;
};
const level = ["Giáo sư", "Phó giáo sư", "Tiến sĩ", "Thạc sĩ"];
function Page({ params }: Props) {
    const { id } = params;
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const [department, setDepartment] = useState<Department[]>([]);

    const [currentInstructor, setCurrentInstructor] =
        useState<instructorMixed | null>(null);

    const chooseImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            //read base64
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                setSelectedImage(reader.result as string);
            };
        }
    };

    const formikSchema = Yup.object().shape({
        id: Yup.string().required("Vui lòng nhập mã giảng viên"),
        fullname: Yup.string().required("Vui lòng nhập tên giảng viên"),
        address: Yup.string().required("Vui lòng nhập địa chỉ"),
        email: Yup.string()
            .email("Địa chỉ email không hợp lệ")
            .required("Vui lòng nhập email"),
        phone: Yup.string()
            .matches(/^\d{10,11}$/, "Số điện thoại phải có 10 - 11 chữ số")
            .required("Vui lòng nhập số điện thoại"),
        level: Yup.string().required("Vui lòng chọn trình độ"),
        departmentId: Yup.string().nullable(),
        image: Yup.string().nullable(),
        gender: Yup.string().required("Vui lòng chọn giới tính"),
        birth: Yup.date().required(),
    });

    const formik = useFormik<instructorMixed>({
        initialValues: {
            id: "",
            fullname: "",
            address: "",
            email: "",
            phone: "",
            level: "",
            departmentId: null,
            image: null,
            gender: Gender.MALE,
            birth: new Date(),
            department: null,
            Classes: null,
        },
        validationSchema: formikSchema,
        onSubmit: (value: instructorMixed) => {
            const { department, Classes, ...other } = value;
            toast.promise(
                updateInstructor({
                    ...other,
                    gender: value.gender as Gender,
                    phone: value.phone + "",
                    image: selectedImage,
                    birth: new Date(value.birth),
                    departmentId:
                        value.departmentId === "" ? null : value.departmentId,
                }),
                {
                    loading: "Đang sửa...",
                    success: () => {
                        return "Sửa thành công";
                    },
                    error: (error) => {
                        return "Sửa thất bại" + error.message;
                    },
                }
            );
        },
    });
    useEffect(() => {
        (async () => {
            const [allDepartment, instructor] = await Promise.all([
                getAllDepartments(),
                getInstructorById(id),
            ]);
            setCurrentInstructor(instructor as instructorMixed);
            setDepartment(allDepartment);
            setSelectedImage(instructor!.image);
            formik.setValues(instructor as instructorMixed);
        })();
    }, []);

    return (
        <div className="w-full min-h-screen p-6">
            <div className="my-8 flex justify-between">
                <span className="font-bold text-2xl">
                    Chỉnh sửa thông tin giảng viên
                </span>
            </div>
            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col lg:flex-row"
            >
                <div className="w-96">
                    <div className=" mt-2">
                        {selectedImage ? (
                            <div className="avatar">
                                <div className="w-96 h-96 rounded-md  ">
                                    <img
                                        src={selectedImage}
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="w-96 h-96 bg-base-300 rounded-md flex items-center justify-center">
                                Chọn ảnh đại diện
                            </div>
                        )}
                    </div>
                    <input
                        type="file"
                        onChange={chooseImg}
                        className="file-input file-input-bordered file-input-primary mt-4 w-full"
                    />
                    <div className="form-control">
                        <label className="label">Mã giảng viên</label>
                        <input
                            type="text"
                            name="id"
                            value={formik.values.id}
                            onChange={formik.handleChange}
                            className="input input-bordered max-w-lg w-full"
                        />
                        <p>
                            <span className="text-error">
                                {formik.errors.id}
                            </span>
                        </p>
                    </div>
                    <div className="form-control">
                        <label className="label">Khoa</label>
                        <select
                            name="departmentId"
                            onChange={formik.handleChange}
                            className="select select-bordered"
                        >
                            <option value="">Chọn khoa</option>
                            {department.map((d) => (
                                <option
                                    value={d.id}
                                    key={d.id}
                                    selected={
                                        d.id === currentInstructor?.departmentId
                                    }
                                >
                                    {d.name}
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
                <div className="w-2/3 min-h-screen ml-16 space-y-5">
                    <div className="form-control">
                        <label className="label">Họ và tên</label>
                        <input
                            value={formik.values.fullname}
                            onChange={formik.handleChange}
                            type="text"
                            name="fullname"
                            className="input input-bordered max-w-lg w-full"
                        />
                        <p>
                            <span className="text-error">
                                {formik.errors.fullname}
                            </span>
                        </p>
                    </div>
                    <div className="form-control">
                        <label className="label">Giới tính</label>
                        <select
                            name="gender"
                            onChange={formik.handleChange}
                            defaultValue={Gender.MALE}
                            className="select select-bordered   max-w-lg w-full"
                        >
                            <option value={Gender.MALE}>Nam</option>
                            <option value={Gender.FEMALE}>Nữ</option>
                        </select>
                        <p>
                            <span className="text-error">
                                {formik.errors.gender}
                            </span>
                        </p>
                    </div>
                    <div className="form-control">
                        <label className="label">Ngày sinh</label>
                        <input
                            type="date"
                            name="birth"
                            value={
                                new Date(formik.values.birth)
                                    .toISOString()
                                    .split("T")[0]
                            }
                            required
                            onChange={formik.handleChange}
                            className="input input-bordered max-w-lg w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">Địa chỉ</label>
                        <input
                            type="text"
                            name="address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            className="input input-bordered max-w-lg w-full"
                        />
                        <p>
                            <span className="text-error">
                                {formik.errors.address}
                            </span>
                        </p>
                    </div>
                    <div className="form-control">
                        <label className="label">Trình độ</label>
                        <select
                            name="level"
                            onChange={formik.handleChange}
                            className="select select-bordered max-w-lg w-full"
                        >
                            <option>Chọn trình độ học vấn</option>
                            {level.map((l) => (
                                <option
                                    value={l}
                                    key={l}
                                    selected={l === formik.values.level}
                                >
                                    {l}
                                </option>
                            ))}
                        </select>
                        <p>
                            <span className="text-error">
                                {formik.errors.level}
                            </span>
                        </p>
                    </div>
                    <div className="form-control">
                        <label className="label">Email</label>
                        <input
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            type="text"
                            name="email"
                            className="input input-bordered max-w-lg w-full"
                        />
                        <p>
                            <span className="text-error">
                                {formik.errors.email}
                            </span>
                        </p>
                    </div>
                    <div className="form-control mt-2">
                        <label className="label">Số điện thoại</label>
                        <input
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            type="text"
                            name="phone"
                            className="input input-bordered max-w-lg w-full"
                        />
                        <p>
                            <span className="text-error">
                                {formik.errors.phone}
                            </span>
                        </p>
                    </div>
                    <div className="form-control flex flex-row gap-4">
                        <button type="submit" className="btn btn-primary">
                            Sửa
                        </button>
                        <Link
                            href={`/instructor/`}
                            className="btn btn-secondary"
                        >
                            Quay lại
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Page;
