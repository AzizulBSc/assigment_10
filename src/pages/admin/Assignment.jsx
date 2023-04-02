import React from 'react'
import AdminNav from '../../components/AdminNav'
import AssignmentList from "../../components/admin/assignment/AssignmentList";

import {useNavigate} from "react-router-dom";
import Modal from 'react-modal';
import {useDispatch} from "react-redux";
import {useAssignmentAddMutation} from "../../features/assignments/assignmentsApi";
import {useState} from "react";
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
export default function Assignment() {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [assignmentAdd,{ data, isLoading, error: responseError }] = useAssignmentAddMutation();
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
    const [title,setTitle] = useState("");
    const [video_id,setVideo_id] = useState(null);
    const [totalMark,setTotalMark] = useState("");
    const [video_title,setVideo_title] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        assignmentAdd({title,video_id,video_title,totalMark});
        setTitle("");
        setVideo_id(null);
        setTotalMark("");
        setVideo_title("");
        closeModal();
        alert("Assignment Added Successfully!!!");
        // Navigate("/admin/videos");
        window.location.href = "/admin/assignment";
    }
    return (
        <>
            <AdminNav/>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 className="text-center text-2xl font-extrabold ">
                    Add New Assignment
                </h2>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit} method="POST">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="title" className="">Enter Assignment Title</label>
                            <input id="title" name="title" type="text" autoComplete="title" required
                                   className="login-input rounded-t-md" placeholder="Enter Assignment Title" value={title}
                                   onChange={(e) => setTitle(e.target.value)}/>
                        </div> <br/>
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
                            <label htmlFor="totalMark" >Total Mark</label>

                            <input id="totalMark" name="totalMark" type="number" autoComplete="current-totalMark"
                                   required
                                   className="login-input" placeholder="Enter Assignment Total Mark" value={totalMark}
                                   onChange={(e) => setTotalMark(e.target.value)}/>
                        </div>
                        <br/>
                    </div>
                    <button type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                        Saved Assignment
                    </button>
                    <div>

                    </div>
                </form>
                {/*</div>*/}
            </Modal>

    <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
            <div className="px-3 py-20 bg-opacity-10">
                <div className="w-full flex">
                    <button className="btn ml-auto" onClick={openModal}>Add Assignment</button>
                </div>
               <AssignmentList />
            </div>
        </div>
    </section>
</>
 )
}