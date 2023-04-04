import React, {useState} from 'react';
import Modal from 'react-modal';
import {useGetVideoQuery} from '../../../features/videos/videosApi';
import {Link} from 'react-router-dom';
import {useGetVideoQuizzeQuery} from '../../../features/quizzes/quizzesApi';
import {useGetVideoAssignmentQuery} from '../../../features/assignments/assignmentsApi';
// import {useVideoAddMutation} from "../../features/videos/videosApi";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        height: '50%',
        width: '30%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: "rgb(8 14 27 /1)",
        size: "50%",
        borderRadius: "10px",
    },
};
Modal.setAppElement('#root');
export default function Player(playingId) {

    const [modalIsOpen, setIsOpen] = useState(false);
    const [repo_link, setRepo_link] = useState("");
    const [assignment_id, setAssignment_id] = useState(null);
    const [quizze_id, setQuizze_id] = useState(null);

    const {data, isLoading, isError, error} = useGetVideoQuery(playingId?.playingId);
    const {
        data: assignments,
        isLoading: isLoadingAss,
        isError: isErrorAss,
    } = useGetVideoAssignmentQuery(playingId?.playingId);
    const {
        data: quizzes,
        isLoading: isLoadingQuize,
        isError: isErrorquiz
    } = useGetVideoQuizzeQuery(playingId?.playingId);


    let quizebtn = "";
    let assbtn = "";
    if (quizzes?.length>0 && !isLoadingQuize && !isErrorquiz) {
        quizebtn = <Link to="/student/quiz"
                         className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">কুইজে
            অংশগ্রহণ
            করুন
        </Link>;
        // setQuizze_id(quizzes[0]?.id);

    }
    if (assignments?.length>0 && !isLoadingAss && !isErrorAss) {
        assbtn = <Link to="#" onClick={() => openModal()}
                       className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
            এসাইনমেন্ট
        </Link>
        // setAssignment_id(assignments[0]?.id);
    }
    let player = "";
    if (isLoading) {
        player =
            <iframe width="100%" className="aspect-video" src="https://media.tenor.com/64BYBgDG41QAAAAC/loading.gif"
                    title="Things I wish I knew as a Junior Web Developer - Sumit Saha - BASIS SoftExpo 2023"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
    } else if (data && !isLoading && !isError) {
        const dateStr = data.createdAt;
        const dateObj = new Date(dateStr);
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        const formattedDate = dateObj.toLocaleDateString('en-US', options);
        player = <div className="col-span-full w-full space-y-8 lg:col-span-2">
            <iframe width="100%" className="aspect-video" src={data.url}
                    title="Things I wish I knew as a Junior Web Developer - Sumit Saha - BASIS SoftExpo 2023"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>

            <div>
                <h1 className="text-lg font-semibold tracking-tight text-slate-100">
                    {data.title}
                </h1>
                <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
                    Uploaded on {formattedDate}</h2>

                <div className="flex gap-4">
                    {/*style={{pointerEvents: "none"}}*/}
                    {assbtn}
                    {quizebtn}
                </div>
                <p className="mt-4 text-sm text-slate-400 leading-6">
                    {data.description}
                </p>

            </div>

        </div>
    }
    const openModal = () => {
        setIsOpen(true);
    }

    function afterOpenModal() {
    }

    function closeModal() {
        setIsOpen(false);

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const student = JSON.parse(localStorage.getItem('auth')).user;
        console.log("submit");
        // videoAdd({student_id:student.id,student_name:student.name,assignment_id:assignments[0]?.id,title,createdAt:new Date(),totalMark:100,mark:0,repo_link,status:"pending"});
       console.log({student_id:student.id,student_name:student.name,assignment_id:assignments[0]?.id,title:assignments[0]?.title,createdAt:new Date(),totalMark:100,mark:0,repo_link,status:"pending"});
        setRepo_link("");
        closeModal();
        alert("Assignment Submitted Successfully!!!");
    }
    return (<>
            {player}
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 className="text-center text-2xl font-extrabold ">
                    Submit Assigment
                </h2>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit} method="POST">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="repo_link" className="">Repository Link</label>
                            <br/>
                            <br/>
                            <input id="repo_link" name="repo_link" type="text" autoComplete="repo_link" required
                                   className="login-input " placeholder="Enter Repository Link" value={repo_link}
                                   onChange={(e) => setRepo_link(e.target.value)}/>
                        </div>
                        {/*<input id="repo_link" name="repo_link" type="hidden" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>*/}
                    </div>
                    <button type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                        Submit
                    </button>
                    <div>

                    </div>
                </form>
            </Modal>
        </>
    )
}
