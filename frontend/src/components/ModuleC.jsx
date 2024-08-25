import React, { useRef, useEffect, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import axios from "axios";

const ModuleC = ({ video }) => {
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
          <h1 className="text-lg font-bold">Module 3 : Stethoscope</h1>
          <p className=" text-xs">
            <span className="font-semibold">Importance of Stethoscope :</span>
            Wearing A stethoscope is a medical instrument that helps healthcare
            professionals listen to sounds made inside the body, such as the
            heart, lungs, and bowels
          </p>
          <h5 className="font-semibold">Types of Stethoscope : </h5>
          <ul className="text-xs font-semibold">
            <li>Acoustic Stethoscope.</li>
            <li>Electronic Stethoscope.</li>
            <li>Fetal Stethoscope.</li>
            <li>The Doppler Stethoscope.</li>
            <li>Pediatric Stethoscope.</li>
            <li>Cardiology Stethoscope.</li>
            <li>Teaching Stethoscope.</li>
          </ul>
          <h5 className="font-semibold">Proper use of Stethoscope</h5>
          <p className=" text-xs">
            Use the diaphragm of your stethoscope to listen to your patient's
            lungs. As you listen to the patient's lungs, move the stethoscope to
            the upper and lower lobes. Move from the back to the front of the
            patient's chest.
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

export default ModuleC;
