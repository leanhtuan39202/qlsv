import { getServerSession } from "next-auth";
import React from "react";
import { getStudentById } from "../(dashboard)/lib/prisma/student";
import { authOption } from "../api/auth/[...nextauth]/option";
import Link from "next/link";
import { BarChart, LockKeyhole, PenSquare, UserCircle2 } from "lucide-react";
import Logout from "./logout";
import { getInstructorById } from "../(dashboard)/lib/prisma/instructor";

async function Page() {
    const session = (await getServerSession(authOption as any)) as any;
    const instructorInfo = await getInstructorById(
        session?.user?.name as string
    );
    return (
        <div className=" h-full">
            <div className="flex flex-row">
                <div className="p-8 flex flex-col justify-center space-y-2 ">
                    <img
                        src={instructorInfo?.image as string}
                        alt="student_img"
                        className="object-cover w-48 h-48 rounded-full"
                    />
                </div>
                <div className="my-8 flex gap-16 justify-between h-48 ">
                    <div className="flex flex-col gap-4">
                        <p className="text-lg">
                            <span className="font-bold"> Mã giảng viên:</span>{" "}
                            {instructorInfo?.id}
                        </p>
                        <p>
                            <span className="font-bold">Ngày sinh:</span>{" "}
                            {instructorInfo?.birth.toLocaleDateString()}
                        </p>
                        <p>
                            <span className="font-bold">Khoa:</span>{" "}
                            {instructorInfo?.department?.name}
                        </p>
                        <p>
                            <span className="font-bold">Chủ nhiệm lớp:</span>{" "}
                            {instructorInfo?.Classes?.name}
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-lg">
                            <span className="font-bold">Họ và tên:</span>{" "}
                            {instructorInfo?.fullname}
                        </p>
                        <p>
                            <span className="font-bold">Giới tính:</span>{" "}
                            {instructorInfo?.gender === "MALE" ? "Nam" : "Nữ"}
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full flex gap-8 p-4 flex-wrap">
                <Link
                    href={"/instructorpage/info"}
                    className="card w-96 bg-base-200 shadow-xl"
                >
                    <figure className="px-10 pt-10">
                        <UserCircle2 size={48} color="hsl(var(--p))" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Thông tin cá nhân</h2>
                    </div>
                </Link>

                <Link
                    href={"instructorpage/mark"}
                    className="card w-96 bg-base-200 shadow-xl"
                >
                    <figure className="px-10 pt-10">
                        <BarChart size={48} color="hsl(var(--a))" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Quản lý điểm</h2>
                    </div>
                </Link>
                <Link
                    href={"instructorpage/password"}
                    className="card w-96 bg-base-200 shadow-xl"
                >
                    <figure className="px-10 pt-10">
                        <LockKeyhole size={48} color="hsl(var(--n))" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Đổi Mật khẩu</h2>
                    </div>
                </Link>
                <Logout />
            </div>
        </div>
    );
}

export default Page;
