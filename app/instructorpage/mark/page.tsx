"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getTermByInstructorId } from "@/app/(dashboard)/lib/prisma/term";
import { useSession } from "next-auth/react";

function Page() {
    const { data: session } = useSession();

    const [term, setTerm] = useState([] as any);

    useEffect(() => {
        (async () => {
            const allterm = await getTermByInstructorId(
                session?.user?.name as string
            );
            setTerm(allterm as any);
        })();
    }, [session]);

    return (
        <div className="min-h-screen w-full p-6">
            <div className="bg-base-100">
                <div className="flex justify-between items-center">
                    <div className="my-8 flex ">
                        <span className="font-bold text-2xl">Quản lý điểm</span>
                    </div>
                    <Link
                        href={`/instructorpage/`}
                        className="btn btn-primary btn-sm"
                    >
                        Quay lại
                    </Link>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table mt-8 table-lg">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã lớp học phần</th>
                            <th>Tên lớp học phần</th>
                            <th>Số tín chỉ</th>
                            <th>Sĩ số lớp</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {term.map((term: any, index: number) => (
                            <tr key={term.id}>
                                <td>{index + 1}</td>
                                <td>{term.id}</td>
                                <td>{term.name}</td>
                                <td>{term.subject.credit}</td>
                                <td>{term.Enrollment.length}</td>
                                <td>
                                    <Link
                                        href={`/instructorpage/mark/${term.id}`}
                                    >
                                        Xem
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Page;
