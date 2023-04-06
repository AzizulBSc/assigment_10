import React, { useEffect } from "react";
import Nav from "../../components/Nav";
import { useGetMarksQuery } from "../../features/marks/marksApi";
import { useGetQuizMarksQuery } from "../../features/quizMark/quizMarkApi";

export default function Leaderboard() {
    const { data: assMarks, isLoading, isError, error } = useGetMarksQuery();
    const { data: quizMarks } = useGetQuizMarksQuery();
    const getTotalMarksByStudent = (marks, xyz) => {
        const results = {};
        marks?.reduce((acc, curr) => {
            const { student_id, mark } = curr;
            if (xyz === "totalAssMarks") {
                const totalAssMarks = parseInt(mark);

                if (!results[student_id]) {
                    results[student_id] = {
                        student_id,
                        student_name: curr.student_name,
                        totalAssMarks,
                    };
                } else {
                    results[student_id].totalAssMarks += totalAssMarks;
                }
            } else {
                const totalQuizMarks = parseInt(mark);
                if (!results[student_id]) {
                    results[student_id] = {
                        student_id,
                        student_name: curr.student_name,
                        totalQuizMarks,
                    };
                } else {
                    results[student_id].totalQuizMarks += totalQuizMarks;
                }
            }

            return acc;
        }, {});

        return Object.values(results);
    };

    useEffect(() => {
        let totalAssMarksByStudent, totalQuizMarksByStudent;
        if (assMarks) {
            console.log("assMarks:");
            console.log(assMarks);
            totalAssMarksByStudent = getTotalMarksByStudent(
                assMarks,
                "totalAssMarks"
            );
            console.log("totalAssMarksByStudent:");
            console.log(totalAssMarksByStudent);
        }
        if (quizMarks) {
            console.log("quizMarks:");
            console.log(quizMarks);
            totalQuizMarksByStudent = getTotalMarksByStudent(
                quizMarks,
                "totalQuizMarks"
            );
            console.log("totalQuizMarksByStudent:");
            console.log(totalQuizMarksByStudent);
        }
        if (totalQuizMarksByStudent && assMarks) {
            const mergedArray = totalQuizMarksByStudent?.map((quiz) => {
                const correspondingAssignment = totalAssMarksByStudent?.find(
                    (assignment) => assignment.student_id === quiz.student_id
                );
                return { ...quiz, ...correspondingAssignment };
            });
            // create leaderboard merge two arrays and add totalMarks
            const Leaderboard = mergedArray.map((student) => ({
                ...student,
                totalQuizMarks: student.totalQuizMarks ?? 0,
                totalAssMarks: student.totalAssMarks ?? 0,
                totalMarks:
                    Number(student.totalQuizMarks ?? 0) +
                    Number(student.totalAssMarks ?? 0),
            }));

            // sort Leaderboard by totalMarks and assign rank
            Leaderboard.sort((a, b) => b.totalMarks - a.totalMarks);
            Leaderboard.map((obj, index) => {
                obj.rank = index + 1;
                return obj;
            });
            // if two students have same total marks, they will have same rank
            for (let i = 0; i < Leaderboard.length - 1; i++) {
                if (Leaderboard[i].totalMarks === Leaderboard[i + 1].totalMarks) {
                    Leaderboard[i + 1].rank = Leaderboard[i].rank;
                    for (let j = i + 2; j < Leaderboard.length; j++) {
                        Leaderboard[j].rank = Leaderboard[j].rank - 1;
                    }
                }
            }

            console.log("after sorted Leaderboard:");
            console.log(Leaderboard);
        }
    }, [assMarks, quizMarks]);
    return (
        <>
            <Nav />
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-7xl px-5 lg:px-0">
                    <div>
                        <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
                        <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
                            <thead>
                                <tr>
                                    <th className="table-th !text-center">Rank</th>
                                    <th className="table-th !text-center">Name</th>
                                    <th className="table-th !text-center">Quiz Mark</th>
                                    <th className="table-th !text-center">Assignment Mark</th>
                                    <th className="table-th !text-center">Total</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr className="border-2 border-cyan">
                                    <td className="table-td text-center font-bold">4</td>
                                    <td className="table-td text-center font-bold">Saad Hasan</td>
                                    <td className="table-td text-center font-bold">50</td>
                                    <td className="table-td text-center font-bold">50</td>
                                    <td className="table-td text-center font-bold">100</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="my-8">
                        <h3 className="text-lg font-bold">Top 20 Result</h3>
                        <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
                            <thead>
                                <tr className="border-b border-slate-600/50">
                                    <th className="table-th !text-center">Rank</th>
                                    <th className="table-th !text-center">Name</th>
                                    <th className="table-th !text-center">Quiz Mark</th>
                                    <th className="table-th !text-center">Assignment Mark</th>
                                    <th className="table-th !text-center">Total</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr className="border-b border-slate-600/50">
                                    <td className="table-td text-center">4</td>
                                    <td className="table-td text-center">Saad Hasan</td>
                                    <td className="table-td text-center">50</td>
                                    <td className="table-td text-center">50</td>
                                    <td className="table-td text-center">100</td>
                                </tr>

                                <tr className="border-b border-slate-600/50">
                                    <td className="table-td text-center">4</td>
                                    <td className="table-td text-center">Saad Hasan</td>
                                    <td className="table-td text-center">50</td>
                                    <td className="table-td text-center">50</td>
                                    <td className="table-td text-center">100</td>
                                </tr>

                                <tr className="border-b border-slate-600/50">
                                    <td className="table-td text-center">4</td>
                                    <td className="table-td text-center">Saad Hasan</td>
                                    <td className="table-td text-center">50</td>
                                    <td className="table-td text-center">50</td>
                                    <td className="table-td text-center">100</td>
                                </tr>

                                <tr className="border-b border-slate-600/50">
                                    <td className="table-td text-center">4</td>
                                    <td className="table-td text-center">Saad Hasan</td>
                                    <td className="table-td text-center">50</td>
                                    <td className="table-td text-center">50</td>
                                    <td className="table-td text-center">100</td>
                                </tr>

                                <tr className="border-b border-slate-600/50">
                                    <td className="table-td text-center">4</td>
                                    <td className="table-td text-center">Saad Hasan</td>
                                    <td className="table-td text-center">50</td>
                                    <td className="table-td text-center">50</td>
                                    <td className="table-td text-center">100</td>
                                </tr>

                                <tr className="border-slate-600/50">
                                    <td className="table-td text-center">4</td>
                                    <td className="table-td text-center">Saad Hasan</td>
                                    <td className="table-td text-center">50</td>
                                    <td className="table-td text-center">50</td>
                                    <td className="table-td text-center">100</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
}
