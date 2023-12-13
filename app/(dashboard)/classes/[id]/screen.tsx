"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ColDef, GridApi, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Sheet } from "lucide-react";
import { ExcelExportModule } from "ag-grid-enterprise";
ModuleRegistry.registerModules([ExcelExportModule]);

interface Props {
    classes: any;
}
function ClassInfoScreen({ classes }: Props) {
    const [columnDefs] = useState<ColDef<any>[]>([
        { field: "id", headerName: "Mã sinh viên", filter: "text" },
        {
            field: "fullname",
            headerName: "Tên sinh viên",
            filter: "text",
        },
        {
            field: "address",
            headerName: "Địa chỉ",
            filter: "text",
        },
    ]);
    const gridApiRef = React.useRef<GridApi<any>>();

    const exportData = () => {
        gridApiRef?.current?.exportDataAsExcel({
            fileName: `${classes?.name}`,
        });
    };
    return (
        <div className="min-h-screen w-full p-6">
            <div className="my-8 flex justify-between">
                <span className="font-bold text-2xl">
                    Thông tin lớp {classes?.name}
                </span>
                <div>
                    <button
                        className="btn-outline btn btn-success"
                        onClick={() => exportData()}
                    >
                        <Sheet size={20} />
                        Export
                    </button>
                </div>
            </div>
            <div className="flex flex-row gap-40">
                <div className="flex flex-col gap-2">
                    <span>Mã lớp: {classes?.id}</span>
                    <span>Tên lớp: {classes?.name}</span>
                    <span>
                        Giáo viên chủ nhiệm:
                        <Link
                            className="btn btn-link btn-sm"
                            href={"/instructor/" + classes?.Instructor?.id}
                        >
                            {classes?.Instructor?.fullname}
                        </Link>
                    </span>
                </div>
                <div className="flex flex-col gap-2">
                    <span>Khoa: {classes?.department?.name}</span>
                    <span>Chuyên ngành: {classes?.specialized?.name}</span>
                    <span>Niên khoá: {classes?.schoolyear?.schoolyear}</span>
                    <span>Sĩ số: {classes?.Student.length}</span>
                </div>
            </div>
            <div>
                <div className="my-8 flex flex-col">
                    <span className="font-bold text-2xl">
                        Danh sách sinh viên
                    </span>
                    <div className={`w-full h-screen ag-theme-material`}>
                        <div className="h-2/3">
                            <AgGridReact<any>
                                onGridReady={(params) => {
                                    gridApiRef.current = params.api;
                                }}
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
                                rowData={classes?.Student}
                                columnDefs={columnDefs}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClassInfoScreen;
