"use client";
import React from "react";
import Navbar from "../navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface Props {
    children: React.ReactNode;
}
const menu = [
    {
        label: "Trang chủ",
        href: "/",
    },
    {
        label: "Quản lý khoa",
        href: "/department",
    },
    {
        label: "Quản lý chuyên ngành",
        href: "/spec",
    },
    {
        label: "Quản lý sinh viên",
        href: "/student",
    },
    {
        label: "Quản lý giảng viên",
        href: "/instructor",
    },
    {
        label: "Quản lý môn học",
        href: "/subject",
    },
    {
        label: "Quản lý học phần",
        href: "/term    ",
    },
    {
        label: "Quản lý điểm",
        href: "/score",
    },
    {
        label: "Quản lý lớp học",
        href: "/classes",
    },
    {
        label: "Quản lý niên khoá",
        href: "/schoolyear",
    },
];
const Drawer: React.FC<Props> = ({ children }) => {
    const pathName = usePathname();

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                <Navbar />
                {children}
            </div>
            <div className="drawer-side z-50">
                <label
                    htmlFor="my-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <div className="hidden lg:flex h-16 p-4 items-center bg-base-300 sticky top-0 z-10">
                    <Link
                        href={"/"}
                        className="flex items-center text-lg uppercase font-bold"
                    >
                        <div className="ml-4">
                            <span className="text-primary">Quản lý</span>{" "}
                            <span className="text-base-content">sinh viên</span>
                        </div>
                    </Link>
                </div>
                <ul className="menu p-4 w-80 min-h-full bg-base-300 text-base-content menu-lg space-y-4">
                    {menu.map((item) => (
                        <li key={item.label}>
                            <Link
                                className={
                                    pathName === item.href ? "active" : ""
                                }
                                href={item.href}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Drawer;
