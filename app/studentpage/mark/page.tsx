import { getScoreByStudentId } from "@/app/(dashboard)/lib/prisma/score";
import { authOption } from "@/app/api/auth/[...nextauth]/option";
import { classifyStudent, enumToGradeString } from "@/utils/caculateScore";
import { ScoreStatus } from "@prisma/client";
import { getServerSession } from "next-auth";
import React from "react";

async function Page() {
    const session = (await getServerSession(authOption as any)) as any;
    const allScore = await getScoreByStudentId(session?.user?.name as string);

    const score10 = (
        allScore.reduce((a, b) => a + b.term.subject.credit * b.Total10!, 0) /
        allScore?.reduce((a, b) => a + b.term.subject.credit, 0)
    ).toFixed(2);

    const score4 = (
        allScore.reduce((a, b) => a + b.term.subject.credit * b.Total4!, 0) /
        allScore?.reduce((a, b) => a + b.term.subject.credit, 0)
    ).toFixed(2);

    const totalCredit = allScore?.reduce(
        (a, b) => a + b.term.subject.credit,
        0
    );

    const passCredit = allScore
        ?.filter((s) => s.status === ScoreStatus.PASSED)
        .reduce((a, b) => a + b.term.subject.credit, 0);

    const failCredit = allScore
        ?.filter((s) => s.status === ScoreStatus.FAILED)
        .reduce((a, b) => a + b.term.subject.credit, 0);
    return (
        <div className="flex flex-col  w-full min-h-screen relative">
            <h1 className="text-2xl font-bold p-6">Kết quả học tập</h1>
            <div className="overflow-x-auto">
                <table className="table table-lg mt-8">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã lớp học phần</th>
                            <th>Tên môn học</th>
                            <th>Tín chỉ</th>
                            <th>chuyên cần</th>
                            <th>Giữa kì</th>
                            <th>Cuối kì</th>
                            <th>Điểm tổng kết</th>
                            <th>Thang điểm 4</th>
                            <th>Điểm chữ</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allScore?.map((score, index) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{score.term.id}</td>
                                <td>{score.term.name}</td>
                                <td>{score.term.subject.credit}</td>
                                <td>{score.CC}</td>
                                <td>{score.Midterm}</td>
                                <td>{score.Final}</td>
                                <td>{score.Total10}</td>
                                <td>{score.Total4}</td>
                                <td>
                                    {enumToGradeString(score.ScoreText as any)}
                                </td>
                                <td>
                                    {score.status === ScoreStatus.PASSED
                                        ? "Đạt"
                                        : "Không đạt"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="bg-base-200 p-4 h-32 absolute bottom-20 rounded-md w-full flex flex-row gap-40">
                <div className="space-y-4">
                    <p>Số tín chỉ đã đăng kí: {totalCredit}</p>
                    <p>Số tín chỉ đạt: {passCredit}</p>
                    <p>Số tín chỉ nợ: {failCredit}</p>
                </div>
                <div className="space-y-4">
                    <p>Điểm hệ 10: {score10}</p>
                    <p>Điểm hệ 4: {score4} </p>
                    <p>
                        Xếp loại học tập:{" "}
                        {classifyStudent(
                            +(
                                allScore.reduce(
                                    (a, b) =>
                                        a + b.term.subject.credit * b.Total4!,
                                    0
                                ) /
                                allScore?.reduce(
                                    (a, b) => a + b.term.subject.credit,
                                    0
                                )
                            ).toFixed(1)
                        )}{" "}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Page;
