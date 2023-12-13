import { getStudentById } from "@/app/(dashboard)/lib/prisma/student";
import { authOption } from "@/app/api/auth/[...nextauth]/option";
import { Gender, Status } from "@prisma/client";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

async function Page() {
    const session = (await getServerSession(authOption as any)) as any;
    const studentInfo = await getStudentById(session?.user?.name as string);
    return (
        <div className="w-full min-h-screen p-6">
            <div className="my-8 flex justify-between">
                <span className="font-bold text-2xl">
                    Thông tin sinh viên: {studentInfo?.fullname}
                </span>
            </div>
            <form className="flex flex-col lg:flex-row">
                <div className="w-96">
                    <div className=" mt-2">
                        {studentInfo?.StudentInfo?.image ? (
                            <div className="avatar">
                                <div className="w-96 h-96 rounded-md object-cover ">
                                    <img src={studentInfo.StudentInfo.image} />
                                </div>
                            </div>
                        ) : (
                            <div className="w-96 h-96 bg-base-300 rounded-md flex items-center justify-center">
                                Chưa có ảnh đại diện
                            </div>
                        )}
                    </div>

                    <div className="form-control">
                        <label className="label">Số CMND</label>
                        <input
                            disabled
                            type="text"
                            name="StudentInfo.identificationNumber"
                            value={
                                studentInfo?.StudentInfo?.identificationNumber
                            }
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control mt-2">
                        <label className="label">Số điện thoại</label>
                        <input
                            value={studentInfo?.StudentInfo?.phone}
                            type="text"
                            name="StudentInfo.phone"
                            disabled
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">Email</label>
                        <input
                            value={studentInfo?.StudentInfo?.email}
                            type="text"
                            disabled
                            name="StudentInfo.email"
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">Niên khoá</label>
                        <input
                            value={studentInfo?.schoolyear?.schoolyear}
                            type="text"
                            disabled
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>
                <div className="w-2/3 min-h-screen ml-16 space-y-5">
                    <div className="form-control">
                        <label className="label">Mã sinh viên</label>
                        <input
                            type="text"
                            name="student.id"
                            disabled
                            value={studentInfo?.id}
                            className="input input-bordered  w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">Họ và tên</label>
                        <input
                            value={studentInfo?.fullname}
                            type="text"
                            name="student.fullname"
                            disabled
                            className="input input-bordered  w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">Giới tính</label>
                        <input
                            value={
                                studentInfo?.StudentInfo?.gender === Gender.MALE
                                    ? "Nam"
                                    : "Nữ" || ""
                            }
                            type="text"
                            disabled
                            className="input input-bordered  w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">Ngày sinh</label>
                        <input
                            type="text"
                            disabled
                            name="birth"
                            value={studentInfo?.StudentInfo?.birth.toLocaleDateString()}
                            className="input input-bordered  w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">Nơi sinh</label>
                        <input
                            type="text"
                            name="StudentInfo.placeOfBirth"
                            value={studentInfo?.StudentInfo?.placeOfBirth}
                            disabled
                            className="input input-bordered  w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">Quê quán</label>
                        <input
                            type="text"
                            name="StudentInfo.homeTown"
                            value={studentInfo?.StudentInfo?.homeTown}
                            disabled
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">Địa chỉ</label>
                        <input
                            type="text"
                            name="student.address"
                            value={studentInfo?.address}
                            disabled
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control flex flex-row justify-between gap-16">
                        <div className="form-control w-full">
                            <label className="label">Dân tộc</label>
                            <input
                                type="text"
                                name="StudentInfo.nation"
                                value={studentInfo?.StudentInfo?.nation || ""}
                                disabled
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">Tôn giáo</label>
                            <input
                                type="text"
                                name="StudentInfo.religion"
                                value={studentInfo?.StudentInfo?.religion || ""}
                                disabled
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>
                    <div className="form-control flex flex-row justify-between gap-16">
                        <div className="form-control w-full">
                            <label className="label">Khoa</label>
                            <input
                                type="text"
                                name="student.department_id"
                                disabled
                                value={studentInfo?.department?.name}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">Lớp</label>
                            <input
                                type="text"
                                name="student.class_id"
                                disabled
                                value={studentInfo?.classes?.name}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">Chuyên ngành</label>
                            <input
                                type="text"
                                disabled
                                value={studentInfo?.department?.name}
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>
                    <fieldset
                        className="border border-solid py-8 px-4"
                        style={{
                            borderColor: "oklch(var(--bc) / 0.2",
                            borderRadius: "var(--rounded-btn, 0.5rem)",
                            borderWidth: 1,
                        }}
                    >
                        <legend className="label font-semibold">
                            Tình trạng học tập
                        </legend>
                        <div className="flex flex-col">
                            <div className="form-control flex flex-row gap-8">
                                <div className="form-control w-full">
                                    <label className="label">Trạng thái</label>
                                    <input
                                        type="text"
                                        disabled
                                        value={
                                            studentInfo?.StudentInfo?.status ===
                                            Status.STUDYING
                                                ? "Đang học"
                                                : studentInfo?.StudentInfo
                                                      ?.status === Status.STOP
                                                ? "Thôi học"
                                                : "Bảo lưu"
                                        }
                                        className="input input-bordered w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset
                        className="border border-solid py-8 px-4"
                        style={{
                            borderColor: "oklch(var(--bc) / 0.2",
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
                                        disabled
                                        name="StudentInfo.fatherName"
                                        value={
                                            studentInfo?.StudentInfo?.fatherName
                                        }
                                        className="input input-bordered w-full"
                                    />
                                </div>
                                <div className="form-control w-full">
                                    <label className="label">Nghề nghiệp</label>
                                    <input
                                        type="text"
                                        disabled
                                        name="StudentInfo.fatherWork"
                                        value={
                                            studentInfo?.StudentInfo
                                                ?.fatherWork || ""
                                        }
                                        className="input input-bordered w-full"
                                    />
                                </div>
                                <div className="form-control w-full">
                                    <label className="label">SĐT</label>
                                    <input
                                        type="text"
                                        disabled
                                        name="StudentInfo.fatherPhone"
                                        value={
                                            studentInfo?.StudentInfo
                                                ?.fatherPhone || ""
                                        }
                                        className="input input-bordered w-full"
                                    />
                                </div>
                            </div>
                            <div className="form-control flex flex-row gap-8">
                                <div className="form-control w-full">
                                    <label className="label">Tên Mẹ</label>
                                    <input
                                        type="text"
                                        disabled
                                        name="StudentInfo.motherName"
                                        value={
                                            studentInfo?.StudentInfo?.motherName
                                        }
                                        className="input input-bordered w-full"
                                    />
                                </div>
                                <div className="form-control w-full">
                                    <label className="label">Nghề nghiệp</label>
                                    <input
                                        type="text"
                                        disabled
                                        name="StudentInfo.motherWork"
                                        value={
                                            studentInfo?.StudentInfo
                                                ?.motherWork || ""
                                        }
                                        className="input input-bordered w-full"
                                    />
                                </div>
                                <div className="form-control w-full">
                                    <label className="label">SĐT</label>
                                    <input
                                        disabled
                                        type="text"
                                        name="StudentInfo.motherPhone"
                                        value={
                                            studentInfo?.StudentInfo
                                                ?.motherPhone || ""
                                        }
                                        className="input input-bordered w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <div className="form-control flex flex-row gap-4">
                        <Link
                            href={`/studentpage/`}
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
