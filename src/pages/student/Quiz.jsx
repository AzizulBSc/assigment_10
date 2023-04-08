import { isEqual } from 'lodash';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../../components/Nav';
import { useAddQuizMarkMutation } from '../../features/quizMark/quizMarkApi';
import { useGetVideoQuizzeQuery } from '../../features/quizzes/quizzesApi';
import QuizItem from '../student/QuizeItem';

export default function Quiz() {

  const student = JSON.parse(localStorage.getItem("auth")).user;
  const url = useParams();
 const [addQuizMark,{isLoading:addingQuiz,isError:errorQuizAdding}] = useAddQuizMarkMutation()
  const { data, isLoading, isError } = useGetVideoQuizzeQuery(url?.id);
  const [marks, setMarks] = useState({});
  const [ans, setAns] = useState({});

  const handleSetMark = (quizId, selectedOptions) => {
    setMarks((prevMarks) => ({
      ...prevMarks,
      [quizId]: selectedOptions,
    }));
  };
  const handleSetAns = (quizId, correctOptions) => {
    setAns((prevAns) => ({
      ...prevAns,
      [quizId]: correctOptions,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
<<<<<<< HEAD
    var totalCorrect = 0;
    let totalQuiz = 0;
    let video_title = "";
    let video_id = null;
    {
      data?.map((quiz) => {
        video_title = quiz.video_title;
        video_id = Number(quiz.video_id);
        totalQuiz++;
        if (marks.hasOwnProperty(quiz.id)) {
          if (marks[quiz.id].length == ans[quiz.id].length) {
            marks[quiz.id].sort((a, b) => a - b);
            ans[quiz.id].sort((a, b) => a - b);
            if (isEqual(marks[quiz.id], ans[quiz.id])) {
              totalCorrect++;
            }
          }
        }

      })
    }
   let totalWrong = totalQuiz - totalCorrect;
   let totalMark = totalQuiz * 5 ;
   let mark = totalCorrect * 5;
   addQuizMark({
      student_id: student.id,
      student_name: student.name,
      video_id,
      video_title,
      totalQuiz,
      totalCorrect,
      totalWrong,
      totalMark,
      mark
      });
      alert(`Congrats You Got ${mark} out of ${totalMark}`);
      window.location.href = "/student/player";

=======
    console.log(marks);
    console.log(data)
>>>>>>> 89390ce6a28549cea0d250342e783d3e4144a5a9
  };



  return (
    <>
      <Nav />
      <section className="py-6 bg-primary">
        <form onSubmit={handleSubmit}>
          <div className="mx-auto max-w-7xl px-5 lg:px-0">
            <div className="mb-8">
              <h1 className="text-2xl font-bold">Quizzes for "Debounce Function in JavaScript - JavaScript Job Interview question"
              </h1>
              <p className="text-sm text-slate-200">Each question contains 5 Mark</p>
            </div>
            <div className="space-y-8 ">
              {data?.map((quiz) =>
                <QuizItem key={quiz.id} quiz={quiz} setMark={handleSetMark} setAns={handleSetAns} />
              )}

            </div>

            <button
              className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 ">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}
