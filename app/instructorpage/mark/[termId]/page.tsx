"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ScoreStatus } from "@prisma/client";
import { enumToGradeString } from "@/utils/caculateScore";
import {
    editScore,
    getScoreByTermId,
} from "@/app/(dashboard)/lib/prisma/score";
import { getTermById } from "@/app/(dashboard)/lib/prisma/term";
import Link from "next/link";
interface Props {
    params: {
        termId: string;
    };
}
function Page({ params }: Props) {
    const { termId } = params;

    const [isEditing, setIsEditing] = useState(false);

    const [score, setScore] = useState([] as any);

    const [term, setTerm] = useState({} as any);

    useEffect(() => {
        (async () => {
            const allScore = await getScoreByTermId(termId);
            setScore([...allScore]);
        })();
    }, [isEditing === false]);

    useEffect(() => {
        (async () => {
            const currentTerm = await getTermById(termId);
            setTerm(currentTerm as any);
        })();
    }, []);

    const save = async () => {
        const promise = [];
        for (let i = 0; i < score[0].Score.length; i++) {
            promise.push(
                editScore(score[0].Score[i].id, {
                    CC: Number(score[0].Score[i].CC),
                    Final: Number(score[0].Score[i].Final),
                    Midterm: Number(score[0].Score[i].Midterm),
                })
            );
        }
        toast.promise(Promise.all(promise), {
            loading: "Đang lưu...",
            success: () => {
                setIsEditing(false);
                return "Lưu thành công";
            },
            error: (error) => {
                return "Lưu thất bại, vui lòng thử lại" + error;
            },
        });
    };

    return (
        <div className="w-full min-h-screen p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Quản lý điểm</h1>

                <div className="flex gap-4">
                    <button
                        className="btn btn-primary"
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        {isEditing ? "Huỷ" : "Sửa"}
                    </button>
                    <button className="btn btn-secondary" onClick={save}>
                        Lưu
                    </button>
                    <Link
                        href={`/instructorpage/mark`}
                        className="btn btn-accent"
                    >
                        Quay lại
                    </Link>
                </div>
            </div>
            <div className="flex space-y-4 flex-col">
                <p>
                    Lớp học phần: {term.id} - {term?.name}
                </p>
                <p>Giảng viên: {term?.instructor?.fullname}</p>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-lg mt-8">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã sinh viên</th>
                            <th>Tên sinh viên</th>
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
                        {score?.[0]?.Score?.map((s: any, index: number) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{s.Student.id}</td>
                                <td>{s.Student.fullname}</td>
                                <td>
                                    <input
                                        onChange={(e) => {
                                            score[0].Score[index].CC =
                                                e.target.value;
                                            setScore([...score]);
                                        }}
                                        disabled={!isEditing}
                                        type="number"
                                        min={0}
                                        max={10}
                                        value={s.CC || 0}
                                        className="input input-xs w-20 input-bordered"
                                    />
                                </td>
                                <td>
                                    <input
                                        min={0}
                                        max={10}
                                        onChange={(e) => {
                                            score[0].Score[index].Midterm =
                                                e.target.value;
                                            setScore([...score]);
                                        }}
                                        disabled={!isEditing}
                                        type="number"
                                        value={s.Midterm || 0}
                                        className="input input-xs w-20 input-bordered"
                                    />
                                </td>
                                <td>
                                    <input
                                        min={0}
                                        max={10}
                                        onChange={(e) => {
                                            score[0].Score[index].Final =
                                                e.target.value;
                                            setScore([...score]);
                                        }}
                                        disabled={!isEditing}
                                        type="number"
                                        value={s.Final || 0}
                                        className="input input-xs w-20 input-bordered"
                                    />
                                </td>
                                <td>{s.Total10}</td>
                                <td>{s.Total4}</td>
                                <td>{enumToGradeString(s.ScoreText)}</td>
                                <td>
                                    {s.status === ScoreStatus.PASSED
                                        ? "Đạt"
                                        : "Không đạt"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Page;
