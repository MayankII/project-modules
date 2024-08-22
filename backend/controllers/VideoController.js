import Video from "../models/VideoModel.js";

export const createVideo = async (req, res) => {
  const { title, filePath, order, duration } = req.body;

  try {
    const video = new Video({
      title,
      filePath,
      order,
      duration,
    });
    await video.save();
    res.status(201).json(video);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server error" });
  }
};
export const getVideosInOrder = async (req, res) => {
  try {
    const videos = await Video.find().sort({ order: 1 });
    res.status(200).json(videos);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server Error" });
  }
};
