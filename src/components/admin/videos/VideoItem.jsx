import React from "react";
import { useDeleteVideoMutation, useVideoEditMutation } from "../../../features/videos/videosApi";

import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    height: "85%",
    width: "50%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgb(8 14 27 /1)",
    size: "50%",
    borderRadius: "10px",
  },
};

function VideoItem(video) {
    const [deleteVideo, { loading, error, data }] =
    useDeleteVideoMutation();
    const [videoEdit] = useVideoEditMutation();
  const { title, description, id, duration, views,url,createdAt } = video.video;
  const shortenedText = description?.substring(0, 40) + ".......";

  const [title1, setTitle1] = useState(title);
  const [description1, setDescription1] = useState(description);
  const [url1, setUrl1] = useState(url);
  const [views1, setViews1] = useState(views);
  const [duration1, setDuration1] = useState(duration);
  const [createdAt1, setCreatedAt1] = useState(createdAt);
  const [modalIsOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    deleteVideo(id);
    alert("Delete Successfully");
    window.location.href = "/admin/videos";
  };

//   let subtitle;
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    videoEdit({ id, title:title1, description:description1, url:url1, views:views1, duration:duration1, createdAt:createdAt1 });
    setTitle1("");
    setDescription1("");
    setUrl1("");
    setViews1("");
    setDuration1("");
    closeModal();
    alert("Video Updated Successfully!!!");
    window.location.href = "/admin/videos";
  };
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal">
        <h2 className="text-center text-2xl font-extrabold ">Add New Video</h2>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit} method="POST">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="">
                Name
              </label>
              <br />
              <input
                id="title"
                name="title"
                type="text"
                autoComplete="title"
                required
                className="login-input rounded-t-md"
                placeholder="Enter Video Title"
                value={title1}
                onChange={(e) => setTitle1(e.target.value)}
              />
            </div>
            <br />
            <div>
              <label htmlFor="description1" className="">
                Description
              </label>

              <input
                id="description1"
                name="description1"
                type="text"
                autoComplete="description1"
                required
                className="login-input "
                placeholder="Enter Video Description"
                value={description1}
                onChange={(e) => setDescription1(e.target.value)}
              />
            </div>{" "}
            <br />
            <div>
              <label htmlFor="url">Video URL</label>

              <input
                id="url"
                name="url"
                type="text"
                autoComplete="current-url"
                required
                className="login-input"
                placeholder="Enter Video Url"
                value={url1}
                onChange={(e) => setUrl1(e.target.value)}
              />
            </div>
            <br />
            <div>
              <label htmlFor="views" className="">
                Views
              </label>

              <input
                id="views"
                name="views"
                type="text"
                autoComplete="views"
                required
                className="login-input rounded-b-md"
                placeholder="Enter Views Ex:50.5K or 50M"
                value={views1}
                onChange={(e) => setViews1(e.target.value)}
              />
            </div>
            <br />
            <div>
              <label htmlFor="duration" className="">
                Duration
              </label>
              <input
                id="duration"
                name="duration"
                type="text"
                autoComplete="duration"
                required
                className="login-input rounded-b-md"
                placeholder="Enter Video Duration"
                value={duration1}
                onChange={(e) => setDuration1(e.target.value)}
              />
            </div>{" "}
            <br />
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
            Update Video
          </button>
          <div></div>
        </form>
      </Modal>

      <tr key={video.id}>
        <td className="table-td">{title}</td>
        <td className="table-td">{shortenedText}</td>
        <td className="table-td flex gap-x-2">
            <div  onClick={handleDelete}>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 hover:text-red-500 cursor-pointer transition-all">
            <path
              stroke-linecap="round"
             
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
          </div>
          <div onClick={openModal}>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 hover:text-blue-500 cursor-pointer transition-all">
            <path 
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
          </div>
        </td>
      </tr>
    </>
  );
}

export default VideoItem;
