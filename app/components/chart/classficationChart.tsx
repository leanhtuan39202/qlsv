"use client";
import { AppContext } from "@/app/(provider)/appProvider";
import { getAllStudents } from "@/app/(dashboard)/lib/prisma/student";
import React, { useEffect, useState, useContext } from "react";
import Chart from "react-apexcharts";

function ClassficationChart() {
    const [chartData, setChartData] = useState<number[]>([]);

    useEffect(() => {
        (async () => {
            const allStudent = await getAllStudents();
            const xuatSac = allStudent.filter(
                (s) => s!.StudentInfo!.gpa4 >= 3.6
            ).length;
            const gioi = allStudent.filter(
                (s) => s!.StudentInfo!.gpa4 >= 3.2 && s!.StudentInfo!.gpa4 < 3.6
            ).length;
            const kha = allStudent.filter(
                (s) => s!.StudentInfo!.gpa4 >= 2.5 && s!.StudentInfo!.gpa4 < 3.2
            ).length;
            const tb = allStudent.filter(
                (s) => s!.StudentInfo!.gpa4 >= 2.0 && s!.StudentInfo!.gpa4 < 2.5
            ).length;
            const yeu = allStudent.filter(
                (s) => s!.StudentInfo!.gpa4 >= 1.0 && s!.StudentInfo!.gpa4 < 2.0
            ).length;

            setChartData([xuatSac, gioi, kha, tb, yeu]);
        })();
    }, []);
    const { chartTheme } = useContext(AppContext);
    return (
        <div className="w-96 xl:w-[30%] bg-base-200 p-4 mt-6 rounded-md shadow-xl">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-lg">Kết quả học tập</h1>
            </div>
            <div className="divider" />
            <div className="flex justify-center items-center h-96 w-full">
                {chartData.length > 0 ? (
                    <div>
                        <Chart
                            width={384}
                            type="bar"
                            options={{
                                theme: {
                                    palette: chartTheme,
                                },
                                title: {
                                    text: "Xếp loại",
                                    align: "left",
                                    style: {
                                        fontSize: "16px",
                                        fontFamily: "inherit",
                                        color: "hsl(var(--bc))",
                                    },
                                },
                                yaxis: {
                                    labels: {
                                        style: {
                                            fontFamily: "inherit",
                                            fontSize: "10px",
                                            colors: [
                                                "hsl(var(--bc))",
                                                "hsl(var(--bc))",
                                                "hsl(var(--bc))",
                                                "hsl(var(--bc))",
                                                "hsl(var(--bc))",
                                            ],
                                        },
                                    },
                                },
                                xaxis: {
                                    categories: [
                                        "Xuất sắc",
                                        "Giỏi",
                                        "Khá",
                                        "Trung bình",
                                        "Yếu",
                                    ],
                                    labels: {
                                        style: {
                                            fontFamily: "inherit",
                                            fontSize: "10px",
                                            colors: [
                                                "hsl(var(--bc))",
                                                "hsl(var(--bc))",
                                                "hsl(var(--bc))",
                                                "hsl(var(--bc))",
                                                "hsl(var(--bc))",
                                            ],
                                        },
                                    },
                                },
                                dataLabels: {
                                    style: {
                                        fontSize: "16px",
                                        fontFamily: "inherit",
                                        colors: ["hsl(var(--bc))"],
                                    },
                                },
                            }}
                            series={[
                                {
                                    data: chartData,
                                    name: "số lượng",
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

export default ClassficationChart;
