import React from 'react';
import { useAssignmentEditMutation, useDeleteAssignmentMutation } from "../../../features/assignments/assignmentsApi";

import { useState } from "react";
import Modal from 'react-modal';
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


function AssignmentItem(assignment) {
    const {title,video_title,totalMark,id,video_id} = assignment.assignment;
    const [deleteAssignmentMutation, { loading, error, data }] = useDeleteAssignmentMutation();
    const [assignmentEdit,{}] = useAssignmentEditMutation();

    const [modalIsOpen,setIsOpen] = useState(false)
    const handleDelete = () =>{
        deleteAssignmentMutation(id);
        alert("Delete Successfully");
        window.location.href = "/admin/assignment";
    }



    function openModal() {
        setIsOpen(true);
    }
    function afterOpenModal() {
    }

    function closeModal() {
        setIsOpen(false);
    }

    const [title1,setTitle1] = useState(title);
    const [video_id1,setVideo_id1] = useState(video_id);
    const [totalMark1,setTotalMark1] = useState(totalMark);
    const [video_title1,setVideo_title1] = useState(video_title);
    const handleSubmit = (e) => {
        e.preventDefault();
        assignmentEdit({id,title:title1,video_id:video_id1,video_title:video_title1,totalMark:totalMark1});
        setTitle1("");
        setVideo_id1(null);
        setTotalMark1("");
        setVideo_title1("");
        closeModal();
        window.location.href = "/admin/assignment";
        alert("Assignment Updated Successfully!!!");
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
                    Update Assignment
                </h2>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit} method="POST">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="title" className="">Enter Assignment Title</label>
                            <input id="title" name="title" type="text" autoComplete="title" required
                                   className="login-input rounded-t-md" placeholder="Enter Assignment Title" value={title1}
                                   onChange={(e) => setTitle1(e.target.value)}/>
                        </div> <br/>
                        <div>
                            <label htmlFor="video_title" className="">Select Video</label>
                            <input id="video_title" name="video_title" type="text"
                                   autoComplete="video_title" required className="login-input rounded-b-md"
                                   value={video_title1}
                                   onChange={(e) => setVideo_title1(e.target.value)}/>
                        </div>
                        <br/>
                        <div>
                            <label htmlFor="video_id" className="">Select Video</label>
                            <input id="video_id" name="video_id" type="number" autoComplete="video_id" required
                                   className="login-input "  value={video_id1}
                                   onChange={(e) => setVideo_id1(e.target.value)}/>
                        </div> <br/>
                        <div>
                            <label htmlFor="totalMark" >Total Mark</label>

                            <input id="totalMark" name="totalMark" type="number" autoComplete="current-totalMark"
                                   required
                                   className="login-input" placeholder="Enter Assignment Total Mark" value={totalMark1}
                                   onChange={(e) => setTotalMark1(e.target.value)}/>
                        </div>
                        <br/>
                    </div>
                    <button type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                        Update Assignment
                    </button>
                    <div>

                    </div>
                </form>
                {/*</div>*/}
            </Modal>
        <tr key={assignment.id}>
            <td className="table-td">{title}</td>
            <td className="table-td">{video_title}</td>
            <td className="table-td">{totalMark}</td>
            <td className="table-td flex gap-x-2">
                <div onClick={handleDelete}>
                <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                     className="w-6 h-6 hover:text-red-500 cursor-pointer transition-all">
                    <path stroke-linecap="round"  stroke-linejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
                </div>
                <div onClick={openModal}>
                <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                     className="w-6 h-6 hover:text-blue-500 cursor-pointer transition-all">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                </div>

            </td>
        </tr>
        
        </>
    );
}

export default AssignmentItem;