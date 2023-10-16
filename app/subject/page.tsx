"use client";
import React, { useState, useEffect } from "react";
import { Department, Subject } from "@prisma/client";
import toast from "react-hot-toast";
import Link from "next/link";
import { AlertTriangle, FileSignature, PlusCircle, Trash2 } from "lucide-react";
import { ColDef, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { deleteSubject, getAllSubjects } from "../lib/prisma/subject";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";

ModuleRegistry.registerModules([SetFilterModule, ExcelExportModule]);
function Page() {
    const [subject, setSubject] = useState<
        ({
            department: Department | null;
        } & Subject)[]
    >([]);
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
    useEffect(() => {
        (async () => {
            const allSubject = await getAllSubjects();
            setSubject(allSubject);
        })();
    }, []);

    const handleDelete = async () => {
        toast.promise(deleteSubject(selectedSubject as string), {
            loading: "Đang xoá...",
            success: () => {
                setSubject(subject.filter((d) => d.id !== selectedSubject));
                setSelectedSubject(null);
                modalRef.current?.close();
                return "Xoá thành công";
            },
            error: "Xoá thất bại",
        });
    };

    const modalRef = React.useRef<any>(null);
    const gridApiRef = React.useRef<any>(null);
    const columnDefs: ColDef<any>[] = [
        {
            field: "id",
            headerName: "Mã môn học",
            floatingFilter: true,
            filter: "text",
        },

        {
            field: "name",
            headerName: "Tên môn học",
            floatingFilter: true,
            filter: "text",
        },
        {
            field: "department.name",
            headerName: "Tên khoa",
            floatingFilter: true,
        },
        {
            field: "credit",
            headerName: "Số tín chỉ",
        },
        {
            field: "id",
            headerName: "Hành dộng",
            floatingFilter: false,
            filter: false,
            sortable: false,

            cellRenderer: (params: any) => {
                return (
                    <div className="flex gap-2 items-center h-full">
                        <Link
                            href={`/subject/edit/${params.value}`}
                            className="btn btn-link btn-xs"
                        >
                            <FileSignature color="hsl(var(--wa))" />
                        </Link>
                        <button
                            onClick={() => {
                                setSelectedSubject(params.value);
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
    return (
        <div className="min-h-screen w-full p-6">
            <div className="bg-base-100">
                <Link href={"/subject/add"} className="btn btn-primary">
                    <PlusCircle />
                    Thêm mới
                </Link>
                <div className="my-8 flex ">
                    <span className="font-bold text-2xl">
                        Danh sách tất cả các môn học
                    </span>

                    <div className="ml-auto flex gap-2"></div>
                </div>
                <div className="ag-theme-material w-full h-screen">
                    <div className="h-2/3">
                        <AgGridReact
                            defaultColDef={{
                                flex: 1,
                                sortable: true,
                                resizable: true,
                                filter: true,
                                filterParams: {
                                    debounceMs: 0,
                                },
                            }}
                            onGridReady={(gridApi) => {
                                gridApiRef.current = gridApi.api;
                            }}
                            enableAdvancedFilter
                            animateRows
                            columnDefs={columnDefs}
                            rowData={subject}
                            pagination
                            paginationPageSize={20}
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
