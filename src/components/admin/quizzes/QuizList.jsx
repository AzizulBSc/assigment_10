import React from 'react';
import { useGetQuizzesQuery } from "../../../features/quizzes/quizzesApi";
import QuizItem from "./QuizItem";
function QuizList() {
    const {data,isLoading, isError, error} = useGetQuizzesQuery();
    return (

        <div className="overflow-x-auto mt-4">
            <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                <tr>
                    <th className="table-th">Question</th>
                    <th className="table-th">Video</th>
                    <th className="table-th justify-center">Action</th>
                </tr>
                </thead>

                <tbody className="divide-y divide-slate-600/50">
                {data?.map((quiz)=>(
                    <QuizItem key={quiz.id} quiz = {quiz} />
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default QuizList;