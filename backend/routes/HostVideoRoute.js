import express from "express";
import HostVideo from "../controllers/HostVideoController.js";

const router = express.Router();
router.get("/:filename", HostVideo);
export default router;
