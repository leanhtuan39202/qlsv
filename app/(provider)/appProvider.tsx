"use client";
import React, { createContext, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
interface IAppContext {
    theme: string | null;
    changeTheme: (theme: string) => void;
    chartTheme: string;
    changeChartTheme: (theme: string) => void;
}
interface IProps {
    children: React.ReactNode;
}
export const AppContext = createContext<IAppContext>({} as IAppContext);
function AppProvider({ children }: IProps) {
    const [loading, setLoading] = useState(false);

    const [theme, setTheme] = useState<string | null>(null);

    const [isFistRender, setIsFistRender] = useState(true);

    const [chartTheme, setChartTheme] = useState<string>("palette1");

    useEffect(() => {
        const currentTheme = localStorage.getItem("theme");
        const currentChartTheme = localStorage.getItem("chartTheme");
        if (currentTheme) {
            setTheme(currentTheme as string);
            document.documentElement?.setAttribute("data-theme", currentTheme);
        } else {
            setTheme("cupcake");
            document.documentElement?.setAttribute("data-theme", "cmyk");
        }
        if (currentChartTheme) {
            setChartTheme(currentChartTheme);
        } else {
            setChartTheme("palette1");
        }

        setTimeout(() => setLoading(false), 1500);
        setIsFistRender(false);
    }, []);

    const changeTheme = (theme: string) => {
        setTheme(theme);
        document.documentElement?.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    };
    const changeChartTheme = (theme: string) => {
        setChartTheme(theme);
        localStorage.setItem("chartTheme", theme);
    };
    return (
        <AppContext.Provider
            value={{ theme, changeTheme, chartTheme, changeChartTheme }}
        >
            {loading && isFistRender ? (
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
const useAppContext = () => {
    return React.useContext(AppContext);
};

export { useAppContext };

export default AppProvider;
