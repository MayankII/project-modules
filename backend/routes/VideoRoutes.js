import express from "express";
import {
  createVideo,
  getVideosInOrder,
} from "../controllers/VideoController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();
router.post("/create", auth, createVideo);
router.get("/videos", auth, getVideosInOrder);
export default router;
