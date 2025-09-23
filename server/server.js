import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploads if you expect to store them locally (note: ephemeral on Vercel)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Enable CORS for all origins or specify your frontend origin
app.use(cors({ origin: true }));

// Routes
app.get("/", (req, res) => res.send("home page"));
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

// Serve client in production if bundled with backend on same project
if (process.env.NODE_ENV === "production") {
  const clientDist = path.join(__dirname, "..", "client", "dist");
  app.use(express.static(clientDist));
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

// Connect to MongoDB using environment variable
await connectDB(process.env.MONGO_URI);

// Listen only locally, not on Vercel serverless
if (!process.env.VERCEL) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`server started on port ${port}`));
}

export default app;