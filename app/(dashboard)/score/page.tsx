"use client";
import React, { useState, useEffect } from "react";
import { getAllDepartments, deleteDepartment } from "../lib/prisma/department";
import { Department } from "@prisma/client";
import Link from "next/link";
import { getTermByDepartmentId } from "../lib/prisma/term";

function Page() {
    const [departments, setDepartments] = useState<Department[]>([]);

    const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
        departments[0]?.id
    );

    const [term, setTerm] = useState([] as any);

    useEffect(() => {
        (async () => {
            const allDepartments = await getAllDepartments();
            setDepartments(allDepartments);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const allterm = await getTermByDepartmentId(
                selectedDepartment as string
            );
            setTerm(allterm as any);
        })();
    }, [selectedDepartment]);

    return (
        <div className="min-h-screen w-full p-6">
            <div className="bg-base-100">
                <div className="my-8 flex ">
                    <span className="font-bold text-2xl">Quản lý điểm</span>

                    <div className="ml-auto flex gap-2"></div>
                </div>
                <div>
                    <span>Chọn khoa:</span>
                    <select
                        onChange={(e) => {
                            setSelectedDepartment(e.target.value);
                        }}
                        className="select select-bordered mx-2"
                    >
                        {departments.map((department) => (
                            <option key={department.id} value={department.id}>
                                {department.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table mt-8 table-lg">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã lớp học phần</th>
                            <th>Tên lớp học phần</th>
                            <th>Giáo viên hướng dẫn</th>
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
                                <td>{term.instructor.fullname}</td>
                                <td>{term.subject.credit}</td>
                                <td>{term.Enrollment.length}</td>
                                <td>
                                    <Link href={`/score/${term.id}`}>Xem</Link>
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
