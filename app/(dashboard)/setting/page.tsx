"use client";
import React, { useContext } from "react";
import { AppContext } from "@/app/(provider)/appProvider";
import Chart from "react-apexcharts";
import Link from "next/link";

function Page() {
    const themeList = [
        {
            name: "Cmyk",
            value: "cmyk",
        },
        {
            name: "Cupcake",
            value: "cupcake",
        },
        {
            name: "VNUA",
            value: "lemonade",
        },
        {
            name: "Nord",
            value: "nord",
        },
        {
            name: "Dark",
            value: "sunset",
        },
    ];
    const chartStyles = [
        "palette1",
        "palette2",
        "palette3",
        "palette4",
        "palette5",
        "palette6",
        "palette7",
        "palette8",
        "palette9",
        "palette10",
    ];
    const { theme, changeTheme, chartTheme, changeChartTheme } =
        useContext(AppContext);
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
                        <div className="flex flex-col md:flex-col gap-4">
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
                                        className="radio radio-primary  hover:bg-primary"
                                        checked={theme === item.value}
                                    />
                                    <p className="text-secondary">
                                        {item.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4 w-full mt-6">
                <div className="collapse bg-base-200 collapse-arrow shadow-md">
                    <input type="checkbox" />
                    <div className="collapse-title">
                        <p className="text-xl font-bold">Biểu đồ</p>
                        <p className="mt-2">Tuỳ chình giao diện Biểu đồ</p>
                    </div>
                    <div className="collapse-content">
                        <div className="flex flex-col md:flex-row gap-4">
                            <select
                                onChange={(e) => {
                                    changeChartTheme(e.target.value);
                                }}
                                className="select select-primary select-bordered"
                                defaultValue={chartTheme}
                            >
                                {chartStyles.map((item, index) => (
                                    <option
                                        key={index}
                                        selected={item === chartTheme}
                                        value={item}
                                    >
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full mt-4">
                            <Chart
                                width={200}
                                height={200}
                                type="bar"
                                options={{
                                    title: {
                                        text: "Chart",
                                        align: "left",
                                        style: {
                                            fontSize: "16px",
                                            fontFamily: "inherit",
                                            color: "oklch(var(--bc))",
                                        },
                                    },
                                    yaxis: {
                                        labels: {
                                            style: {
                                                fontSize: "16px",
                                                fontFamily: "inherit",
                                                colors: [
                                                    "oklch(var(--bc))",
                                                    "oklch(var(--bc))",
                                                ],
                                            },
                                        },
                                    },
                                    theme: {
                                        palette: chartTheme,
                                    },
                                    xaxis: {
                                        categories: ["a", "b"],
                                        labels: {
                                            style: {
                                                fontSize: "16px",
                                                fontFamily: "inherit",
                                                colors: [
                                                    "oklch(var(--bc))",
                                                    "oklch(var(--bc))",
                                                ],
                                            },
                                        },
                                    },
                                    dataLabels: {
                                        style: {
                                            fontSize: "16px",
                                            fontFamily: "inherit",
                                            colors: ["oklch(var(--bc))"],
                                        },
                                    },
                                }}
                                series={[
                                    {
                                        name: "value",
                                        data: [1, 2],
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4 w-full mt-6">
                <Link href="/setting/password" className="btn btn-primary ">
                    Đổi mật khẩu
                </Link>
            </div>
        </div>
    );
}

export default Page;
