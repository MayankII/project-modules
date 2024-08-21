import User from "../models/UserModel.js";
import generateToken from "../utils/generateToken.js";
import hashPassword from "../utils/hashPassword.js";
import bcrypt from "bcryptjs";
export const signup = async (req, res) => {
  const { fullname, email, password, confirmPassword, gender } = req.body;
  if (!fullname || !email || !password || !gender) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }
  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must have minimum 8 characters" });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      gender,
    });
    const savedUser = await newUser.save();
    const token = generateToken(savedUser._id);
    res.status(201).json({ message: "Signup successful", token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Please provide both email and password" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    const token = generateToken(user._id);
    res.status(200).json({ message: "Logged in Successfully", token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server Error" });
  }
};
