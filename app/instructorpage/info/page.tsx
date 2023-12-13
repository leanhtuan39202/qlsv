import { getInstructorById } from "@/app/(dashboard)/lib/prisma/instructor";
import { getStudentById } from "@/app/(dashboard)/lib/prisma/student";
import { authOption } from "@/app/api/auth/[...nextauth]/option";
import { Gender, Status } from "@prisma/client";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

async function Page() {
    const session = (await getServerSession(authOption as any)) as any;
    const instructorInfo = await getInstructorById(
        session?.user?.name as string
    );
    return (
        <div className="w-full min-h-screen p-6">
            <div className="my-8 flex justify-between">
                <span className="font-bold text-2xl">Thông tin giảng viên</span>
            </div>
            <div className="flex flex-col lg:flex-row">
                <div className="w-96">
                    <div className="avatar mt-4">
                        <div className="w-96 rounded">
                            {instructorInfo?.image ? (
                                <img src={instructorInfo?.image} />
                            ) : (
                                <div className="w-96 h-96 rounded-md object-cover bg-base-300 flex  items-center justify-center">
                                    <p>Chưa có ảnh</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">Mã giảng viên</label>
                        <input
                            type="text"
                            value={instructorInfo?.id}
                            disabled
                            className="input input-bordered max-w-lg w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">Khoa</label>
                        <input
                            type="text"
                            value={
                                instructorInfo?.department?.name ||
                                "Chưa có khoa"
                            }
                            disabled
                            className="input input-bordered max-w-lg w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">Chủ nhiệm lớp</label>
                        <input
                            type="text"
                            value={
                                instructorInfo?.Classes?.name ||
                                "Chưa có thông tin"
                            }
                            disabled
                            className="input input-bordered max-w-lg w-full"
                        />
                    </div>
                </div>
                <div className="w-2/3 min-h-screen ml-16 space-y-4">
                    <div className="form-control">
                        <label className="label">Họ và tên</label>
                        <input
                            type="text"
                            value={instructorInfo?.fullname}
                            disabled
                            className="input input-bordered max-w-lg w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">Giới tính</label>
                        <input
                            type="text"
                            value={
                                instructorInfo?.gender === Gender.MALE
                                    ? "Nam"
                                    : "Nữ"
                            }
                            disabled
                            className="input input-bordered max-w-lg w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">Ngày sinh</label>
                        <input
                            type="text"
                            value={instructorInfo?.birth.toLocaleDateString()}
                            disabled
                            className="input input-bordered max-w-lg w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">Địa chỉ</label>
                        <input
                            type="text"
                            value={instructorInfo?.address}
                            disabled
                            className="input input-bordered max-w-lg w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">Trình độ học vấn</label>
                        <input
                            type="text"
                            value={instructorInfo?.level}
                            disabled
                            className="input input-bordered max-w-lg w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">Email</label>
                        <input
                            type="text"
                            value={instructorInfo?.email}
                            disabled
                            className="input input-bordered max-w-lg w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">Số điện thoại</label>
                        <input
                            type="text"
                            value={instructorInfo?.phone}
                            disabled
                            className="input input-bordered max-w-lg w-full"
                        />
                    </div>
                    <div className="form-control flex flex-row gap-4">
                        <Link
                            href={`/instructor/`}
                            className="btn btn-secondary"
                        >
                            Quay lại
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
