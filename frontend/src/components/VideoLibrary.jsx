import React, { useEffect, useState } from "react";
import ModuleA from "./ModuleA.jsx";
import { Routes, Route, Outlet } from "react-router-dom";
import ModuleB from "./ModuleB.jsx";
import ModuleC from "./ModuleC.jsx";
import toast from "react-hot-toast";
const VideoLibrary = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);

  //Sequential navigation to next video
  const handleNextVideo = () => {
    const currentIndex = videos.findIndex((v) => v._id === currentVideo._id);
    if (currentIndex < videos.length - 1) {
      setCurrentVideo(videos[currentIndex + 1]);
    }
  };

  //sequential navigation to previous video
  const handlePreviousVideo = () => {
    const currentIndex = videos.findIndex((v) => v._id === currentVideo._id);
    if (currentIndex > 0) {
      setCurrentVideo(videos[currentIndex - 1]);
    }
  };
  //handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
    toast.success("Logged out successfully");
  };
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(`/api/video/videos`, {
          method: "GET",
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        const data = await res.json();
        if (!data.error) {
          setVideos(data);
          setCurrentVideo(data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div>
      <div className=" mb-2 flex justify-between items-center">
        <div>
          <h1 className=" text-2xl text-primary font-bold">PPE MODULES</h1>
          {currentVideo && (
            <p className="text-secondary font-semibold">{currentVideo.title}</p>
          )}
        </div>
        <svg
          onClick={handleLogout}
          className=" cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368"
        >
          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
        </svg>
      </div>
      <Routes>
        {currentVideo &&
          videos.findIndex((v) => v._id === currentVideo._id) === 0 && (
            <Route path="/" element={<ModuleA video={currentVideo} />} />
          )}
        {currentVideo &&
          videos.findIndex((v) => v._id === currentVideo._id) === 1 && (
            <Route path="/" element={<ModuleB video={currentVideo} />} />
          )}
        {currentVideo &&
          videos.findIndex((v) => v._id === currentVideo._id) === 2 && (
            <Route path="/" element={<ModuleC video={currentVideo} />} />
          )}
      </Routes>
      {currentVideo && <Outlet />}
      <div className="flex justify-evenly mt-4">
        <button
          className="btn btn-secondary w-1/3"
          onClick={handlePreviousVideo}
          disabled={videos.findIndex((v) => v._id === currentVideo?._id) === 0}
        >
          Previous
        </button>
        <button
          className="btn btn-primary w-1/3"
          onClick={handleNextVideo}
          disabled={
            videos.findIndex((v) => v._id === currentVideo?._id) ===
            videos.length - 1
          }
        >
          Next
        </button>
      </div>
      <div className="flex flex-col gap-4 items-center mt-4">
        <p className=" text-lg text-slate-600 font-bold">
          Module {videos.findIndex((v) => v._id === currentVideo._id) + 1} /{" "}
          {videos.length}
        </p>
        <progress
          className="progress progress-secondary w-full"
          value={Math.floor(
            ((videos.findIndex((v) => v._id === currentVideo?._id) + 1) /
              videos.length) *
              100
          )}
          max="100"
        ></progress>
      </div>
    </div>
  );
};

export default VideoLibrary;
