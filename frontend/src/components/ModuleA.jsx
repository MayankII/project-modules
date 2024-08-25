import React, { useRef, useEffect, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import axios from "axios";

const ModuleA = ({ video }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [moduleProgress, setModuleProgress] = useState(0);

  //fetching user progress for current video
  const fetchUserProgress = async () => {
    try {
      const res = await axios.get(`https://project-modules-backend.onrender.com/api/user-progress`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      const data = await res.data;
      if (!data.error) {
        const progress = data.find((i) => i.videoId._id === video._id);
        if (progress) {
          playerRef.current.currentTime(progress.timestamp);

          setModuleProgress(
            Math.floor(
              (progress.timestamp / playerRef.current.duration()) * 100
            )
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  // updating user progress
  const updateProgress = async () => {
    try {
      const currentTime = playerRef.current.currentTime();
      const duration = playerRef.current.duration();
      const completed = currentTime >= duration;
      const progressPercentage = (currentTime / duration) * 100;
      setModuleProgress(Math.floor(progressPercentage));
      await axios.post(
        `https://project-modules-backend.onrender.com/api/user-progress/update`,
        {
          videoId: video._id,
          timestamp: currentTime,
          completed: completed,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    playerRef.current = videojs(videoRef.current, {
      controls: true,
      autoplay: false,
      preload: "auto",
      sources: [
        {
          src: video.filePath,
          type: "video/mp4",
        },
      ],
    });

    playerRef.current.controlBar.progressControl.hide();

    playerRef.current.ready(() => {
      fetchUserProgress();
    });

    playerRef.current.on("timeupdate", updateProgress);
  }, [video]);

  return (
    <>
      <div className="flex gap-4 module-container">
        <div className="flex flex-col gap-1 module-data">
          <h1 className="text-lg font-bold">Module 1 : Masks</h1>
          <p className=" text-xs">
            <span className="font-semibold">Importance of masks :</span>Wearing
            a mask reduces the spread of respiratory illnesses within the
            community by reducing the number of infectious particles that may be
            inhaled or exhaled.
          </p>
          <h5 className="font-semibold">Types of Masks : </h5>
          <ul className="text-xs font-semibold">
            <li>Face Masks.</li>
            <li>Barrier Face Coverings.</li>
            <li>Surgical Masks.</li>
            <li>N95 Respirators.</li>
            <li>Comparing Surgical Masks and Surgical N95 Respirators.</li>
            <li>General N95 Respirator Precautions.</li>
            <li>N95 Respirators in Industrial and Health Care Settings.</li>
          </ul>
          <h5 className="font-semibold">Proper use of Masks</h5>
          <p className=" text-xs">
            Wash your hands before and after touching the mask. Touch only the
            bands or ties when putting on and taking off your mask. Make sure
            the mask fits to cover your nose, mouth and chin. If you adjust the
            mask to cover those areas, wash your hands before and after.
          </p>
        </div>
        <div className="flex flex-col ">
          <div className="flex justify-evenly items-center mb-3">
            <span className=" font-semibold text-primary ">
              Progress per module {moduleProgress}%
            </span>
            <progress
              className="progress progress-info w-1/3"
              value={moduleProgress}
              max="100"
            ></progress>
          </div>

          <div data-vjs-player>
            <video
              ref={videoRef}
              className="video-js vjs-default-skin video-class"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ModuleA;
