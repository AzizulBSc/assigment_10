import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../components/Nav';
import {useGetVideosQuery} from "../../features/videos/videosApi";
import Modal from 'react-modal';
// import {useVideoAddMutation} from "../../features/videos/videosApi";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        height:'40%',
        width:'30%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: "rgb(8 14 27 /1)",
        size:"50%",
        borderRadius:"10px",
    },
};
Modal.setAppElement('#root');

export default function CoursePlayer() {

    const {data,isLoading, isError, error} = useGetVideosQuery();
    // console.log(data[0]);
    const [repo_link,setRepo_link] = useState("");
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
   const openModal=(data)=> {
        setIsOpen(true);
    }
    function afterOpenModal() {
    }

    function closeModal() {
        setIsOpen(false);

    }
    const [playing,setPlaying] = useState();
    // const  dispatch = useDispatch();
    useEffect(() => {
       setPlaying(data);

    },[data]);
    // if(playing.length>0)

    const handleSubmit = (e) => {
        e.preventDefault();
        const  student = JSON.parse(localStorage.getItem('auth')).user;
        console.log("submit");
        // videoAdd({student_id:student.id,student_name:student.name,assignment_id,title,createdAt:new Date(),totalMark:100,mark:0,repo_link,status:"pending"});
        console.log({student_id:student.id,student_name:student.name,assignment_id:playing[0].id,title:playing[0].title,createdAt:new Date(),totalMark:100,mark:0,repo_link,status:"pending"});
        setRepo_link("");
        closeModal();
        alert("Assignment Submitted Successfully!!!");
    }
    return (
    <>
<Nav/>
    <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
            <div className="grid grid-cols-3 gap-2 lg:gap-8">
                <div className="col-span-full w-full space-y-8 lg:col-span-2">
                    <iframe width="100%" className="aspect-video" src="https://www.youtube.com/embed/56zUkaXJnUA"
                        title="Things I wish I knew as a Junior Web Developer - Sumit Saha - BASIS SoftExpo 2023"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen></iframe>

                    <div>
                        <h1 className="text-lg font-semibold tracking-tight text-slate-100">
                            Things I wish I knew as a Junior Web Developer - Sumit Saha - BASIS SoftExpo 2023
                        </h1>
                        <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
                            Uploaded on 23 February
                            2020</h2>

                        <div className="flex gap-4">
                            {/*style={{pointerEvents: "none"}}*/}
                            <Link to="#"  onClick={() => openModal(data)}
                                className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
                                এসাইনমেন্ট
                            </Link>

                            <Link to="/student/quiz"
                                className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">কুইজে
                                অংশগ্রহণ
                                করুন
                                </Link>
                        </div>
                        <p className="mt-4 text-sm text-slate-400 leading-6">
                            আপনারা যারা বিগিনার হিসেবে রিয়্যাক্ট জেস নিয়ে কাজ করা শুরু করেছেন, তারা রিয়্যাক্ট এর বেশ
                            কিছু কনসেপ্ট ঠিক মতো আয়ত্ত না করতে পারার কারণে বিচিত্র কিছু সমস্যার সম্মুখীন হন এবং শেষ
                            পর্যন্ত বুঝতে না
                            পেরে হতাশ হয়ে পড়েন। তাদের জন্যই এই ভিডিওটি। এই ভিডিওতে আমি এমন ১০টি সমস্যার কথা তুলে ধরেছি
                            যেগুলো
                            বিগিনার হিসেবে আপনারা অহরহ সম্মুখীন হবেন। আশা করি ভিডিওটি দেখলে আপনাদের এই সমস্যাগুলো নিয়ে
                            আর কনফিউশন
                            থাকবেনা।
                        </p>


                    </div>
                </div>
                <div
                    className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">

                {data?.map((video)=>(

                    <div className="w-full flex flex-row gap-2 cursor-pointer hover:bg-slate-900 p-2 py-3">
                        {/* <!-- Thumbnail --> */}
                        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                        </svg>
                        {/* <!-- repo_link --> */}



                        <div clas="flex flex-col w-full">
                            <a href="#">
                                <p className="text-slate-50 text-sm font-medium">{video.title}</p>
                            </a>
                            <div>
                                <span className="text-gray-400 text-xs mt-1">{video.duration}</span>
                                <span className="text-gray-400 text-xs mt-1"> | </span>
                                <span className="text-gray-400 text-xs mt-1">{video.views} views</span>
                            </div>
                        </div>
                    </div>


                ))}
            </div>
                </div>
        </div>


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
                </div>
                <button type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                    Submit
                </button>
                <div>

                </div>
            </form>
        </Modal>
    </section>
    </>
  )
}
