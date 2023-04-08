import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../../components/Nav';
import { useGetVideoQuizzeQuery } from '../../features/quizzes/quizzesApi';
import QuizItem from '../student/QuizeItem';

export default function Quiz() {
  const url = useParams();
  const {data,isLoading,isError} = useGetVideoQuizzeQuery(url?.id);
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
    console.log(marks);
    console.log(data)
  };



  return (
    <>
    <Nav/>
  <section className="py-6 bg-primary">
    <form onSubmit={handleSubmit}>
  <div className="mx-auto max-w-7xl px-5 lg:px-0">
    <div className="mb-8">
      <h1 className="text-2xl font-bold">Quizzes for "Debounce Function in JavaScript - JavaScript Job Interview question"
      </h1>
      <p className="text-sm text-slate-200">Each question contains 5 Mark</p>
    </div>
    <div className="space-y-8 ">
      {data?.map((quiz)=>
      <QuizItem key={quiz.id} quiz={quiz} setMark={handleSetMark} setAns={handleSetAns}/>
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
