import UserProgress from "../models/UserProgressModel.js";
export const getUserProgress = async (req, res) => {
  try {
    const { userId } = req.body;
    const userProgress = await UserProgress.find({ userId }).populate(
      "videoId"
    );
    res.status(200).json(userProgress);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server Error" });
  }
};

export const updateUserProgress = async (req, res) => {
  const { userId, videoId, timestamp, completed } = req.body;
  try {
    let progress = await UserProgress.findOne({ userId, videoId });
    if (!progress) {
      progress = new UserProgress({ userId, videoId, timestamp, completed });
    } else {
      progress.timestamp = timestamp;
      progress.completed = completed;
    }
    await progress.save();
    res.status(200).json({ message: "Progress updated" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server Error" });
  }
};
