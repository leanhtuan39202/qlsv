"use client";
import { AppContext } from "@/app/(provider)/appProvider";
import { getAllStudents } from "@/app/(dashboard)/lib/prisma/student";
import { Student, Gender } from "@prisma/client";
import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
function GenderChart() {
    const [student, setStudent] = useState<Student[]>([] as Student[]);
    const [chartData, setChartData] = useState<number[]>([]);
    const { chartTheme } = useContext(AppContext);

    useEffect(() => {
        (async () => {
            const allStudent = await getAllStudents();
            setStudent(allStudent);
            const male = allStudent.filter(
                (s) => s.gender == Gender.MALE
            ).length;
            const female = allStudent.filter(
                (s) => s.gender == Gender.FEMALE
            ).length;

            setChartData([male, female]);
        })();
    }, []);

    return (
        <div className="w-96 bg-base-200 p-4 mt-6 rounded-md shadow-xl">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-lg">Thống kê sinh viên</h1>
            </div>
            <div className="divider"></div>
            <div className="flex justify-center items-center h-96 w-full">
                {student.length > 0 ? (
                    <div>
                        <Chart
                            width={384}
                            type="bar"
                            options={{
                                title: {
                                    text: "Giới tính",
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
                                            fontSize: "16px",
                                            fontFamily: "inherit",
                                            colors: [
                                                "hsl(var(--bc))",
                                                "hsl(var(--bc))",
                                            ],
                                        },
                                    },
                                },
                                theme: {
                                    palette: chartTheme,
                                },
                                xaxis: {
                                    categories: ["Nam", "Nữ"],
                                    labels: {
                                        style: {
                                            fontSize: "16px",
                                            fontFamily: "inherit",
                                            colors: [
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

export default GenderChart;
