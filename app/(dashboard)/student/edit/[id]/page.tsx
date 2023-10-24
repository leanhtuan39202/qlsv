"use client";
import {
    Classes,
    Department,
    Gender,
    SchoolYear,
    Specialized,
    Status,
    Student,
    StudentInfo,
} from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { getAllDepartments } from "@/app/(dashboard)/lib/prisma/department";
import { getAllSpecialized } from "@/app/(dashboard)/lib/prisma/spec";
import { getAllSchoolYear } from "@/app/(dashboard)/lib/prisma/schoolyear";
import { getAllClassWithNoRelation } from "@/app/(dashboard)/lib/prisma/classes";
import {
    updateStudent,
    getStudentByIdToUpdate,
} from "@/app/(dashboard)/lib/prisma/student";

interface Props {
    params: {
        id: string;
    };
}
function Page({ params }: Props) {
    const { id } = params;
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const [department, setDepartment] = useState<Department[]>([]);

    const [classes, setClasses] = useState<Classes[]>([]);

    const [specialized, setSpecialized] = useState<Specialized[]>([]);

    const [schoolyear, setSchoolYear] = useState<SchoolYear[]>([]);

    const [student, setStudent] = useState<{
        StudentInfo: StudentInfo | null;
        student: Student | null;
    }>();
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
        StudentInfo: Yup.object().shape({
            birth: Yup.date().required("Vui lòng nhập ngày tháng năm sinh"),
            status: Yup.string(),
            email: Yup.string()
                .email("Địa chỉ email không hợp lệ")
                .required("Vui lòng nhập email"),
            phone: Yup.string()
                .matches(/^\d{10,11}$/, "Số điện thoại phải có 10 - 11 chữ số")
                .required("Vui lòng nhập số điện thoại"),
            gender: Yup.string(),
            image: Yup.string().nullable(),
            nation: Yup.string().required("Vui lòng nhập dân tộc"),
            religion: Yup.string().nullable(),
            homeTown: Yup.string().required("Vui lòng nhập quê quán"),
            fatherName: Yup.string().required("Vui lòng nhập tên cha"),
            motherName: Yup.string().required("Vui lòng nhập tên mẹ"),
            identificationNumber: Yup.string()
                .required("Vui lòng nhập số CMND")
                .matches(/^\d{12}$/, "Số CMND phải đủ 12 chữ số"),
            fatherPhone: Yup.string()
                .nullable()
                .matches(/^\d{10,11}$/, "Số điện thoại phải có 10 - 11 chữ số"),
            motherPhone: Yup.string()
                .nullable()
                .matches(/^\d{10,11}$/, "Số điện thoại phải có 10 - 11 chữ số"),
            motherWork: Yup.string().nullable(),
            fatherWork: Yup.string().nullable(),
            placeOfBirth: Yup.string().required("Vui lòng nhập nơi sinh"),
        }),
        student: Yup.object().shape({
            id: Yup.string().required("Vui lòng nhập mã sinh viên"),
            fullname: Yup.string().required("Vui lòng nhập tên sinh viên"),
            address: Yup.string().required("Vui lòng nhập địa chỉ"),
            department_id: Yup.string().nullable(),
            schoolyear_id: Yup.number().nullable(),
            specialized_id: Yup.string().nullable(),
            class_id: Yup.string().nullable(),
        }),
    });

    const formik = useFormik<{
        student: Student;
        StudentInfo: Partial<StudentInfo>;
    }>({
        initialValues: {
            StudentInfo: {
                birth: new Date(),
                student_id: "",
                status: Status.STUDYING,
                email: "",
                phone: "",
                gender: Gender.MALE,
                image: "",
                nation: "",
                religion: null,
                homeTown: "",
                fatherName: "",
                motherName: "",
                identificationNumber: "",
                fatherPhone: null,
                motherPhone: null,
                motherWork: null,
                fatherWork: null,
                placeOfBirth: "",
            },
            student: {
                id: "",
                fullname: "",
                address: "",
                department_id: null,
                schoolyear_id: null,
                specialized_id: null,
                class_id: null,
            },
        },
        validationSchema: formikSchema,
        onSubmit: (value) => {
            toast.promise(edit(value), {
                loading: "Đang sửa...",
                success: () => {
                    return "Sửa thành công";
                },
                error: (error) => {
                    return "Sửa thất bại" + error;
                },
            });
        },
    });
    const edit = async (value: {
        student: Student;
        StudentInfo: Partial<StudentInfo>;
    }) => {
        try {
            updateStudent(
                {
                    ...value.student,
                    class_id: value.student.class_id ?? null,
                    department_id: value.student.department_id ?? null,
                    schoolyear_id: Number(value.student.schoolyear_id) ?? null,
                    specialized_id: value.student.specialized_id ?? null,
                },
                {
                    ...value.StudentInfo,
                    image: selectedImage,
                    gender: value.StudentInfo.gender,
                    birth: new Date(value.StudentInfo.birth as Date),
                } as StudentInfo
            );
        } catch (error) {
            throw error;
        }
    };
    useEffect(() => {
        (async () => {
            const [
                allDepartment,
                allSpecialized,
                allSchoolYear,
                allClasses,
                student,
            ] = await Promise.all([
                getAllDepartments(),
                getAllSpecialized(),
                getAllSchoolYear(),
                getAllClassWithNoRelation(),
                getStudentByIdToUpdate(id),
            ]);
            setDepartment(allDepartment);
            setSpecialized(allSpecialized);
            setSchoolYear(allSchoolYear);
            setClasses(allClasses);
            setStudent(student);
            console.log(student);
            setSelectedImage(student.StudentInfo?.image ?? null);
            formik.setValues({
                student: student.student as Student,
                StudentInfo: student.StudentInfo as StudentInfo,
            });
        })();
    }, []);
    console.log(formik.errors);
    return (
        <div className="w-full min-h-screen p-6">
            <div className="my-8 flex justify-between">
                <span className="font-bold text-2xl">
                    Chỉnh sửa thông tin sinh viên
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
                                <div className="w-96 h-96 rounded-md object-cover ">
                                    <img src={selectedImage} />
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
                        <label className="label">Số CMND</label>
                        <input
                            type="text"
                            name="StudentInfo.identificationNumber"
                            value={
                                formik.values.StudentInfo.identificationNumber
                            }
                            onChange={formik.handleChange}
                            className="input input-bordered w-full"
                        />
                        <p>
                            <span className="text-error">
                                {
                                    formik.errors.StudentInfo
                                        ?.identificationNumber
                                }
                            </span>
                        </p>
                    </div>
                    <div className="form-control mt-2">
                        <label className="label">Số điện thoại</label>
                        <input
                            value={formik.values.StudentInfo.phone}
                            onChange={formik.handleChange}
                            type="text"
                            name="StudentInfo.phone"
                            className="input input-bordered w-full"
                        />
                        <p>
                            <span className="text-error">
                                {formik.errors.StudentInfo?.phone}
                            </span>
                        </p>
                    </div>
                    <div className="form-control">
                        <label className="label">Email</label>
                        <input
                            value={formik.values.StudentInfo.email}
                            onChange={formik.handleChange}
                            type="text"
                            name="StudentInfo.email"
                            className="input input-bordered w-full"
                        />
                        <p>
                            <span className="text-error">
                                {formik.errors.StudentInfo?.email}
                            </span>
                        </p>
                    </div>

                    <div className="form-control">
                        <label className="label">Niên khoá</label>
                        <select
                            name="student.schoolyear_id"
                            onChange={formik.handleChange}
                            className="select select-bordered"
                            value={formik.values.student.schoolyear_id || ""}
                        >
                            <option value={""}>Chọn niên khoá</option>
                            {schoolyear.map((s) => (
                                <option value={s.id} key={s.id}>
                                    {s.schoolyear}
                                </option>
                            ))}
                        </select>
                        <p>
                            <span className="text-error">
                                {formik.errors.student?.schoolyear_id}
                            </span>
                        </p>
                    </div>
                </div>
                <div className="w-2/3 min-h-screen ml-16 space-y-5">
                    <div className="form-control">
                        <label className="label">Mã sinh viên</label>
                        <input
                            type="text"
                            name="student.id"
                            disabled
                            value={formik.values.student.id}
                            onChange={formik.handleChange}
                            className="input input-bordered  w-full"
                        />
                        <p>
                            <span className="text-error">
                                {formik.errors.student?.id}
                            </span>
                        </p>
                    </div>
                    <div className="form-control">
                        <label className="label">Họ và tên</label>
                        <input
                            value={formik.values.student.fullname}
                            onChange={formik.handleChange}
                            type="text"
                            name="student.fullname"
                            className="input input-bordered  w-full"
                        />
                        <p>
                            <span className="text-error">
                                {formik.errors.student?.fullname}
                            </span>
                        </p>
                    </div>
                    <div className="form-control">
                        <label className="label">Giới tính</label>
                        <select
                            name="StudentInfo.gender"
                            onChange={formik.handleChange}
                            value={
                                formik.values?.StudentInfo?.gender ||
                                Gender.MALE
                            }
                            className="select select-bordered w-full"
                        >
                            <option value={Gender.MALE}>Nam</option>
                            <option value={Gender.FEMALE}>Nữ</option>
                        </select>
                        <p>
                            <span className="text-error">
                                {formik.errors.StudentInfo?.gender}
                            </span>
                        </p>
                    </div>
                    <div className="form-control">
                        <label className="label">Ngày sinh</label>
                        <input
                            type="date"
                            name="StudentInfo.birth"
                            required
                            value={
                                new Date(
                                    formik.values.StudentInfo.birth as Date
                                )
                                    .toISOString()
                                    .split("T")[0]
                            }
                            onChange={formik.handleChange}
                            className="input input-bordered  w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">Nơi sinh</label>
                        <input
                            type="text"
                            name="StudentInfo.placeOfBirth"
                            value={formik.values.StudentInfo.placeOfBirth}
                            onChange={formik.handleChange}
                            className="input input-bordered  w-full"
                        />
                        <p>
                            <span className="text-error">
                                {formik.errors.StudentInfo?.placeOfBirth}
                            </span>
                        </p>
                    </div>
                    <div className="form-control">
                        <label className="label">Quê quán</label>
                        <input
                            type="text"
                            name="StudentInfo.homeTown"
                            value={formik.values.StudentInfo.homeTown}
                            onChange={formik.handleChange}
                            className="input input-bordered w-full"
                        />
                        <p>
                            <span className="text-error">
                                {formik.errors.StudentInfo?.homeTown}
                            </span>
                        </p>
                    </div>
                    <div className="form-control">
                        <label className="label">Địa chỉ</label>
                        <input
                            type="text"
                            name="student.address"
                            value={formik.values.student.address}
                            onChange={formik.handleChange}
                            className="input input-bordered w-full"
                        />
                        <p>
                            <span className="text-error">
                                {formik.errors.student?.address}
                            </span>
                        </p>
                    </div>
                    <div className="form-control flex flex-row justify-between gap-16">
                        <div className="form-control w-full">
                            <label className="label">Dân tộc</label>
                            <input
                                type="text"
                                name="StudentInfo.nation"
                                value={formik.values.StudentInfo.nation}
                                onChange={formik.handleChange}
                                className="input input-bordered w-full"
                            />
                            <p>
                                <span className="text-error">
                                    {formik.errors.StudentInfo?.nation}
                                </span>
                            </p>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">Tôn giáo</label>
                            <input
                                type="text"
                                name="StudentInfo.religion"
                                value={
                                    formik.values.StudentInfo.religion ||
                                    undefined
                                }
                                onChange={formik.handleChange}
                                className="input input-bordered w-full"
                            />
                            <p>
                                <span className="text-error">
                                    {formik.errors.StudentInfo?.religion}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="form-control flex flex-row justify-between gap-16">
                        <div className="form-control w-full">
                            <label className="label">Khoa</label>
                            <select
                                name="student.department_id"
                                onChange={formik.handleChange}
                                value={
                                    formik.values.student.department_id || ""
                                }
                                className="select select-bordered w-full"
                            >
                                <option>Chọn khoa</option>
                                {department.map((d) => (
                                    <option value={d.id} key={d.id}>
                                        {d.name}
                                    </option>
                                ))}
                            </select>
                            <p>
                                <span className="text-error">
                                    {formik.errors.student?.department_id}
                                </span>
                            </p>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">Lớp</label>
                            <select
                                name="student.class_id"
                                onChange={formik.handleChange}
                                value={formik.values.student.class_id || ""}
                                className="select select-bordered w-full"
                            >
                                <option>Chọn lớp</option>
                                {classes.map((d) => (
                                    <option value={d.id} key={d.id}>
                                        {d.name}
                                    </option>
                                ))}
                            </select>
                            <p>
                                <span className="text-error">
                                    {formik.errors.student?.class_id}
                                </span>
                            </p>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">Chuyên ngành</label>
                            <select
                                value={
                                    formik.values.student.specialized_id || ""
                                }
                                name="student.specialized_id"
                                onChange={formik.handleChange}
                                className="select select-bordered w-full"
                            >
                                <option>Chọn chuyên ngành</option>
                                {specialized.map((d) => (
                                    <option value={d.id} key={d.id}>
                                        {d.name}
                                    </option>
                                ))}
                            </select>
                            <p>
                                <span className="text-error">
                                    {formik.errors.student?.class_id}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">Trạng thái học tập</label>
                        <select
                            name="StudentInfo.status"
                            onChange={formik.handleChange}
                            value={formik.values.StudentInfo.status}
                            className="select select-bordered w-full"
                        >
                            {[Status.STUDYING, Status.STOP, Status.RESERVE].map(
                                (d) => (
                                    <option value={d} key={d}>
                                        {d === Status.STUDYING
                                            ? "Đang học"
                                            : d === Status.STOP
                                            ? "Thôi học"
                                            : "Bảo lưu"}
                                    </option>
                                )
                            )}
                        </select>
                        <p>
                            <span className="text-error">
                                {formik.errors.student?.class_id}
                            </span>
                        </p>
                    </div>
                    <fieldset
                        className="border border-solid py-8 px-4"
                        style={{
                            borderColor: "hsl(var(--bc) / 0.2",
                            borderRadius: "var(--rounded-btn, 0.5rem)",
                            borderWidth: 1,
                        }}
                    >
                        <legend className="label font-semibold">
                            Thông tin gia đình
                        </legend>
                        <div className="flex flex-col">
                            <div className="form-control flex flex-row gap-8">
                                <div className="form-control w-full">
                                    <label className="label">Tên cha</label>
                                    <input
                                        type="text"
                                        name="StudentInfo.fatherName"
                                        value={
                                            formik.values.StudentInfo.fatherName
                                        }
                                        onChange={formik.handleChange}
                                        className="input input-bordered w-full"
                                    />
                                    <p>
                                        <span className="text-error">
                                            {
                                                formik.errors.StudentInfo
                                                    ?.fatherName
                                            }
                                        </span>
                                    </p>
                                </div>
                                <div className="form-control w-full">
                                    <label className="label">Nghề nghiệp</label>
                                    <input
                                        type="text"
                                        name="StudentInfo.fatherWork"
                                        value={
                                            formik.values.StudentInfo
                                                .fatherWork || undefined
                                        }
                                        onChange={formik.handleChange}
                                        className="input input-bordered w-full"
                                    />
                                    <p>
                                        <span className="text-error">
                                            {
                                                formik.errors.StudentInfo
                                                    ?.fatherWork
                                            }
                                        </span>
                                    </p>
                                </div>
                                <div className="form-control w-full">
                                    <label className="label">SĐT</label>
                                    <input
                                        type="text"
                                        name="StudentInfo.fatherPhone"
                                        value={
                                            formik.values.StudentInfo
                                                .fatherPhone || undefined
                                        }
                                        onChange={formik.handleChange}
                                        className="input input-bordered w-full"
                                    />
                                    <p>
                                        <span className="text-error">
                                            {
                                                formik.errors.StudentInfo
                                                    ?.fatherPhone
                                            }
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="form-control flex flex-row gap-8">
                                <div className="form-control w-full">
                                    <label className="label">Tên Mẹ</label>
                                    <input
                                        type="text"
                                        name="StudentInfo.motherName"
                                        value={
                                            formik.values.StudentInfo.motherName
                                        }
                                        onChange={formik.handleChange}
                                        className="input input-bordered w-full"
                                    />
                                    <p>
                                        <span className="text-error">
                                            {
                                                formik.errors.StudentInfo
                                                    ?.motherName
                                            }
                                        </span>
                                    </p>
                                </div>
                                <div className="form-control w-full">
                                    <label className="label">Nghề nghiệp</label>
                                    <input
                                        type="text"
                                        name="StudentInfo.motherWork"
                                        value={
                                            formik.values.StudentInfo
                                                .motherWork || undefined
                                        }
                                        onChange={formik.handleChange}
                                        className="input input-bordered w-full"
                                    />
                                    <p>
                                        <span className="text-error">
                                            {
                                                formik.errors.StudentInfo
                                                    ?.motherWork
                                            }
                                        </span>
                                    </p>
                                </div>
                                <div className="form-control w-full">
                                    <label className="label">SĐT</label>
                                    <input
                                        type="text"
                                        name="StudentInfo.motherPhone"
                                        value={
                                            formik.values.StudentInfo
                                                .motherPhone || undefined
                                        }
                                        onChange={formik.handleChange}
                                        className="input input-bordered w-full"
                                    />
                                    <p>
                                        <span className="text-error">
                                            {
                                                formik.errors.StudentInfo
                                                    ?.motherPhone
                                            }
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <div className="form-control flex flex-row gap-4">
                        <button type="submit" className="btn btn-primary">
                            Sửa
                        </button>
                        <Link href={`/student/`} className="btn btn-secondary">
                            Quay lại
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Page;
