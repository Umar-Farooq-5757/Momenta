import express from "express";
import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import protect from "../middlewares/auth.js";
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
const uploadDir = path.join(__dirname, "..", "uploads/users");
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

    const imageUrl = `/uploads/users/${req.file.filename}`;
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

// get user
userRouter.get("/getuser/:id",  async (req, res) => {
  try {
	  const id = req.params.id
    const user = await User.findById(id)
	if(!user){
		return res.json({success:false, message:"User not found"})
	}
	
    return res.json({ success: true, user });
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
    return res.json({ success: true, user, token });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// Follow user
userRouter.put("/follow/:id", protect, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    if (!currentUser) {
      return res
        .status(404)
        .json({ success: false, message: "Current user not found" });
    }
    // User to be followed
    const userToFollow = await User.findById(req.params.id);
    if (!userToFollow) {
      return res
        .status(404)
        .json({ success: false, message: "User to follow not found" });
    }
    // Check if already following
    if (
      userToFollow.followers.some(
        (followerId) => followerId.toString() === currentUser._id.toString()
      )
    ) {
      return res.json({
        success: false,
        message: "Already following this user",
      });
    }
    // Add current user to the followers of target user
    userToFollow.followers.push(currentUser._id);

    // Add target user to the following list of current user
    currentUser.following.push(userToFollow._id);

    // Save both users
    await userToFollow.save();
    await currentUser.save();
    res.json({
      success: true,
      message: "User followed",
      followers: userToFollow.followers.length,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
});

export default userRouter;
