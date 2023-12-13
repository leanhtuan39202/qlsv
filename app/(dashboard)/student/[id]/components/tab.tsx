"use client";
import Link from "next/link";
import React from "react";

interface Props {
    params: {
        id: string;
    };
}
function Tab({ params }: Props) {
    const { id } = params;
    const [activeTab, setActiveTab] = React.useState(0);

    return (
        <div role="tablist" className="tabs tabs-bordered w-96">
            <Link
                onClick={() => setActiveTab(0)}
                href={`/student/${id}`}
                className={`tab   ${activeTab === 0 && "tab-active"}`}
            >
                Chung
            </Link>
            <Link
                onClick={() => setActiveTab(1)}
                className={`tab   ${activeTab === 1 && "tab-active"}`}
                href={`/student/${id}/mark`}
            >
                Xem điểm
            </Link>
        </div>
    );
}

export default Tab;
