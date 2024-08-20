import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const HostVideo = (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const oneDirectoryUp = path.resolve(__dirname, "..");
    const videoPath = path.join(oneDirectoryUp, "videos", req.params.filename);
    // Check if the file exists
    if (!fs.existsSync(videoPath)) {
      return res.status(404).json({ message: "File not found" });
    }
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
    console.log(error.message);
  }
};
export default HostVideo;
