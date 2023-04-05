import React from 'react';
import AdminNav from '../../components/AdminNav';
import AssignmentList from "../../components/admin/assignment/AssignmentList";

import { useState } from "react";
import Modal from 'react-modal';
import { useAssignmentAddMutation } from "../../features/assignments/assignmentsApi";
import { useGetVideosQuery } from '../../features/videos/videosApi';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        height: '85%',
        width: '50%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: "rgb(8 14 27 /1)",
        size: "50%",
        borderRadius: "10px",
    },
};
Modal.setAppElement('#root');
export default function Assignment() {
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [assignmentAdd, { data, isLoading, error: responseError }] = useAssignmentAddMutation();
    const { data: options, isLoading: videosLoading, isError, } = useGetVideosQuery();
    // const [options, setOptions] = useState();
    const [selectedOption, setSelectedOption] = useState('');
    function openModal() {
        setIsOpen(true);
    }
    function afterOpenModal() {
    }

    function closeModal() {
        setIsOpen(false);
    }

   
    const [title, setTitle] = useState("");
    const [totalMark, setTotalMark] = useState(0);
    const [video_id, setVideo_id] = useState(null);
    const [video_title, setVideo_title] = useState("");
    var vid=null;
    var vTitle="";
    function handleOptionChange(event) {
        setSelectedOption(event.target.value);
        const [firstWord, ...restWords] = event.target.value.split(' ');
        vid = Number(firstWord);
        vTitle = restWords.join(' ');
        setVideo_id(vid);
        setVideo_title(vTitle);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        assignmentAdd({ title, video_id, video_title, totalMark });
        setTitle("");
        setTotalMark(0);
        setVideo_id(null);
        setVideo_title("");
        closeModal();
        alert("Assignment Added Successfully!!!");
        window.location.href = "/admin/assignment";
    }
    return (
        <>
            <AdminNav />

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
                                onChange={(e) => setTitle(e.target.value)} />
                        </div> <br />
                        <div>
                            <label htmlFor="video_title" className="">Select Video</label>
                            <select required value={selectedOption} className="login-input rounded-b-md" onChange={handleOptionChange}>
                            <option >Select Video</option>
                                {options?.map(option => (
                                    <option key={option.id} value={`${option.id} ${option.title}`}>{option.title}</option>
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