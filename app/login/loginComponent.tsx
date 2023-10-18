"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
function LoginComponent() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const handleLogin = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const res = await signIn("credentials", {
                redirect: false,
                username: userName,
                password: password,
            });
            if (res?.ok) {
                router.replace("/");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="w-full min-h-screen bg-base-100">
            <h1>Login</h1>
            <form>
                <input
                    className="input input-bordered max-w-lg w-full"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input
                    type="password"
                    className="input input-bordered max-w-lg w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Đăng nhập</button>
            </form>
        </div>
    );
}

export default LoginComponent;
