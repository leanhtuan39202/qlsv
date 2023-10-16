"use client";
import React, { useState, useEffect } from "react";
import { SchoolYear } from "@prisma/client";
import toast from "react-hot-toast";
import Link from "next/link";
import { AlertTriangle, FileSignature, PlusCircle, Trash2 } from "lucide-react";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { deleteSchoolYear, getAllSchoolYear } from "../lib/prisma/schoolyear";
import { useAppContext } from "../(provider)/appProvider";

function Page() {
    const [schoolYear, setschoolYear] = useState<SchoolYear[]>([]);
    const [selectedSchoolYear, setSelectedSchoolYear] = useState<number | null>(
        null
    );

    useEffect(() => {
        (async () => {
            const allSchoolYear = await getAllSchoolYear();
            setschoolYear(allSchoolYear);
        })();
    }, []);

    const handleDelete = async () => {
        toast.promise(deleteSchoolYear(selectedSchoolYear as number), {
            loading: "Đang xoá...",
            success: () => {
                setschoolYear(
                    schoolYear.filter((d) => d.id !== selectedSchoolYear)
                );
                setSelectedSchoolYear(null);
                modalRef.current?.close();
                return "Xoá thành công";
            },
            error: "Xoá thất bại",
        });
    };
    const { theme } = useAppContext();

    const modalRef = React.useRef<any>(null);

    const columnDefs: ColDef[] = [
        {
            field: "id",
            headerName: "Mã niên khoá",
            floatingFilter: true,
        },
        {
            field: "schoolyear",
            headerName: "Tên niên khoá",
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
                            href={`/schoolyear/edit/${params.value}`}
                            className="btn btn-link btn-xs"
                        >
                            <FileSignature color="hsl(var(--wa))" />
                        </Link>
                        <button
                            onClick={() => {
                                setSelectedSchoolYear(params.value);
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
                <Link href={"/schoolyear/add"} className="btn btn-primary">
                    <PlusCircle />
                    Thêm mới
                </Link>
                <div className="my-8 flex ">
                    <span className="font-bold text-2xl">
                        Danh sách tất cả các niên khoá
                    </span>

                    <div className="ml-auto flex gap-2"></div>
                </div>
                <div
                    className={`${
                        theme === "dark"
                            ? "ag-theme-alpine-dark"
                            : "ag-theme-material"
                    }  w-full h-screen`}
                >
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
                            animateRows
                            columnDefs={columnDefs}
                            rowData={schoolYear}
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
