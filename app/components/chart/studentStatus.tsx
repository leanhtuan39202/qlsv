// "use client";
// import { AppContext } from "@/app/(provider)/appProvider";
// import { getAllStudents } from "@/app/(dashboard)/lib/prisma/student";
// import { StudentInfo, Status } from "@prisma/client";
// import React, { useContext, useEffect, useState } from "react";
// import Chart from "react-apexcharts";
// function StudentStatus() {
//     const [student, setStudent] = useState<StudentInfo[]>([] as StudentInfo[]);
//     const [chartData, setChartData] = useState<number[]>([]);
//     const { chartTheme } = useContext(AppContext);
//     useEffect(() => {
//         (async () => {
//             const allStudent = await getAllStudents();
//             setStudent(allStudent);
//             const stop = allStudent.filter(
//                 (s) => s.status == Status.STOP
//             ).length;
//             const studying = allStudent.filter(
//                 (s) => s.status == Status.STUDYING
//             ).length;
//             const reserve = allStudent.filter(
//                 (s) => s.status == Status.RESERVE
//             ).length;
//             setChartData([studying, reserve, stop]);
//         })();
//     }, []);

//     return (
//         <div className="w-96 bg-base-200 p-4 mt-6 rounded-md shadow-xl">
//             <div className="flex flex-row justify-between items-center">
//                 <h1 className="text-lg">Tình trạng học tập</h1>
//             </div>
//             <div className="divider"></div>
//             <div className="flex justify-center items-center h-96 w-full">
//                 {student.length > 0 ? (
//                     <div>
//                         <Chart
//                             width={384}
//                             type="pie"
//                             options={{
//                                 title: {
//                                     text: "Tình trạng học tập",
//                                     align: "left",
//                                     style: {
//                                         fontSize: "16px",
//                                         fontFamily: "inherit",
//                                         color: "hsl(var(--bc))",
//                                     },
//                                 },
//                                 legend: {
//                                     position: "bottom",
//                                     labels: {
//                                         colors: "hsl(var(--bc))",
//                                     },
//                                 },

//                                 labels: ["Đang học", "Bảo lưu", "Thôi học"],
//                                 dataLabels: {
//                                     style: {
//                                         fontSize: "16px",
//                                         fontFamily: "inherit",
//                                         colors: ["#fff"],
//                                     },
//                                 },
//                                 theme: {
//                                     palette: chartTheme,
//                                 },
//                             }}
//                             series={chartData}
//                         />
//                     </div>
//                 ) : (
//                     <div>
//                         <h1 className="text-2xl font-bold">Chưa có dữ liệu</h1>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default StudentStatus;
