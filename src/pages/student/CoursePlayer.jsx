import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Nav from '../../components/Nav';
import Player from '../../components/student/courseplayer/Player';
import Videos from '../../components/student/courseplayer/Videos';
import { useGetVideosQuery } from "../../features/videos/videosApi";
// import {useVideoAddMutation} from "../../features/videos/videosApi";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        height:'50%',
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

    const {data,isLoading, isError, error} = useGetVideosQuery(1);
    // console.log(data[0]);
    const [repo_link,setRepo_link] = useState("");
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [playingId,setPlayingId] = useState(1);
   const openModal=(data)=> {
        setIsOpen(true);
    }
    function afterOpenModal() {
    }

    function closeModal() {
        setIsOpen(false);

    }
    
    let player="";
    const [playing,setPlaying] = useState();
    // const  dispatch = useDispatch();
    useEffect(() => {
      
       
        
        

    },[isLoading,data,player,isError,Player]);
    if(isLoading){
        player = <div>loading.....</div>;
      }
      else if(data.length>0 &&!isError&&!isLoading){
          console.log(data[0]);
        //   setPlaying(data[0]);
          console.log("playing:");
          console.log(playing);
          player = <Player playing = {data[0]}/>
  
      }
    
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
                {/* {player} */}
                <Player playingId = {playingId}/>
                <Videos setPlayingId = {setPlayingId} playingId={playingId} />
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
