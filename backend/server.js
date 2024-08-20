import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectdb.js";
import UserRouter from "./routes/UserRoutes.js";
import UserProgressRouter from "./routes/UserProgressRoutes.js";
import VideoRouter from "./routes/VideoRoutes.js";
import HostVideoRouter from "./routes/HostVideoRoute.js";
dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();

//middlewares
app.use(express.json());
app.use("/api/user", UserRouter);
app.use("/api/user-progress", UserProgressRouter);
app.use("/api/video", VideoRouter);
app.use("/api/host-videos", HostVideoRouter);
app.listen(PORT, () => {
  connectDB();
  console.log(`server is connected on port ${PORT}`);
});
