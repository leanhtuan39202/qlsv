"use client";

import { getTopStudent } from "@/app/(dashboard)/lib/prisma/student";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
function TopStudent() {
    const [topStudent, setTopStudent] = useState<any>([]);
    const router = useRouter();
    useEffect(() => {
        (async () => {
            const allStudent = await getTopStudent();
            setTopStudent(allStudent);
        })();
    }, []);
    return (
        <div className="w-96 xl:w-[30%] md:w-1/3 bg-base-200 p-4 mt-6 rounded-md shadow-2xl">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-lg">Top học sinh</h1>
            </div>
            <div className="divider"></div>
            <div className="max-h-96 overflow-auto">
                {topStudent.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Mã sinh viên</th>
                                    <th>Tên</th>
                                    <th>GPA</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topStudent.map((s: any, index: number) => (
                                    <tr
                                        key={index}
                                        onClick={() => {
                                            router.push(
                                                "/student/" + s.Student.id
                                            );
                                        }}
                                        className="cursor-pointer"
                                    >
                                        <th>{index + 1}</th>
                                        <td>{s.Student.id}</td>
                                        <td>{s.Student.fullname}</td>
                                        <td>{s.gpa4}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-2xl font-bold">
                            Chưa có sinh viên
                        </h1>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TopStudent;
