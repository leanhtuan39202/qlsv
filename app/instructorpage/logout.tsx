"use client";
import { LogOut } from "lucide-react";
import React from "react";
import { signOut } from "next-auth/react";
function Logout() {
    return (
        <div
            className="card w-96 bg-base-200 shadow-xl cursor-pointer"
            onClick={() => signOut()}
        >
            <figure className="px-10 pt-10">
                <LogOut size={48} color="oklch(var(--in))" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">Đăng xuất</h2>
            </div>
        </div>
    );
}

export default Logout;
