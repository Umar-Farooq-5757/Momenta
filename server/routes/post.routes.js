import express from "express";
import protect from "../middlewares/auth.js";
import Post from "../models/Post.model.js";
import path from "path";
import fs from "fs";
import multer from "multer";
import { fileURLToPath } from "url";
const postRouter = express.Router();

// Create __dirname equivalent in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "..", "uploads/posts");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// multer storage and validation
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, name);
  },
});

function fileFilter(req, file, cb) {
  // Accept images only
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("File is not an image"), false);
  }
  cb(null, true);
}

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter,
});

// Route for new post
postRouter.post(
  "/create",
  protect,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ message: "Image required" });
      const imageUrl = `/uploads/posts/${req.file.filename}`; // client will request this URL
      const post = await Post.create({
        caption: req.body.caption || "",
        image: imageUrl,
        author: req.user._id,
      });
      // populate author info if desired
      await post.populate("author", "username profilePic");
      res.status(201).json({ success: true, post });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Create post failed" });
    }
  }
);

// GET ALL POSTS
postRouter.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username profilePic")
      .sort({ createdAt: -1 });
    return res.json({ success: true, posts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Could not fetch posts" });
  }
});

// DELETE POST: only author should be able to do this
postRouter.delete("/delete/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.json({ success: false, message: "Not found" });
    }
    if (!post.author.equals(req.user._id)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // remove file from disk
    const filename = path.basename(post.image);
    const filepath = path.join(uploadDir, filename);
    fs.unlink(filePath, (err) => {
      if (err) console.warn("Failed to remove file:", err);
    });
    await post.remove();
    res.json({ success: true, message: "Deleted post" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Deletion failed" });
  }
});

export default postRouter;
