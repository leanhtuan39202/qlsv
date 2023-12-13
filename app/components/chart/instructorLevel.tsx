"use client";
import { AppContext } from "@/app/(provider)/appProvider";
import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { getAllIntructor } from "@/app/(dashboard)/lib/prisma/instructor";

function InstructorLevel() {
    const [chartData, setChartData] = useState<number[]>([]);
    const { chartTheme } = useContext(AppContext);
    useEffect(() => {
        (async () => {
            const allInstructor = await getAllIntructor();
            const gs = allInstructor.filter(
                (s) => s!.level === "Giáo sư"
            ).length;
            const psg = allInstructor.filter(
                (s) => s!.level == "Phó giáo sư"
            ).length;
            const tiensi = allInstructor.filter(
                (s) => s!.level == "Tiến sĩ"
            ).length;
            const thacsi = allInstructor.filter(
                (s) => s!.level == "Thạc sĩ"
            ).length;
            setChartData([gs, psg, tiensi, thacsi]);
        })();
    }, []);

    return (
        <div className="w-96 xl:w-[30%] bg-base-200 p-4 mt-6 rounded-md shadow-xl">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-lg">Thống kê giảng viên</h1>
            </div>
            <div className="divider"></div>
            <div className="flex justify-center items-center h-96 w-full">
                {chartTheme.length > 0 ? (
                    <div>
                        <Chart
                            width={384}
                            type="bar"
                            options={{
                                title: {
                                    text: "Trình độ",
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
                                    categories: [
                                        "Giáo sư",
                                        "Phó giáo sư",
                                        "Tiến sĩ",
                                        "Thạc sĩ",
                                    ],
                                    labels: {
                                        style: {
                                            fontSize: "12px",
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
                                    name: "Số lượng",
                                    data: chartData,
                                },
                            ]}
                        />
                    </div>
                ) : (
                    <div>
                        <h1 className="text-2xl font-bold">Chưa có dữ liệu</h1>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InstructorLevel;
