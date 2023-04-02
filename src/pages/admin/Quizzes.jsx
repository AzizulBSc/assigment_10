import React from 'react'
import AdminNav from '../../components/AdminNav'
import QuizList from "../../components/admin/quizzes/QuizList";

import {useNavigate} from "react-router-dom";
import Modal from 'react-modal';
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useQuizzeAddMutation} from "../../features/quizzes/quizzesApi";

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
    const  [mcq,setMcq] = useState({
        question:"",
        video_id:"",
        video_title:"",
        options:[
            {},
            {},
            {},
            {}
        ],
    });
    const handleOptionChange = (e,i)=>{
        const options = [...mcq.options];
        options[i] = e.target.value;
        setMcq({...mcq,options});
    }
    const handleAnswerChange = (e)=>{
        setMcq({...mcq});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        quizzeAdd({question,video_id,video_title});
        setQuestion("");
        setVideo_id(null);
        setVideo_title("");
        closeModal();
        alert("Video Added Successfully!!!");
        // Navigate("/admin/videos");
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
                                   className="login-input rounded-t-md" placeholder="Enter Video question" value={question}
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
                        {mcq.options.map((option,i)=>(
                            <div>
                                <label htmlFor="option" className="">Option {++i}</label>
                                <input id="option" name="option" type="text" autoComplete="option" required
                                       className="login-input " placeholder="Enter option Name" />
                                <br/>
                            </div>

                            ))}
                    </div>
                    <button type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                        Saved Video
                    </button>
                    <div>

                    </div>
                </form>
                {/*</div>*/}
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
