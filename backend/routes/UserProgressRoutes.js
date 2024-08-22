import express from "express";
import auth from "../middlewares/auth.js";
import {
  getUserProgress,
  updateUserProgress,
} from "../controllers/UserProgressController.js";

const router = express.Router();
router.get("/", auth, getUserProgress);
router.post("/update", auth, updateUserProgress);
export default router;
