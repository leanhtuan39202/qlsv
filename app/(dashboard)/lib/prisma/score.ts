'use server'
import { ScoreStatus, ScoreText } from "@prisma/client";
import prisma from ".";
import { caculateScore10, caculateScore4, caculateScoreText } from "@/utils/caculateScore";

const getScoreByStudentId = async (studentId: string) => {
    const score = await prisma.score.findMany({
        where: {
            studentId,
        },
        include: {
            term: {
                include: {
                    subject: true
                }
            }

        }
    });
    return score;
}
const getScoreByTermId = async (termId: string) => {
    const score = await prisma.term.findMany({
        where: {
            id: termId,
        },
        include: {
            Score: {
                include: {
                    Student: true
                }
            }
        }
    });
    return score
}
const editScore = async (scoreId: number, data: {
    CC: number,
    Final: number,
    Midterm: number
}) => {
    await prisma.score.update({
        where: {
            id: scoreId
        },
        data: {
            CC: data.CC,
            Final: data.Final,
            Midterm: data.Midterm,
            ScoreText: caculateScoreText(caculateScore10(data.CC, data.Midterm, data.Final)),
            status: caculateScore10(data.CC, data.Midterm, data.Final) >= 4 ? ScoreStatus.PASSED : ScoreStatus.FAILED,
            Total10: caculateScore10(data.CC, data.Midterm, data.Final),
            Total4: caculateScore4(caculateScore10(data.CC, data.Midterm, data.Final)),
        }
    })
}
export { getScoreByStudentId, getScoreByTermId, editScore };