import { ScoreText } from "@prisma/client";

const caculateScore4 = (score: number) => {
    if (score >= 8.5 && score <= 10) {
        return 4;
    } else if (score >= 7.8 && score <= 8.4) {
        return 3.5;
    } else if (score >= 7.0 && score <= 7.7) {
        return 3;
    } else if (score >= 6.3 && score <= 6.9) {
        return 2.5;
    } else if (score >= 5.5 && score <= 6.2) {
        return 2;
    } else if (score >= 4.8 && score <= 5.4) {
        return 1.5;
    } else if (score >= 4.0 && score <= 4.7) {
        return 1;
    } else {
        return 0;
    }
}

const caculateScore10 = (CC: number, Midterm: number, Final: number) => {
    return +(CC * 0.1 + Midterm * 0.3 + Final * 0.6).toFixed(1);
}

const caculateScoreText = (score: number): ScoreText => {
    if (score >= 8.5 && score <= 10) {
        return ScoreText.A;
    } else if (score >= 7.8 && score <= 8.4) {
        return ScoreText.B_PLUS
    } else if (score >= 7.0 && score <= 7.7) {
        return ScoreText.B
    } else if (score >= 6.3 && score <= 6.9) {
        return ScoreText.C_PLUS
    } else if (score >= 5.5 && score <= 6.2) {
        return ScoreText.C
    } else if (score >= 4.8 && score <= 5.4) {
        return ScoreText.D_PLUS
    } else if (score >= 4.0 && score <= 4.7) {
        return ScoreText.D
    } else {
        return ScoreText.F
    }
}
const enumToGradeString = (scoreText: ScoreText) => {
    switch (scoreText) {
        case ScoreText.A:
            return 'A';
        case ScoreText.B_PLUS:
            return 'B+';
        case ScoreText.B:
            return 'B';
        case ScoreText.C_PLUS:
            return 'C+';
        case ScoreText.C:
            return 'C';
        case ScoreText.D_PLUS:
            return 'D+';
        case ScoreText.D:
            return 'D';
        case ScoreText.F:
            return 'F';
        default:
            return '';
    }
}
function classifyStudent(score4: number) {
    if (score4 >= 3.6) {
        return 'Xuất sắc';
    } else if (score4 >= 3.2) {
        return 'Giỏi';
    } else if (score4 >= 2.5) {
        return 'Khá';
    } else if (score4 >= 2.0) {
        return 'Trung bình';
    } else if (score4 >= 1.0) {
        return 'Yếu';
    } else {
        return 'Kém';
    }
}
export {
    caculateScore10,
    caculateScore4,
    caculateScoreText,
    enumToGradeString,
    classifyStudent
}