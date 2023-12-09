"use client";
import React, { useState, useEffect, useContext } from "react";
import {
    Classes,
    Department,
    Instructor,
    SchoolYear,
    Student,
} from "@prisma/client";
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
import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";
import { ColDef, GridApi, ModuleRegistry } from "ag-grid-community";
import { AppContext } from "@/app/(provider)/appProvider";
import { deleteClass, getAllClasses } from "../lib/prisma/classes";
import { SetFilterModule } from "ag-grid-enterprise";

ModuleRegistry.registerModules([ExcelExportModule, SetFilterModule]);

type classesMixed = ({
    department: Department | null;
    Student: Student[];
    Instructor: Instructor;
    schoolyear: SchoolYear;
} & Classes)[];

function Page() {
    const [classes, setClasses] = useState<classesMixed>([]);
    const [selectedClass, setSelectedClass] = useState<string | null>(null);
    useEffect(() => {
        (async () => {
            const allClasses = await getAllClasses();
            setClasses(allClasses as classesMixed);
        })();
    }, []);

    const [columnDefs] = useState<ColDef<any>[]>([
        { field: "id", headerName: "Mã lớp", flex: 1 },
        {
            field: "name",
            headerName: "Tên lớp",
            floatingFilter: false,
            filter: "text",
            flex: 1,
        },
        {
            field: "department.name",
            headerName: "Tên khoa",
            filter: "text",
            flex: 1,
        },
        {
            field: "id",
            headerName: "Thông tin",
            floatingFilter: false,
            minWidth: 400,
            flex: 0,
            suppressSizeToFit: true,
            cellRenderer: (params: any) => {
                return (
                    <div className="flex flex-col">
                        <span>Sĩ số: {params.data.Student.length}</span>
                        <span>
                            Niên khoá: {params.data.schoolyear.schoolyear}
                        </span>
                        {params?.data.Instructor?.id && (
                            <span>
                                Giáo viên chủ nhiệm:{" "}
                                <Link
                                    className="btn btn-link btn-xs"
                                    href={
                                        "/instructor/" +
                                        params.data.Instructor.id
                                    }
                                >
                                    {params.data.Instructor.fullname}
                                </Link>
                            </span>
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
                    <div className="flex gap-2 h-full items-center">
                        <Link
                            href={`/classes/${params.value}`}
                            className="btn btn-link btn-xs"
                        >
                            <Eye color="hsl(var(--su))" />
                        </Link>
                        <Link
                            href={`/classes/edit/${params.value}`}
                            className="btn btn-link btn-xs"
                        >
                            <FileSignature color="hsl(var(--wa))" />
                        </Link>
                        <button
                            onClick={() => {
                                setSelectedClass(params.value);
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
    ]);
    const handleDelete = async () => {
        toast.promise(deleteClass(selectedClass as string), {
            loading: "Đang xoá...",
            success: "Xoá thành công",
            error: "Xoá thất bại",
        });
        setClasses(classes.filter((c) => c.id !== selectedClass));
        setSelectedClass(null);
        modalRef.current?.close();
    };
    const gridApiRef = React.useRef<GridApi<Department>>();

    const modalRef = React.useRef<any>(null);
    const exportData = () => {
        gridApiRef?.current?.exportDataAsExcel({
            processCellCallback: (params) => {
                if (params.column.getColDef().headerName == "Hành động") {
                    params.value = null;
                }
                if (params.column.getColId() == "founding") {
                    params.value = new Date(params.value).toLocaleDateString();
                }
                return params.value;
            },
        });
    };
    const { theme } = useContext(AppContext);

    return (
        <div className="min-h-screen w-full p-6">
            <div className="bg-base-100">
                <Link href={"/classes/add"} className="btn btn-primary">
                    <PlusCircle />
                    Thêm mới
                </Link>
                <div className="my-8 flex justify-between">
                    <span className="font-bold text-2xl">
                        Danh sách tất cả các lớp học
                    </span>
                    <div>
                        <button
                            className="btn-outline btn btn-success"
                            onClick={exportData}
                        >
                            <Sheet size={20} />
                            Export
                        </button>
                    </div>
                </div>

                <div
                    className={`${
                        theme === "dark"
                            ? "ag-theme-alpine-dark"
                            : "ag-theme-material"
                    }  w-full h-screen`}
                >
                    <div className="h-2/3">
                        <AgGridReact<any>
                            onGridReady={(params) => {
                                gridApiRef.current = params.api;
                            }}
                            defaultColDef={{
                                sortable: true,
                                resizable: true,
                                filter: true,
                                floatingFilter: true,
                                filterParams: {
                                    debounceMs: 0,
                                },
                            }}
                            animateRows
                            gridOptions={{
                                rowHeight: 150,
                            }}
                            pagination
                            paginationPageSize={20}
                            rowData={classes}
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
