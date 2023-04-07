import React from 'react';
import { useAssignmentEditMutation, useDeleteAssignmentMutation, useGetAssignmentsQuery } from "../../../features/assignments/assignmentsApi";

import { useState } from "react";
import Modal from 'react-modal';
import { useGetVideosQuery } from '../../../features/videos/videosApi';
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
    const {title:t,video_title:vt,totalMark:tm,id,video_id:vi} = assignment.assignment;
    const [deleteAssignmentMutation, { loading, error, data }] = useDeleteAssignmentMutation();
    const [assignmentEdit,{}] = useAssignmentEditMutation();
    const { data:allAss } = useGetAssignmentsQuery();
    const { data: options, isLoading: videosLoading, isError, } = useGetVideosQuery();
   
    //old value placed on field
    const [selectedOption, setSelectedOption] = useState(id);
    const [title, setTitle] = useState(t);
    const [totalMark, setTotalMark] = useState(tm);
    const [video_id, setVideo_id] = useState(vi);
    const [video_title, setVideo_title] = useState(vt);



    const [modalIsOpen,setIsOpen] = useState(false)

    const handleDelete = () =>{
        deleteAssignmentMutation(id);
        alert("Delete Successfully");
        window.location.href = "/admin/assignment";
    }

 const handleOptionChange = (event) => {
        const selectedOption = event.target.value;
        const selectedOptionObject = options?.find(option => option.id == selectedOption);
        //old video selected check
        if(id!=selectedOption){
            //new and existing assignment video check
        if(allAss?.find(ass => ass.video_id == selectedOption)){
            alert("Assignment Available Please Select Another Video!!!");
            return;
        }
    }
        setSelectedOption(selectedOption);
        setVideo_id(selectedOptionObject.id);
        setVideo_title(selectedOptionObject.title);
    }

    function openModal() {
        setIsOpen(true);
    }
    function afterOpenModal() {
    }

    function closeModal() {
        setIsOpen(false);
    }

   
    const handleSubmit = (e) => {
        e.preventDefault();
        assignmentEdit({id,title, video_id, video_title, totalMark});
        setTitle("");
        setVideo_id(null);
        setTotalMark("");
        setVideo_title("");
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
                                className="login-input rounded-t-md" placeholder="Enter Assignment Title" value={title}
                                onChange={(e) => setTitle(e.target.value)} />
                        </div> <br />
                        <div>
                            <label htmlFor="video_title" className="">Select Video</label>
                            <select required value={selectedOption} className="login-input rounded-b-md" onChange={handleOptionChange}>
                                {options?.map(option => (
                                    <option  key={option.id} value={option.id}>{option.title}</option>
                                ))}
                            </select>
                        </div>
                        <br />
                        <div>
                            <label htmlFor="totalMark" >Total Mark</label>

                            <input id="totalMark" name="totalMark" type="number" autoComplete="current-totalMark"
                                required
                                className="login-input" placeholder="Enter Assignment Total Mark" value={totalMark}
                                onChange={(e) => setTotalMark(e.target.value)} />
                        </div>
                        <br />
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