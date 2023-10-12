"use client";
import React, { useState, useEffect } from "react";
import { getAllDepartments, deleteDepartment } from "../lib/prisma/department";
import { Department } from "@prisma/client";
import toast from "react-hot-toast";
import Link from "next/link";
import { AlertTriangle, FileSignature, PlusCircle, Trash2 } from "lucide-react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef, GridApi } from "ag-grid-community";

function Page() {
    const [department, setDepartment] = useState([] as Department[]);
    const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
        null
    );
    useEffect(() => {
        console.log(1);
        (async () => {
            const allDepartment = await getAllDepartments();
            setDepartment(allDepartment);
        })();
    }, []);

    const [columnDefs] = useState<ColDef<Department>[]>([
        { field: "id", headerName: "Mã khoa", checkboxSelection: true },
        { field: "name", headerName: "Tên khoa" },
        {
            field: "founding",
            headerName: "Ngày thành lập",
            floatingFilter: false,
        },
        { field: "description", headerName: "Mô tả", floatingFilter: false },
        {
            field: "id",
            headerName: "Hành dộng",
            floatingFilter: false,
            cellRenderer: (params: any) => {
                return (
                    <div className="flex gap-2">
                        <Link
                            href={`/department/edit/${params.value}`}
                            className="btn btn-primary btn-xs"
                        >
                            <FileSignature />
                        </Link>
                        <button
                            onClick={() => {
                                setSelectedDepartment(params.value);
                                modalRef?.current?.open();
                            }}
                            className="btn btn-error btn-xs"
                        >
                            <Trash2 />
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
    const gridApiRef = React.useRef<GridApi<Department>>();

    const modalRef = React.useRef<any>(null);
    const exportData = () => {
        gridApiRef?.current?.exportDataAsCsv();
    };
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
                    <div>
                        <button
                            className="btn btn-success btn-xs"
                            onClick={() => exportData()}
                        >
                            export
                        </button>
                    </div>
                </div>

                <div className="ag-theme-alpine w-full h-screen">
                    <div className="h-2/3">
                        <AgGridReact<Department>
                            onGridReady={(params) => {
                                gridApiRef.current = params.api;
                            }}
                            defaultColDef={{
                                flex: 1,
                                sortable: true,
                                resizable: true,
                                filter: true,
                                floatingFilter: true,
                            }}
                            pagination
                            paginationPageSize={20}
                            rowData={department}
                            columnDefs={columnDefs}
                        ></AgGridReact>
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
