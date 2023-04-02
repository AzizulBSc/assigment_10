import React from "react";
import { useDeleteQuizzeMutation, useQuizzeEditMutation } from "../../../features/quizzes/quizzesApi";

import { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    height: "85%",
    width: "50%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgb(8 14 27 /1)",
    size: "50%",
    borderRadius: "10px",
  },
};
Modal.setAppElement("#root");

function QuizItem(quiz) {
  const [deleteQuizzeMutation, { loading, error, data }] =
    useDeleteQuizzeMutation();
  const handleDelete = () => {
    deleteQuizzeMutation(quiz.quiz.id);
    alert("Delete Successfully");
    window.location.href = "/admin/quizzes";
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [quizzeEdit, { isLoading, error: responseError }] =
    useQuizzeEditMutation();
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  
  const [question, setQuestion] = useState(quiz?.quiz.question);
  const [video_id, setVideo_id] = useState(quiz?.quiz.video_id);
  const [video_title, setVideo_title] = useState(quiz?.quiz.video_title);
  const [option1, setOption1] = useState(quiz?.quiz.options[0].option);
  const [option2, setOption2] = useState(quiz?.quiz.options[1].option);
  const [option3, setOption3] = useState(quiz?.quiz.options[2].option);
  const [option4, setOption4] = useState(quiz?.quiz.options[3].option);

  const [isCorrect1, setIsCorrect1] = useState(quiz?.quiz.options[0].isCorrect);
  const [isCorrect2, setIsCorrect2] = useState(quiz?.quiz.options[1].isCorrect);
  const [isCorrect3, setIsCorrect3] = useState(quiz?.quiz.options[2].isCorrect);
  const [isCorrect4, setIsCorrect4] = useState(quiz?.quiz.options[3].isCorrect);

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log({question,video_id,video_title,options:[
        {id:1,option:option1,isCorrect:isCorrect1},
        {id:2,option:option2,isCorrect:isCorrect2},
        {id:3,option:option3,isCorrect:isCorrect3},
        {id:4,option:option4,isCorrect:isCorrect4},]});
    // return;
    quizzeEdit({
     id:quiz.quiz.id,
      question,
      video_id,
      video_title,
      options: [
        { id: 1, option: option1, isCorrect: isCorrect1 },
        { id: 2, option: option2, isCorrect: isCorrect2 },
        { id: 3, option: option3, isCorrect: isCorrect3 },
        { id: 4, option: option4, isCorrect: isCorrect4 },
      ],
    });
    //reset state
    setQuestion("");
    setVideo_id(null);
    setVideo_title("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");

    setIsCorrect1(false);
    setIsCorrect2(false);
    setIsCorrect3(false);
    setIsCorrect4(false);
    closeModal();
    alert("Quizze Added Successfully!!!");
    window.location.href = "/admin/quizzes";
  };
  function afterOpenModal() {
}
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        onAfterOpen={afterOpenModal}
        style={customStyles}
        contentLabel="Example Modal">
        <h2 className="text-center text-2xl font-extrabold ">Edit New Quizze</h2>

        <form className="mt-8 space-y-6" onSubmit={handleUpdate} method="POST">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="">
                Name
              </label>
              <br/>
              <input
                id="question"
                name="question"
                type="text"
                autoComplete="question"
                required
                className="login-input rounded-t-sm"
                placeholder="Enter Video question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <br />
            <div>
              <label htmlFor="video_title" className="">
                Select Video
              </label>
              <input
                id="video_title"
                name="video_title"
                type="text"
                autoComplete="video_title"
                required
                className="login-input rounded-b-md"
                value={video_title}
                onChange={(e) => setVideo_title(e.target.value)}
              />
            </div>
            <br />
            <div>
              <label htmlFor="video_id" className="">
                Select Video
              </label>
              <input
                id="video_id"
                name="video_id"
                type="Number"
                autoComplete="video_id"
                required
                className="login-input "
                value={video_id}
                onChange={(e) => setVideo_id(e.target.value)}
              />
            </div>{" "}
            <br />
            <div>
              <label htmlFor="option1" className="">
                Option 1
              </label>
              <input
                id="option1"
                name="option1"
                type="text"
                autoComplete="option1"
                required
                className="login-input "
                placeholder="Enter option1 Name"
                type="text"
                value={option1}
                onChange={(e) => setOption1(e.target.value)}
                required
              />
              <label htmlFor="isCorrect1" className="">
                Is Correct 1
              </label>
              <select
                name="isCorrect1"
                value={isCorrect1}
                onChange={(e) => setIsCorrect1(e.target.value)}
                required
                className="login-input ">
                <option value={false}>False</option>
                <option value={true}>True</option>
              </select>
            </div>
            <br />
            <div>
              <label htmlFor="option2" className="">
                Option 2
              </label>
              <input
                id="option2"
                name="option2"
                type="text"
                autoComplete="option2"
                required
                className="login-input "
                placeholder="Enter option 2 Name"
                type="text"
                value={option2}
                onChange={(e) => setOption2(e.target.value)}
                required
              />
              <label htmlFor="isCorrect2" className="">
                Is Correct 2
              </label>
              <select
                name="isCorrect2"
                value={isCorrect2}
                onChange={(e) => setIsCorrect2(e.target.value)}
                required
                className="login-input ">
                <option value={false}>False</option>
                <option value={true}>True</option>
              </select>
            </div>
            <br />{" "}
            <div>
              <label htmlFor="option3" className="">
                Option 3
              </label>
              <input
                id="option3"
                name="option3"
                type="text"
                autoComplete="option3"
                required
                className="login-input "
                placeholder="Enter option Name"
                type="text"
                value={option3}
                onChange={(e) => setOption3(e.target.value)}
                required
              />
              <label htmlFor="isCorrect3" className="">
                Is Correct 3
              </label>
              <select
                name="isCorrect3"
                value={isCorrect3}
                onChange={(e) => setIsCorrect3(e.target.value)}
                required
                className="login-input ">
                <option value={false}>False</option>
                <option value={true}>True</option>
              </select>
            </div>
            <br />{" "}
            <div>
              <label htmlFor="option4" className="">
                Option 4
              </label>
              <input
                id="option4"
                n4ame="option"
                type="text"
                autoComplete="option4"
                required
                className="login-input "
                placeholder="Enter option Name"
                type="text"
                value={option4}
                onChange={(e) => setOption4(e.target.value)}
                required
              />
              <label htmlFor="isCorrect4" className="">
                Is Correct Option 4
              </label>
              <select
                name="isCorrect4"
                value={isCorrect4}
                onChange={(e) => setIsCorrect4(e.target.value)}
                required
                className="login-input ">
                <option value={false}>False</option>
                <option value={true}>True</option>
              </select>
            </div>
            <br />
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
            Saved Video
          </button>
          <div></div>
        </form>
      </Modal>

      <tr>
        <td className="table-td">{quiz.quiz.question}</td>
        <td className="table-td">{quiz.quiz.video_title}</td>
        <td className="table-td flex gap-x-2 justify-center">
        <div onClick={handleDelete}>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 hover:text-red-500 cursor-pointer transition-all">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
          </div>
          <div onClick={openModal}>
          <svg 
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 hover:text-blue-500 cursor-pointer transition-all">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
          </div>
        </td>
      </tr>
    </>
  );
}

export default QuizItem;
