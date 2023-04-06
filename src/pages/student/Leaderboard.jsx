import React, { useEffect } from "react";
import Nav from "../../components/Nav";
import { useGetMarksQuery } from "../../features/marks/marksApi";
import { useGetQuizMarksQuery } from "../../features/quizMark/quizMarkApi";

export default function Leaderboard() {
    const { data: assMarks, isLoading, isError, error } = useGetMarksQuery();
    const { data: quizMarks } = useGetQuizMarksQuery();
    const [scoreboard, setScoreboard] = React.useState({});
    const student = JSON.parse(localStorage.getItem("auth")).user;
  // get total marks(assigment and quizzes) by student
    const getTotalMarksByStudent = (marks, label) => {
        const results = {};
        marks?.reduce((acc, curr) => {
            const { student_id, mark } = curr;
            if (label === "totalAssMarks") {
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
            totalAssMarksByStudent = getTotalMarksByStudent(
                assMarks,
                "totalAssMarks"
            );
        }
        if (quizMarks) {
            totalQuizMarksByStudent = getTotalMarksByStudent(
                quizMarks,
                "totalQuizMarks"
            );
        }
        // merge two arrays for making leaderboard
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
            setScoreboard(Leaderboard);
            
        }
    }, [assMarks, quizMarks]);

let leaderBoardcontent = <tr className="border-b border-slate-600/50">
<td className="table-td text-center" colSpan="5">No Data Available</td>
</tr>;
let userContent = <tr className="border-2 border-cyan">
<td className="table-td text-center font-bold" colSpan="5">No Data Available</td>
</tr>;
    if(scoreboard.length > 0){
        scoreboard.map((row) => {
            if(row.student_id == student.id){
                userContent = <tr className="border-2 border-cyan">
                <td className="table-td text-center font-bold">{row.rank}</td>
                <td className="table-td text-center font-bold">{row.student_name}</td>
                <td className="table-td text-center font-bold">{row.totalQuizMarks}</td>
                <td className="table-td text-center font-bold">{row.totalAssMarks}</td>
                <td className="table-td text-center font-bold">{row.totalMarks}</td>
            </tr>
            }
        })
        leaderBoardcontent = scoreboard.slice(0, 20).map((student) => (
            <tr className="border-b border-slate-600/50">
                
                                    <td className="table-td text-center">{student.rank}</td>
                                    <td className="table-td text-center">{student.student_name}</td>
                                    <td className="table-td text-center">{student.totalQuizMarks}</td>
                                    <td className="table-td text-center">{student.totalAssMarks}</td>
                                    <td className="table-td text-center">{student.totalMarks}</td>
                                </tr>
         ))
       
        
    }






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
                                {userContent}
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
                                {leaderBoardcontent}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
}
