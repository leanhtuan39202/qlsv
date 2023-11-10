import { getServerSession } from "next-auth";
import React from "react";
import { getStudentById } from "../(dashboard)/lib/prisma/student";
import { authOption } from "../api/auth/[...nextauth]/option";
import Link from "next/link";
import { BarChart, LockKeyhole, PenSquare, UserCircle2 } from "lucide-react";
import Logout from "./logout";

async function Page() {
    const session = (await getServerSession(authOption as any)) as any;
    const studentInfo = await getStudentById(session?.user?.name as string);
    return (
        <div className=" h-full">
            <div className="flex flex-row">
                <div className="p-8 flex flex-col justify-center space-y-2 ">
                    <img
                        src={studentInfo?.StudentInfo?.image as string}
                        alt="student_img"
                        className="object-cover w-48 h-48 rounded-full"
                    />
                </div>
                <div className="my-8 flex gap-16 justify-between items-center h-48 ">
                    <div className="flex flex-col gap-4">
                        <p className="text-lg">
                            <span className="font-bold"> Mã sinh viên:</span>{" "}
                            {studentInfo?.id}
                        </p>
                        <p>
                            <span className="font-bold">Ngày sinh:</span>{" "}
                            {studentInfo?.StudentInfo?.birth.toLocaleDateString()}
                        </p>
                        <p>
                            <span className="font-bold">Khoa:</span>{" "}
                            {studentInfo?.department?.name}
                        </p>
                        <p>
                            <span className="font-bold">Lớp học:</span>{" "}
                            {studentInfo?.classes?.name}
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-lg">
                            <span className="font-bold">Họ và tên:</span>{" "}
                            {studentInfo?.fullname}
                        </p>
                        <p>
                            <span className="font-bold">Giới tính:</span>{" "}
                            {studentInfo?.StudentInfo?.gender === "MALE"
                                ? "Nam"
                                : "Nữ"}
                        </p>
                        <p>
                            <span className="font-bold">Chuyên ngành:</span>{" "}
                            {studentInfo?.specialized?.name}
                        </p>
                        <p>
                            <span className="font-bold">Niên khoá:</span>{" "}
                            {studentInfo?.schoolyear?.schoolyear}
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full flex gap-8 p-4 flex-wrap">
                <Link
                    href={"/studentpage/info"}
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
                    href={"studentpage/term"}
                    className="card w-96 bg-base-200 shadow-xl"
                >
                    <figure className="px-10 pt-10">
                        <PenSquare size={48} color="hsl(var(--s))" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Đăng kí học phần</h2>
                    </div>
                </Link>
                <Link
                    href={"studentpage/mark"}
                    className="card w-96 bg-base-200 shadow-xl"
                >
                    <figure className="px-10 pt-10">
                        <BarChart size={48} color="hsl(var(--a))" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Xem điểm</h2>
                    </div>
                </Link>
                <Link
                    href={"studentpage/password"}
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
