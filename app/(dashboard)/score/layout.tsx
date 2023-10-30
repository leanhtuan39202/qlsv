import Link from "next/link";
import React from "react";

function SpecializedLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full min-h-screen flex flex-col p-4">
            <div className="text-md breadcrumbs">
                <ul>
                    <li>
                        <Link href={"/"}>Trang chủ</Link>
                    </li>
                    <li>
                        <Link href={"/score/"}>Quản lý điểm</Link>
                    </li>
                </ul>
            </div>
            {children}
        </div>
    );
}

export default SpecializedLayout;
