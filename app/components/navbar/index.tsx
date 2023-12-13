"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { getUserbyUsername } from "@/app/(dashboard)/lib/prisma/user";
import Image from "next/image";
function Navbar() {
    const [user, setUser] = React.useState<any>({});

    const { data: session } = useSession();

    useEffect(() => {
        (async () => {
            if (!session) {
                return;
            } else {
                const getUser = await getUserbyUsername(
                    session?.user?.name as string
                );
                setUser(getUser);
            }
        })();
    }, [session]);
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
            <div
                className={`${
                    user?.role === "ADMIN" ? "flex-none gap-2" : "hidden"
                }`}
            >
                <div className="dropdown dropdown-end">
                    <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <Image
                            alt="logo"
                            priority
                            width={64}
                            height={64}
                            className="object-contain"
                            src={require("../../../public/image/vnualogo.png")}
                        />
                    </label>
                    <ul
                        tabIndex={0}
                        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <Link href={"/setting"}>Settings</Link>
                        </li>
                        <li onClick={() => signOut()}>
                            <span>Logout</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
