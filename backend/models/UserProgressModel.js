import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
    required: true,
  },
  timestamp: {
    type: Number,
    default: 0,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const UserProgress = mongoose.model("UserProgress", userProgressSchema);
export default UserProgress;
