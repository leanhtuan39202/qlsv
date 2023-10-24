"use client";
import React, { useState, useEffect } from "react";
import {
    Classes,
    Department,
    SchoolYear,
    Status,
    Student,
    StudentInfo,
} from "@prisma/client";
import toast from "react-hot-toast";
import Link from "next/link";
import {
    AlertTriangle,
    Eye,
    FileSignature,
    PlusCircle,
    Trash2,
} from "lucide-react";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useAppContext } from "@/app/(provider)/appProvider";
import { deleteStudent, getAllStudents } from "../lib/prisma/student";

type studentMixed = ({
    department: Department | null;
    classes: Classes | null;
    schoolyear: SchoolYear | null;
    StudentInfo: StudentInfo | null;
} & Student)[];

function Page() {
    const [studentList, setStudentList] = useState<studentMixed>([]);
    const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const allStudent = await getAllStudents();
            setStudentList(allStudent);
        })();
    }, []);

    const handleDelete = async () => {
        toast.promise(deleteStudent(selectedStudent as string), {
            loading: "Đang xoá...",
            success: () => {
                setStudentList(
                    studentList.filter((i) => i.id !== selectedStudent)
                );
                setSelectedStudent(null);
                modalRef.current?.close();
                return "Xoá thành công";
            },
            error: "Xoá thất bại",
        });
    };

    const modalRef = React.useRef<any>(null);

    const columnDefs: ColDef[] = [
        {
            field: "id",
            headerName: "Mã sinh viên",
            floatingFilter: true,
        },
        {
            field: "StudentInfo.image",
            headerName: "Ảnh",
            floatingFilter: false,
            cellRenderer: (params: any) => {
                return (
                    <img
                        src={params.value}
                        alt="avatar"
                        className="w-24 h-24 object-cover"
                    />
                );
            },
        },
        {
            field: "fullname",
            headerName: "Tên sinh viên",
            floatingFilter: true,
        },
        {
            field: "department.name",
            headerName: "Khoa",
            floatingFilter: true,
        },
        {
            field: "schoolyear.schoolyear",
            headerName: "Niên khoá",
            floatingFilter: true,
        },
        {
            field: "StudentInfo.status",
            headerName: "Trạng thái",
            floatingFilter: false,
            cellRenderer: (params: any) => {
                return (
                    <div className="flex gap-2 items-center">
                        {params.value === Status.STUDYING ? (
                            <div className="badge badge-info  badge-lg">
                                Đang học
                            </div>
                        ) : params.value === Status.STOP ? (
                            <div className="badge badge-error badge-lg">
                                Thôi học
                            </div>
                        ) : (
                            <div className="badge badge-warning badge-lg">
                                Bảo lưu
                            </div>
                        )}
                    </div>
                );
            },
        },
        {
            field: "id",
            headerName: "Hành động",
            floatingFilter: false,

            cellRenderer: (params: any) => {
                return (
                    <div className="flex gap-2 items-center h-full">
                        <Link
                            href={`/student/${params.value}`}
                            className="btn btn-link btn-xs"
                        >
                            <Eye color="hsl(var(--su))" />
                        </Link>
                        <Link
                            href={`/student/edit/${params.value}`}
                            className="btn btn-link btn-xs"
                        >
                            <FileSignature color="hsl(var(--wa))" />
                        </Link>
                        <button
                            onClick={() => {
                                setSelectedStudent(params.value);
                                modalRef?.current?.showModal();
                            }}
                            className="btn btn-link btn-xs"
                        >
                            <Trash2 color="hsl(var(--er))" />
                        </button>
                    </div>
                );
            },
        },
    ];
    const { theme } = useAppContext();
    return (
        <div className="min-h-screen w-full p-6">
            <div className="bg-base-100">
                <Link href={"/student/add"} className="btn btn-primary">
                    <PlusCircle />
                    Thêm mới
                </Link>
                <div className="my-8 flex ">
                    <span className="font-bold text-2xl">
                        Danh sách tất cả sinh viên
                    </span>

                    <div className="ml-auto flex gap-2"></div>
                </div>
                <div
                    className={`${
                        theme === "dark" || theme === "blackpink"
                            ? "ag-theme-alpine-dark"
                            : "ag-theme-material"
                    } w-full h-screen`}
                >
                    <div className="h-2/3">
                        <AgGridReact
                            defaultColDef={{
                                flex: 1,
                                sortable: true,
                                resizable: true,
                                filter: true,
                            }}
                            columnDefs={columnDefs}
                            rowData={studentList}
                            pagination
                            animateRows
                            paginationPageSize={20}
                            gridOptions={{
                                rowHeight: 100,
                            }}
                        />
                    </div>
                </div>
            </div>

            <dialog id="my_modal_1" className="modal" ref={modalRef}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg flex flex-row gap-2">
                        <AlertTriangle color="orange" />
                        Cảnh báo!
                    </h3>
                    <p className="py-4">
                        Dữ liệu bị xoá sẽ không thể khôi phục. Bạn có muốn xoá
                        không?
                    </p>
                    <div className="modal-action">
                        <button
                            className="btn btn-primary"
                            onClick={handleDelete}
                        >
                            Xoá
                        </button>

                        <form method="dialog">
                            <button className="btn btn-secondary">Huỷ</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}

export default Page;
