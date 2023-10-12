"use client";
import React, { useState, useEffect } from "react";
import { getAllDepartments, deleteDepartment } from "../lib/prisma/department";
import { Department, Specialized } from "@prisma/client";
import toast from "react-hot-toast";
import Link from "next/link";
import { AlertTriangle, FileSignature, PlusCircle, Trash2 } from "lucide-react";
import { deleteSpecialized, getAllSpecialized } from "../lib/prisma/spec";

function Page() {
    const [spec, setSpec] = useState<
        ({
            department: Department | null;
        } & Specialized)[]
    >([]);
    const [search, setSearch] = useState("");
    const [selectedSpecialized, setSelectedSpecialized] = useState<
        string | null
    >(null);
    useEffect(() => {
        (async () => {
            const allSpec = await getAllSpecialized();
            setSpec(allSpec);
        })();
    }, []);

    const handleDelete = async () => {
        toast.promise(deleteSpecialized(selectedSpecialized as string), {
            loading: "Đang xoá...",
            success: "Xoá thành công",
            error: "Xoá thất bại",
        });
        setSpec(spec.filter((d) => d.id !== selectedSpecialized));
        setSelectedSpecialized(null);
        modalRef.current?.close();
    };
    const handleSearch = async () => {
        // const allDepartment = await getAllDepartments(search);
        // setDepartment(allDepartment);
    };
    const modalRef = React.useRef<any>(null);
    return (
        <div className="min-h-screen w-full p-6">
            <div className="bg-base-100">
                <Link href={"/spec/add"} className="btn btn-primary">
                    <PlusCircle />
                    Thêm mới
                </Link>
                <div className="my-8 flex ">
                    <span className="font-bold text-2xl">
                        Danh sách tất cả các chuyên ngành
                    </span>

                    <div className="ml-auto flex gap-2">
                        <input
                            type="text"
                            className="input input-bordered "
                            placeholder="Nhập tên khoa cần tìm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button
                            className="btn btn-primary"
                            onClick={handleSearch}
                        >
                            Tìm kiếm
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="table table-lg">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Mã</th>
                                <th>Tên chuyên ngành</th>
                                <th>Tên khoa</th>
                                <th>Mô tả</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {spec.map((spec, index) => (
                                <tr key={spec.id} className="hover">
                                    <td>{index + 1} </td>
                                    <th>{spec.id}</th>
                                    <td>{spec.name}</td>
                                    <td>{spec.department?.name}</td>
                                    <td>{spec.description}</td>
                                    <td className="flex gap-2">
                                        <Link
                                            href={`/spec/edit/${spec.id}`}
                                            className="btn btn-warning btn-outline btn-sm"
                                        >
                                            <FileSignature />
                                            Sửa
                                        </Link>
                                        <button
                                            className="btn btn-error btn-outline btn-sm"
                                            onClick={() => {
                                                setSelectedSpecialized(spec.id);
                                                modalRef.current?.showModal();
                                            }}
                                        >
                                            <Trash2 />
                                            Xoá
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
