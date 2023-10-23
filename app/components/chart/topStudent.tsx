"use client";
import { getAllDepartments } from "@/app/(dashboard)/lib/prisma/department";
import { getAllStudents } from "@/app/(dashboard)/lib/prisma/student";
import { Department, Student, StudentInfo } from "@prisma/client";
import React, { useEffect, useState } from "react";

type StudentMixed = ({
    StudentInfo: StudentInfo;
} & Student)[];
function TopStudent() {
    const [department, setDepartment] = useState<Department[]>(
        [] as Department[]
    );

    const [student, setStudent] = useState<StudentMixed>([]);

    const [displayedStudent, setDisplayedStudent] =
        useState<StudentMixed>(student);
    const [selectedDepartment, setSelectedDepartment] = useState("all");

    useEffect(() => {
        (async () => {
            const allDepartment = await getAllDepartments();
            setDepartment(allDepartment);
        })();
        (async () => {
            const allStudent = await getAllStudents();
            setStudent(
                allStudent.sort(
                    (a, b) => b!.StudentInfo!.gpa - a!.StudentInfo!.gpa
                ) as StudentMixed
            );
            setDisplayedStudent(allStudent as StudentMixed);
        })();
    }, []);

    useEffect(() => {
        if (selectedDepartment == "all") {
            setDisplayedStudent(student);
        } else {
            setDisplayedStudent(
                student.filter((s) => s.department_id == selectedDepartment)
            );
        }
    }, [selectedDepartment]);
    console.log(selectedDepartment);

    return (
        <div className="w-96 md:w-1/3 bg-base-200 p-4 mt-6 rounded-md shadow-xl">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-lg">Top học sinh</h1>
                <select
                    className="select w-48"
                    defaultValue="all"
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                    <option value="all">Tất cả</option>
                    {department.map((d) => (
                        <option key={d.id} value={d.id}>
                            {d.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="divider"></div>
            <div className="max-h-96 overflow-auto">
                {displayedStudent.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Mã sinh viên</th>
                                    <th>Tên</th>
                                    <th>GPA</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ...displayedStudent,
                                    ...displayedStudent,
                                    ...displayedStudent,
                                ].map((s, index) => (
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{s.id}</td>
                                        <td>{s.fullname}</td>
                                        <td>{s.StudentInfo.gpa}</td>
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
