import React, {useState} from 'react';
import AdminNav from '../../components/AdminNav';
import VideosList from "../../components/admin/videos/VideosList";
import {useNavigate} from "react-router-dom";
import Modal from 'react-modal';
import {useDispatch} from "react-redux";
import {useVideoAddMutation} from "../../features/videos/videosApi";

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
export default function Videos() {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [videoAdd,{ data, isLoading, error: responseError }] = useVideoAddMutation();
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
    const [description,setDescription] = useState("");
    const [url,setUrl] = useState("");
    const [views,setViews] = useState("");
    const [duration,setDuration] = useState("");
    const [createdAt,setCreatedAt] = useState(new Date());
    const handleSubmit = (e) => {
        e.preventDefault();
        videoAdd({title,description,url,views,duration,createdAt});
        setTitle("");
        setDescription("");
        setUrl("");
        setViews("");
        setDuration("");
            closeModal();
            alert("Video Added Successfully!!!");
            // Navigate("/admin/videos");
        window.location.href = "/admin/videos";
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
                            <input id="title" name="title" type="text" autoComplete="title" required
                                   className="login-input rounded-t-md" placeholder="Enter Video Title" value={title}
                                   onChange={(e) => setTitle(e.target.value)}/>
                        </div>   <br/>
                        <div>
                            <label htmlFor="description" className="">Description</label>

                            <input id="description" name="description" type="text" autoComplete="description" required
                                   className="login-input " placeholder="Enter Video Description" value={description}
                                   onChange={(e) => setDescription(e.target.value)}/>
                        </div> <br/>
                        <div>
                            <label htmlFor="url" >Video URL</label>

                            <input id="url" name="url" type="text" autoComplete="current-url"
                                   required
                                   className="login-input" placeholder="Enter Video Url" value={url}
                                   onChange={(e) => setUrl(e.target.value)}/>
                        </div>
                        <br/>
                        <div>
                            <label htmlFor="views" className="">Views</label>

                            <input id="views" name="views" type="text"
                                   autoComplete="views" required className="login-input rounded-b-md"
                                   placeholder="Enter Views Ex:50.5K or 50M" value={views}
                                   onChange={(e) => setViews(e.target.value)}/>
                        </div>
                        <br/>
                        <div>
                            <label htmlFor="duration" className="">Duration</label>
                            <input id="duration" name="duration" type="text"
                                   autoComplete="duration" required className="login-input rounded-b-md"
                                   placeholder="Enter Video Duration" value={duration}
                                   onChange={(e) => setDuration(e.target.value)}/>
                        </div>  <br/>
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
            <AdminNav />
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-full px-5 lg:px-20">
                    <div className="px-3 py-20 bg-opacity-10">
                        <div className="w-full flex">
                            <button className="btn ml-auto" onClick={openModal}>Add Video</button>
                        </div>
                        <VideosList/>
                    </div>
                </div>
            </section>
        </>

    )
}
