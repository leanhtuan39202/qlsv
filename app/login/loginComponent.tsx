"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/public/image/vnualogo.png";
import toast from "react-hot-toast";
function LoginComponent() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const signInHanle = async () => {
        const res = await signIn("credentials", {
            redirect: false,
            username: userName,
            password: password,
        });
        if (res?.error) {
            throw res.error;
        }
    };
    const handleLogin = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        toast.promise(signInHanle(), {
            loading: "Đang đăng nhập...",
            success: (value) => {
                console.log(value);
                setTimeout(() => {
                    router.replace("/");
                }, 500);
                return "Đăng nhập thành công";
            },
            error: () => {
                return "Đăng nhập thất bại, sai tên tài khoản hoặc mật khẩu";
            },
        });
    };
    return (
        <div
            data-theme="cupcake"
            className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-tr from-secondary to-primary"
        >
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Image className="mx-auto h-32 w-auto" src={Logo} alt="logo" />
                <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight ">
                    Hệ thống quản lý sinh viên
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium leading-6"
                        >
                            Tên người dùng
                        </label>
                        <div className="mt-2">
                            <input
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                name="username"
                                type="text"
                                autoComplete="email"
                                className="input input-bordered w-full input-lg"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6"
                            >
                                Mật khẩu
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                className="input input-bordered w-full input-lg form-control"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={handleLogin}
                            className="btn btn-primary btn-block btn-lg"
                        >
                            Đăng nhập
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginComponent;
