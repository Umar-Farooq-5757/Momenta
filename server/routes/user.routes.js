import express from "express";
import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";
import protect from "../middlewares/auth.js";
import { fileURLToPath } from "url";
const userRouter = express.Router();

// generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Create __dirname equivalent in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// USING MULTER
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, name);
  },
});

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("File is not an image"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter,
});

// sign in/ user register
userRouter.post("/register", upload.single("profilePic"), async (req, res) => {
  const { username, email, password, age, description, location } = req.body;
  try {
    if (!username || !email || !password || !age || !description || !location) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }
    const exists = await User.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const imageUrl = `/uploads/${req.file.filename}`;
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      profilePic: imageUrl,
      bio: {
        age,
        description,
        location,
      },
    });
    const token = generateToken(user._id);
    return res.json({ success: true, token });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// user login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = generateToken(user._id);
    return res.json({ success: true, token });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

export default userRouter;
