import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(400).json({ error: "Unauthorized Access" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server Error" });
  }
};
export default auth;
