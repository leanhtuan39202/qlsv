"use client";
import React, { createContext, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
interface IAppContext {
    theme: string | null;
    changeTheme: (theme: string) => void;
}
interface IProps {
    children: React.ReactNode;
}
export const AppContext = createContext<IAppContext>({} as IAppContext);
function AppProvider({ children }: IProps) {
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState<string | null>(null);

    useEffect(() => {
        const currentTheme = localStorage.getItem("theme");
        if (currentTheme) {
            setTheme(currentTheme as string);
            document.documentElement?.setAttribute("data-theme", currentTheme);
        } else {
            setTheme("cmyk");
            document.documentElement?.setAttribute("data-theme", "cmyk");
        }
        setTimeout(() => setLoading(false), 1500);
    }, [setTheme]);

    const changeTheme = (theme: string) => {
        setTheme(theme);
        document.documentElement?.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    };
    return (
        <AppContext.Provider value={{ theme, changeTheme }}>
            {loading ? (
                <motion.div
                    data-theme="cupcake"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 2 }}
                    className="h-screen w-full flex justify-center items-center flex-col bg-base-300"
                >
                    <div className="flex flex-col gap-4 items-center">
                        <Image
                            src={require("../../public/image/sinhvien.png")}
                            alt="logo"
                            width={64}
                            height={64}
                            className="h-20 w-20 object-cover"
                        />
                        <span className="text-base-content font-bold text-4xl">
                            Hệ thống quản lý sinh viên
                        </span>
                    </div>
                    <span className="loading loading-spinner text-primary loading-lg"></span>
                </motion.div>
            ) : (
                children
            )}
        </AppContext.Provider>
    );
}

export default AppProvider;
