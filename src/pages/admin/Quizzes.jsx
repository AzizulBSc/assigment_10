import React from 'react';
import AdminNav from '../../components/AdminNav';
import QuizList from "../../components/admin/quizzes/QuizList";
import { useQuizzeAddMutation } from "../../features/quizzes/quizzesApi";

import { useState } from "react";
import Modal from 'react-modal';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        height:'85%',
        width:'50%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: "rgb(8 14 27 /1)",
        size:"50%",
        borderRadius:"10px",
    },
};
Modal.setAppElement('#root');
export default function Quizzes() {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [quizzeAdd,{ data, isLoading, error: responseError }] = useQuizzeAddMutation();
    function openModal() {
        setIsOpen(true);
    }
    const  Navigate = useNavigate();
    function afterOpenModal() {
    }

    function closeModal() {
        setIsOpen(false);
    }
    const  dispatch = useDispatch();
    const [question,setQuestion] = useState("");
    const [video_id,setVideo_id] = useState(null);
    const [video_title,setVideo_title] = useState("");
    const [option1,setOption1] = useState("");
    const [option2,setOption2] = useState("");
    const [option3,setOption3] = useState("");
    const [option4,setOption4] = useState("");
    
    const [isCorrect1,setIsCorrect1] = useState(false);
    const [isCorrect2,setIsCorrect2] = useState(false);
    const [isCorrect3,setIsCorrect3] = useState(false);
    const [isCorrect4,setIsCorrect4] = useState(false);
   
    // const  [mcq,setMcq] = useState({
    //     question:question,
    //     video_id:video_id,
    //     video_title:video_title,
    //     options:[
    //         {id:1,option:option1,isCorrect:isCorrect1},
    //         {id:2,option:option2,isCorrect:isCorrect2},
    //         {id:3,option:option3,isCorrect:isCorrect3},
    //         {id:4,option:option4,isCorrect:isCorrect4},
    //     ],
    // });

    const handleSubmit = (e) => { 
        e.preventDefault();
        // console.log({question,video_id,video_title,options:[ 
        //     {id:1,option:option1,isCorrect:isCorrect1},
        //     {id:2,option:option2,isCorrect:isCorrect2},
        //     {id:3,option:option3,isCorrect:isCorrect3},
        //     {id:4,option:option4,isCorrect:isCorrect4},]});
        // return;
        quizzeAdd({question,video_id,video_title,options:[ 
            {id:1,option:option1,isCorrect:isCorrect1},
            {id:2,option:option2,isCorrect:isCorrect2},
            {id:3,option:option3,isCorrect:isCorrect3},
            {id:4,option:option4,isCorrect:isCorrect4},]});
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
    }
    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 className="text-center text-2xl font-extrabold ">
                    Add New Video
                </h2>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit} method="POST">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="name" className="">Name</label>
                            <br/>
                            <input id="question" name="question" type="text" autoComplete="question" required
                                   className="login-input rounded-t-sm" placeholder="Enter Video question" value={question}
                                   onChange={(e) => setQuestion(e.target.value)}/>
                        </div>   <br/>
                        <div>
                            <label htmlFor="video_title" className="">Select Video</label>
                            <input id="video_title" name="video_title" type="text"
                                   autoComplete="video_title" required className="login-input rounded-b-md"
                                   value={video_title}
                                   onChange={(e) => setVideo_title(e.target.value)}/>
                        </div>
                        <br/>
                        <div>
                            <label htmlFor="video_id" className="">Select Video</label>
                            <input id="video_id" name="video_id" type="Number" autoComplete="video_id" required
                                   className="login-input "  value={video_id}
                                   onChange={(e) => setVideo_id(e.target.value)}/>
                        </div> <br/>
                            <div>
                                <label htmlFor="option1" className="">Option 1</label>
                                <input id="option1" name="option1" type="text" autoComplete="option1" required
                                       className="login-input " placeholder="Enter option1 Name" type="text"
                                       value={option1}
                                       onChange={(e) => setOption1(e.target.value)}
                                       required/>
                                    <label htmlFor="isCorrect1" className="">Is Correct 1</label>
                                  <select name='isCorrect1' value={isCorrect1}
                                       onChange={(e) => setIsCorrect1(e.target.value)}
                                       required className="login-input ">
                                    <option value={false}>False</option>
                                    <option value={true}>True</option>
                                </select>
                            </div>
                            <br/>
                            <div>
                                <label htmlFor="option2" className="">Option 2</label>
                                <input id="option2" name="option2" type="text" autoComplete="option2" required
                                       className="login-input " placeholder="Enter option 2 Name" type="text"
                                       value={option2}
                                       onChange={(e) => setOption2(e.target.value)}
                                       required/>
                                    <label htmlFor="isCorrect2" className="">Is Correct 2</label>
                                  <select name='isCorrect2' value={isCorrect2}
                                       onChange={(e) => setIsCorrect2(e.target.value)}
                                       required className="login-input ">
                                    <option value={false}>False</option>
                                    <option value={true}>True</option>
                                </select>
                            </div>
                            <br/> <div>
                                <label htmlFor="option3" className="">Option 3</label>
                                <input id="option3" name="option3" type="text" autoComplete="option3" required
                                       className="login-input " placeholder="Enter option Name" type="text"
                                       value={option3}
                                       onChange={(e) => setOption3(e.target.value)}
                                       required/>
                                    <label htmlFor="isCorrect3" className="">Is Correct 3</label>
                                  <select name='isCorrect3' value={isCorrect3}
                                       onChange={(e) => setIsCorrect3(e.target.value)}
                                       required className="login-input ">
                                    <option value={false}>False</option>
                                    <option value={true}>True</option>
                                </select>
                            </div>
                            <br/> <div>
                                <label htmlFor="option4" className="">Option 4</label>
                                <input id="option4" n4ame="option" type="text" autoComplete="option4" required
                                       className="login-input " placeholder="Enter option Name" type="text"
                                       value={option4}
                                       onChange={(e) => setOption4(e.target.value)}
                                       required/>
                                    <label htmlFor="isCorrect4" className="">Is Correct Option 4</label>
                                  <select name='isCorrect4' value={isCorrect4}
                                       onChange={(e) => setIsCorrect4(e.target.value)}
                                       required className="login-input ">
                                    <option value={false}>False</option>
                                    <option value={true}>True</option>
                                </select>
                            </div>
                            <br/>
                    </div>
                    <button type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                        Update Quizze
                    </button>
                    <div>

                    </div>
                </form>
            </Modal>
<AdminNav/>
    <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
            <div className="px-3 py-20 bg-opacity-10">
                <div className="w-full flex">
                    <button className="btn ml-auto" onClick={openModal}>Add Quiz</button>
                </div>
              <QuizList />
            </div>
        </div>
    </section>
</>
 )
}
