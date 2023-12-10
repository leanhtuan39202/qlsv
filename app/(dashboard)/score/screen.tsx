"use client";
import React, { useState } from "react";

import { AgGridReact } from "ag-grid-react";

import Link from "next/link";
import { ColDef } from "ag-grid-community";
import { Eye } from "lucide-react";

interface Props {
    term: any;
}
function ScoreScreen({ term }: Props) {
    const [columnDefs] = useState<ColDef<any>[]>([
        { field: "id", headerName: "Mã lớp học phần", filter: "text" },
        { field: "subject.department.name", headerName: "Khoa" },
        { field: "name", headerName: "Tên lớp học phần", filter: "text" },
        {
            field: "instructor.fullname",
            headerName: "Giảng viên",
            floatingFilter: true,
            filter: "text",
        },
        {
            field: "subject.credit",
            headerName: "Số tín chỉ",
            floatingFilter: false,
        },
        {
            field: "Enrollment.length",
            headerName: "Sĩ số lớp",
            floatingFilter: false,
        },
        {
            field: "id",
            headerName: "Hành động",
            floatingFilter: false,
            cellRenderer: (params: any) => {
                return (
                    <div className="flex gap-2 h-full items-center">
                        <Link
                            href={`/score/${params.value}`}
                            className="btn btn-link btn-xs"
                        >
                            <Eye color="hsl(var(--su))" />
                        </Link>
                    </div>
                );
            },
        },
    ]);
    return (
        <div className="min-h-screen w-full p-6">
            <div className="bg-base-100">
                <div className="my-8 flex ">
                    <span className="font-bold text-2xl">Quản lý điểm</span>

                    <div className="ml-auto flex gap-2"></div>
                </div>
            </div>
            <div className={`ag-theme-material w-full h-screen`}>
                <div className="h-2/3">
                    <AgGridReact<any>
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
                        rowData={term}
                        columnDefs={columnDefs}
                    />
                </div>
            </div>
        </div>
    );
}

export default ScoreScreen;
