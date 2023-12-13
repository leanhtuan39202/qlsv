"use client";
import React, { useState, useEffect } from "react";
import { Department, Instructor } from "@prisma/client";
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
import { deleteInstructor, getAllIntructor } from "../lib/prisma/instructor";
import { useAppContext } from "@/app/(provider)/appProvider";

type instructorMixed = ({
    department: Department | null;
} & Instructor)[];

function Page() {
    const [instructor, setIntructor] = useState<instructorMixed>([]);
    const [selectedInstructor, setSelectedInstructor] = useState<string | null>(
        null
    );

    useEffect(() => {
        (async () => {
            const allIntructor = await getAllIntructor();
            setIntructor(allIntructor);
        })();
    }, []);

    const handleDelete = async () => {
        toast.promise(deleteInstructor(selectedInstructor as string), {
            loading: "Đang xoá...",
            success: () => {
                setIntructor(
                    instructor.filter((i) => i.id !== selectedInstructor)
                );
                setSelectedInstructor(null);
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
            headerName: "Mã giảng viên",
            floatingFilter: true,
        },
        {
            field: "image",
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
            headerName: "Tên giảng viên",
            floatingFilter: true,
        },
        {
            field: "department.name",
            headerName: "Khoa",
            floatingFilter: true,
        },
        {
            field: "phone",
            headerName: "Số điện thoại",
            floatingFilter: true,
        },
        {
            field: "id",
            headerName: "Hành dộng",
            floatingFilter: false,

            cellRenderer: (params: any) => {
                return (
                    <div className="flex gap-2 items-center h-full">
                        <Link
                            href={`/instructor/${params.value}`}
                            className="btn btn-link btn-xs"
                        >
                            <Eye color="oklch(var(--su))" />
                        </Link>
                        <Link
                            href={`/instructor/edit/${params.value}`}
                            className="btn btn-link btn-xs"
                        >
                            <FileSignature color="oklch(var(--wa))" />
                        </Link>
                        <button
                            onClick={() => {
                                setSelectedInstructor(params.value);
                                modalRef?.current?.showModal();
                            }}
                            className="btn btn-link btn-xs"
                        >
                            <Trash2 color="oklch(var(--er))" />
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
                <Link href={"/instructor/add"} className="btn btn-primary">
                    <PlusCircle />
                    Thêm mới
                </Link>
                <div className="my-8 flex ">
                    <span className="font-bold text-2xl">
                        Danh sách tất cả giảng viên
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
                            rowData={instructor}
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
