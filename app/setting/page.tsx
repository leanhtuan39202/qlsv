"use client";
import React, { useContext } from "react";
import { AppContext } from "../(provider)/appProvider";

function page() {
    const themeList = [
        {
            name: "aqua",
            value: "aqua",
        },
        {
            name: "Dark",
            value: "dark",
        },
        {
            name: "Cmyk",
            value: "cmyk",
        },
        {
            name: "Autumn",
            value: "autumn",
        },
        {
            name: "Winter",
            value: "winter",
        },
        {
            name: "Cupcake",
            value: "cupcake",
        },
        {
            name: "emerald",
            value: "emerald",
        },
    ];
    const { theme, changeTheme } = useContext(AppContext);
    const handleChangeTheme = (theme: string) => {
        changeTheme(theme);
    };
    return (
        <div className="w-full min-h-screen p-6">
            <h1 className="text-3xl">Cài đặt</h1>
            <div className="space-y-4 w-full mt-6">
                <div className="collapse bg-base-200 collapse-arrow shadow-md">
                    <input type="checkbox" />
                    <div className="collapse-title">
                        <p className="text-xl font-bold">Giao diện</p>
                        <p className="mt-2">Tuỳ chình giao diện cho ứng dụng</p>
                    </div>
                    <div className="collapse-content">
                        <div className="flex flex-col md:flex-row gap-4">
                            {themeList.map((item, index) => (
                                <div
                                    key={index}
                                    data-theme={item.value}
                                    className="flex gap-2 bg-transparent"
                                >
                                    <input
                                        onChange={() =>
                                            handleChangeTheme(item.value)
                                        }
                                        type="radio"
                                        name="radio-1"
                                        className="radio radio-primary md:tooltip hover:bg-primary"
                                        data-tip={item.name}
                                        checked={theme === item.value}
                                    />
                                    <p className={"block md:hidden"}>
                                        {item.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default page;
