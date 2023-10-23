import React from "react";
import { getClassById } from "../../lib/prisma/classes";
import Link from "next/link";

interface Props {
    params: {
        id: string;
    };
}
async function Page({ params }: Props) {
    const { id } = params;

    const classes = await getClassById(id);

    return (
        <div className="min-h-screen w-full p-6">
            <div className="my-8 flex justify-between">
                <span className="font-bold text-2xl">
                    Thông tin lớp {classes?.name}
                </span>
            </div>
            <div className="flex flex-row gap-40">
                <div className="flex flex-col gap-2">
                    <span>Mã lớp: {classes?.id}</span>
                    <span>Tên lớp: {classes?.name}</span>
                    <span>
                        Giáo viên chủ nhiệm:
                        <Link
                            className="btn btn-link btn-sm"
                            href={"/instructor/" + classes?.Instructor?.id}
                        >
                            {classes?.Instructor?.fullname}
                        </Link>
                    </span>
                </div>
                <div className="flex flex-col gap-2">
                    <span>Khoa: {classes?.department?.name}</span>
                    <span>Chuyên ngành: {classes?.specialized?.name}</span>
                    <span>Niên khoá: {classes?.schoolyear?.schoolyear}</span>
                    <span>Sĩ số: {classes?.Student.length}</span>
                </div>
            </div>
            <div>
                <div className="my-8 flex flex-col">
                    <span className="font-bold text-2xl">
                        Danh sách sinh viên
                    </span>
                    <div className="overflow-x-auto">
                        <table className="table table-lg">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Mã sinh viên</th>
                                    <th>Họ và tên</th>
                                    <th>Địa chỉ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classes?.Student.map((student, index) => (
                                    <tr key={student.id}>
                                        <th>{index + 1}</th>
                                        <th>{student.id}</th>
                                        <td>
                                            <Link
                                                className="hover:text-primary capitalize"
                                                href={`/student/${student.id}`}
                                            >
                                                {student.fullname}
                                            </Link>
                                        </td>
                                        <td className="capitalize">
                                            {student.address}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
