"use client";
import { User } from "@prisma/client";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import React, { useState } from "react";
import { resetPassword } from "../../lib/prisma/user";
import toast from "react-hot-toast";

interface Props {
    data: User[];
}
function AccountTable({ data }: Props) {
    const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

    const [columnDefs] = useState<ColDef<User>[]>([
        { field: "username", headerName: "Tài khoản" },
        {
            field: "password",
            headerName: "Mật khẩu",
            filter: "text",
            floatingFilter: false,
        },
        {
            field: "role",
            headerName: "Vai trò",
            floatingFilter: false,
        },

        {
            field: "username",
            headerName: "Hành động",
            floatingFilter: false,
            cellRenderer: (params: any) => {
                return (
                    <div className="flex gap-2 h-full items-center">
                        <button
                            onClick={() => {
                                setSelectedAccount(params.value);
                                modalRef?.current?.showModal();
                            }}
                            className="btn btn-link btn-xs"
                        >
                            <RotateCcw color="oklch(var(--p))" />
                        </button>
                    </div>
                );
            },
        },
    ]);
    const handleClick = () => {
        resetPassword(selectedAccount as string);
        modalRef?.current?.close();
        toast.success("Đặt lại mật khẩu thành công");
    };
    const modalRef = React.useRef<HTMLDialogElement>(null);
    return (
        <div className="w-full h-screen p-6">
            <div className="ag-theme-material w-full h-full">
                <div className="h-2/3">
                    <AgGridReact<User>
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
                        rowData={data}
                        columnDefs={columnDefs}
                    />
                </div>
            </div>
            <dialog id="my_modal_1" className="modal" ref={modalRef}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg flex flex-row gap-2">
                        <AlertTriangle color="orange" />
                        Cảnh báo!
                    </h3>
                    <p className="py-4">
                        Bạn có muốn reset mật khẩu không? Sau khi reset mật khẩu
                        sẽ về mặc định 1111
                    </p>
                    <div className="modal-action">
                        <button
                            className="btn btn-primary"
                            onClick={handleClick}
                        >
                            Reset
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

export default AccountTable;
