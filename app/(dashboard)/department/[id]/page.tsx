"use client";
import React, { useEffect, useState } from "react";
import { getAllDepartmentsWithFullInfo } from "../../lib/prisma/department";
import { Classes, Instructor, Specialized } from "@prisma/client";
import { Eye } from "lucide-react";
import Link from "next/link";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { useAppContext } from "@/app/(provider)/appProvider";

interface Props {
    params: {
        id: string;
    };
}
function Page({ params }: Props) {
    const { id } = params;
    const [departmentInfo, setDepartmentInfo] = useState<any>();
    useEffect(() => {
        (async () => {
            const allDepartment = await getAllDepartmentsWithFullInfo(id);
            setDepartmentInfo(allDepartment);
        })();
    }, []);
    return (
        <div className="w-full min-h-screen">
            <div className="my-8 flex justify-between">
                <span className="font-bold text-2xl">
                    Thông tin chi tiết khoa {departmentInfo?.name}
                </span>
            </div>
            <div className="flex flex-row mt-8 gap-40">
                <div className="flex flex-col gap-2">
                    <p>Mã khoa: {departmentInfo?.id}</p>
                    <p>Tên khoa: {departmentInfo?.name}</p>
                    <p>
                        Ngày thành lập:{" "}
                        {departmentInfo?.founding.toLocaleDateString()}
                    </p>
                    <p>Tổng số lớp: {departmentInfo?.classes.length}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <p>
                        Tổng số giảng viên: {departmentInfo?.Instructor.length}
                    </p>
                    <p>Tổng số sinh viên: {departmentInfo?.Student.length}</p>
                    <p>
                        Tổng số chuyên ngành:{" "}
                        {departmentInfo?.specialized.length}
                    </p>
                </div>
            </div>
            <div className="mt-16">
                {departmentInfo?.classes.length! > 0 && (
                    <TableClass
                        classes={departmentInfo?.classes as Classes[]}
                    />
                )}
            </div>
            <div className="mt-16">
                {departmentInfo?.specialized.length! > 0 && (
                    <TableSpecialized
                        specialized={
                            departmentInfo?.specialized as Specialized[]
                        }
                    />
                )}
            </div>
            <div className="mt-16">
                {departmentInfo?.specialized.length! > 0 && (
                    <TableInstructor
                        instructor={departmentInfo?.Instructor as Instructor[]}
                    />
                )}
            </div>
        </div>
    );
}
const TableSpecialized = ({ specialized }: { specialized: Specialized[] }) => {
    const columnDefs: ColDef[] = [
        {
            field: "id",
            headerName: "Mã chuyên ngành",
            floatingFilter: true,
        },

        {
            field: "name",
            headerName: "Tên chuyên ngành",
            floatingFilter: true,
        },
        {
            field: "description",
            headerName: "Mô tả",
        },
    ];
    const { theme } = useAppContext();
    return (
        <div>
            <h2 className="font-bold text-2xl">
                Danh sách chuyên ngành của khoa
            </h2>
            <div
                className={`${
                    theme === "dark"
                        ? "ag-theme-alpine-dark"
                        : "ag-theme-material"
                }  w-full h-96 mt-8`}
            >
                <div className="h-full">
                    <AgGridReact
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
                        rowData={specialized}
                        columnDefs={columnDefs}
                    />
                </div>
            </div>
        </div>
    );
};
const TableInstructor = ({ instructor }: { instructor: Instructor[] }) => {
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
                    <div className="flex gap-2 items-center h-full">
                        <img
                            src={params.value}
                            alt="avatar"
                            className="h-24 w-24 object-cover"
                        />
                    </div>
                );
            },
        },

        {
            field: "fullname",
            headerName: "Tên giảng viên",
            floatingFilter: true,
        },
        {
            field: "id",
            headerName: "Hành động",
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
                    </div>
                );
            },
        },
    ];
    const { theme } = useAppContext();
    return (
        <div>
            <h2 className="font-bold text-2xl">
                Danh sách giảng viên của khoa
            </h2>
            <div
                className={`${
                    theme === "dark"
                        ? "ag-theme-alpine-dark"
                        : "ag-theme-material"
                }  w-full h-96 mt-8`}
            >
                <div className="h-full">
                    <AgGridReact
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
                        rowData={instructor}
                        columnDefs={columnDefs}
                        gridOptions={{
                            rowHeight: 100,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
const TableClass = ({ classes }: { classes: Classes[] }) => {
    const columnDefs: ColDef[] = [
        {
            field: "id",
            headerName: "Mã lớp",
            floatingFilter: true,
        },

        {
            field: "name",
            headerName: "Tên lớp",
            floatingFilter: true,
        },
        {
            field: "description",
            headerName: "Mô tả",
        },
        {
            field: "id",
            headerName: "Hành động",
            floatingFilter: false,
            cellRenderer: (params: any) => {
                return (
                    <div className="flex gap-2 items-center h-full">
                        <Link
                            href={`/classes/${params.value}`}
                            className="btn btn-link btn-xs"
                        >
                            <Eye color="oklch(var(--su))" />
                        </Link>
                    </div>
                );
            },
        },
    ];
    const { theme } = useAppContext();
    return (
        <div>
            <h2 className="font-bold text-2xl">Danh sách lớp của khoa</h2>
            <div
                className={`${
                    theme === "dark"
                        ? "ag-theme-alpine-dark"
                        : "ag-theme-material"
                }  w-full h-96 mt-8`}
            >
                <div className="h-full">
                    <AgGridReact
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
                        rowData={classes}
                        columnDefs={columnDefs}
                    />
                </div>
            </div>
        </div>
    );
};
export default Page;
