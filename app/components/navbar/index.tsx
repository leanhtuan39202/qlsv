import Link from "next/link";
import React from "react";

function Navbar() {
    return (
        <div className="navbar bg-secondary backdrop-blur-sm sticky top-0 bg-opacity-90 z-10 transition-all duration-100 shadow-lg">
            <div className="flex-1">
                <label
                    htmlFor="my-drawer"
                    className="lg:hidden p-4 btn btn-ghost text-secondary-content"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-5 h-5 stroke-current"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </label>
                <Link
                    href={"/"}
                    className="normal-case text-xs md:text-xl ml-1 transition-all duration-1000 translate-x-0 text-secondary-content font-mono text-ellipsis"
                >
                    {"Trang chủ"}
                </Link>
            </div>
            <div className="flex-none gap-2">
                <div className="dropdown dropdown-end">
                    <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <img
                            className="avatar rounded-full"
                            src="https://media1.nguoiduatin.vn/dbvn/images/uploads/2022/11/17/the-thao/messi-khoc.jpg"
                            alt=""
                        />
                    </label>
                    <ul
                        tabIndex={0}
                        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li>
                            <Link href={"/setting"}>Settings</Link>
                        </li>
                        <li>
                            <a>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
