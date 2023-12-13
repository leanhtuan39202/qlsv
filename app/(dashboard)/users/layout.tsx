import Link from "next/link";
import React from "react";
import Tab from "./components/tab";

interface Layout {
    children: React.ReactNode;
}
function UserLayout({ children }: Layout) {
    return (
        <div className="w-full min-h-screen flex flex-col p-4">
            <div className="text-md breadcrumbs">
                <ul>
                    <li>
                        <Link href={"/"}>Trang chủ</Link>
                    </li>
                    <li>
                        <Link href={"/users/"}>Quản lý tài khoản</Link>
                    </li>
                </ul>
            </div>
            <Tab />
            {children}
        </div>
    );
}

export default UserLayout;
