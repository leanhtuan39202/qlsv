"use client";
import Link from "next/link";
import React from "react";

function Tab() {
    const [activeTab, setActiveTab] = React.useState(0);

    return (
        <div role="tablist" className="tabs tabs-bordered w-96">
            <Link
                onClick={() => setActiveTab(0)}
                href={`/users`}
                className={`tab ${activeTab === 0 && "tab-active"}`}
            >
                Sinh viên
            </Link>
            <Link
                onClick={() => setActiveTab(1)}
                className={`tab ${activeTab === 1 && "tab-active"}`}
                href={`/users/instructor`}
            >
                Giảng viên
            </Link>
        </div>
    );
}

export default Tab;
