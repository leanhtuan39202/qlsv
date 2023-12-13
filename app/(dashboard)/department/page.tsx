"use client";
import React, { useState, useEffect, useContext } from "react";
import { getAllDepartments, deleteDepartment } from "../lib/prisma/department";
import { Department } from "@prisma/client";
import toast from "react-hot-toast";
import Link from "next/link";
import {
    AlertTriangle,
    Eye,
    FileSignature,
    PlusCircle,
    Sheet,
    Trash2,
} from "lucide-react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridApi } from "ag-grid-community";
import { AppContext } from "@/app/(provider)/appProvider";

function Page() {
    const [department, setDepartment] = useState([] as Department[]);
    const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
        null
    );
    useEffect(() => {
        (async () => {
            const allDepartment = await getAllDepartments();
            setDepartment(allDepartment);
        })();
    }, []);

    const [columnDefs] = useState<ColDef<Department>[]>([
        { field: "id", headerName: "Mã khoa" },
        { field: "name", headerName: "Tên khoa", filter: "text" },
        {
            field: "founding",
            headerName: "Ngày thành lập",
            floatingFilter: false,
        },
        { field: "description", headerName: "Mô tả", floatingFilter: false },
        {
            field: "id",
            headerName: "Hành động",

            floatingFilter: false,

            cellRenderer: (params: any) => {
                return (
                    <div className="flex gap-2 h-full items-center">
                        <Link
                            href={`/department/${params.value}`}
                            className="btn btn-link btn-xs"
                        >
                            <Eye color="oklch(var(--su))" />
                        </Link>
                        <Link
                            href={`/department/edit/${params.value}`}
                            className="btn btn-link btn-xs"
                        >
                            <FileSignature color="oklch(var(--wa))" />
                        </Link>
                        <button
                            onClick={() => {
                                setSelectedDepartment(params.value);
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
    ]);
    const handleDelete = async () => {
        toast.promise(deleteDepartment(selectedDepartment as string), {
            loading: "Đang xoá...",
            success: "Xoá thành công",
            error: "Xoá thất bại",
        });
        setDepartment(department.filter((d) => d.id !== selectedDepartment));
        setSelectedDepartment(null);
        modalRef.current?.close();
    };

    const modalRef = React.useRef<any>(null);

    const { theme } = useContext(AppContext);

    return (
        <div className="min-h-screen w-full p-6">
            <div className="bg-base-100">
                <Link href={"/department/add"} className="btn btn-primary">
                    <PlusCircle />
                    Thêm mới
                </Link>
                <div className="my-8 flex justify-between">
                    <span className="font-bold text-2xl">
                        Danh sách tất cả các khoa
                    </span>
                </div>

                <div
                    className={`${
                        theme === "dark"
                            ? "ag-theme-alpine-dark"
                            : "ag-theme-material"
                    }  w-full h-screen`}
                >
                    <div className="h-2/3">
                        <AgGridReact<Department>
                            defaultColDef={{
                                flex: 1,
                                sortable: true,
                                resizable: true,
                                filter: true,
                                floatingFilter: true,
                                filterParams: {
                                    debounceMs: 0,
                                },
                            }}
                            animateRows
                            pagination
                            paginationPageSize={20}
                            rowData={department}
                            columnDefs={columnDefs}
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
