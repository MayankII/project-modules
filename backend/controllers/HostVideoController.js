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
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (start >= fileSize) {
        res
          .status(416)
          .send(
            "Requested range not satisfiable\n" + start + " >= " + fileSize
          );
        return;
      }

      const chunkSize = end - start + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": "video/mp4",
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    }
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
    console.log(error.message);
  }
};
export default HostVideo;
