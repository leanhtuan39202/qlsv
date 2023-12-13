"use client";
import React, { createContext, useState, useEffect } from "react";

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
    const [theme, setTheme] = useState<string | null>(null);

    const [chartTheme, setChartTheme] = useState<string>("palette1");

    useEffect(() => {
        const currentTheme = localStorage.getItem("theme_id");
        const currentChartTheme = localStorage.getItem("chartTheme");
        if (currentTheme) {
            setTheme(currentTheme as string);
            document.documentElement?.setAttribute("data-theme", currentTheme);
        } else {
            setTheme("lemonade");
            document.documentElement?.setAttribute("data-theme", "lemonade");
        }
        if (currentChartTheme) {
            setChartTheme(currentChartTheme);
        } else {
            setChartTheme("palette1");
        }
    }, []);

    const changeTheme = (theme: string) => {
        setTheme(theme);
        document.documentElement?.setAttribute("data-theme", theme);
        localStorage.setItem("theme_id", theme);
    };
    const changeChartTheme = (theme: string) => {
        setChartTheme(theme);
        localStorage.setItem("chartTheme", theme);
    };
    return (
        <AppContext.Provider
            value={{ theme, changeTheme, chartTheme, changeChartTheme }}
        >
            {children}
        </AppContext.Provider>
    );
}
const useAppContext = () => {
    return React.useContext(AppContext);
};

export { useAppContext };

export default AppProvider;
