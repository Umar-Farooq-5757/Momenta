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

// GET POST WITH USER ID
postRouter.get("/:authorId", async (req, res) => {
  try {
    const { authorId } = req.params;
    if (!authorId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: "Invalid author ID" });
    }
    const posts = await Post.find({ author: authorId }).populate("author", "username profilePic").sort({ createdAt: -1 });
    res.json({ success: true, posts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Could not fetch posts" });
  }
});


// DELETE POST: only author should be able to do this
postRouter.delete("/delete/:id", protect, async (req, res) => {
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
    fs.unlink(filepath, (err) => {
      if (err) console.warn("Failed to remove file:", err);
    });
    await post.deleteOne();
    res.json({ success: true, message: "Deleted post" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Deletion failed" });
  }
});

// like the post
postRouter.post("/like/:id", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.json({ success: false, message: "Post not found" });
    }
    if (post.likes.includes(req.body.currentUserId)) {
      return res
        .status(400)
        .json({ success: false, message: "Post already liked" });
    }
	 // Remove user from dislikes array if present
    post.dislikes = post.dislikes.filter((userId) => !userId.equals(req.body.currentUserId));
    // Add user to likes array
    post.likes.push(req.body.currentUserId);
    await post.save();
    res.json({
      success: true,
      message: "Post liked",
      likesCount: post.likes.length,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "could not like the post" });
  }
});

// dislike the post
postRouter.post("/dislike/:id", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.json({ success: false, message: "Post not found" });
    }
    if (post.dislikes.some((userId) => userId.equals(req.body.currentUserId))) {
      return res
        .status(400)
        .json({ success: false, message: "Post already disliked" });
    }
    // Remove user from likes array if present
    post.likes = post.likes.filter((userId) => !userId.equals(req.body.currentUserId));
    // Add user to dislikes array
    post.dislikes.push(req.body.currentUserId);
    await post.save();
    res.json({
      success: true,
      message: "Post disliked",
      dislikesCount: post.dislikes.length,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "could not dislike the post" });
  }
});

// Add a comment to post
postRouter.post("/comment/:id", protect, async (req, res) => {
  try {
    const {text} = req.body;
    if (!text || text.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Comment text cannot be empty" });
    }
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    const comment = {
      user: req.user._id,
      text: text.trim(),
      createdAt: new Date(),
    };
    post.comments.push(comment);
    await post.populate("comments.user", "username profilePic");
    await post.save();
    res.status(201).json({
      success: true,
      message: "Comment added",
      comments: post.comments,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "could not add the comment" });
  }
});

export default postRouter;
