import React, { useRef, useEffect, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import axios from "axios";

const ModuleB = ({ video }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [moduleProgress, setModuleProgress] = useState(0);

  //fetching user progress for current video
  const fetchUserProgress = async () => {
    try {
      const res = await axios.get(`/api/user-progress`, {
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
        `/api/user-progress/update`,
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
          <h1 className="text-lg font-bold">Module 2 : Gloves</h1>
          <p className=" text-xs">
            <span className="font-semibold">Importance of Gloves :</span>
            Personal protective equipment gloves are important because they
            protect hands from hazards such as injury, exposure to chemicals,
            and contamination. Gloves can also help prevent the spread of germs
            in hospitals and other settings.
          </p>
          <h5 className="font-semibold">Types of Gloves : </h5>
          <ul className="text-xs font-semibold">
            <li>Fabric or Cotton Gloves.</li>
            <li>Coated Fabric Gloves.</li>
            <li>Latex and Nitrile Gloves.</li>
            <li>Leather Gloves</li>
            <li>Aluminized Gloves</li>
            <li>Kevlar Gloves</li>
            <li>Puncture-Resistant Gloves</li>
            <li>Impact-Resistant and Vibration-Resistant Gloves</li>
          </ul>
          <h5 className="font-semibold">Proper use of Gloves</h5>
          <p className=" text-xs">
            Personal protective equipment (PPE) gloves are used to protect your
            hands from injuries and exposure to harmful substances. Here are
            some tips for using PPE gloves properly
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

export default ModuleB;
