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
const port = process.env.PORT || 3000;
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create __dirname equivalent in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// serve uploads folder statically at /uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Allow vite to make requests
const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";
app.use(
  cors({
    origin: clientOrigin,
    credentials: true, // allow cookies if using them
  })
);

app.get("/", (req, res) => {
  res.send("home page");
});
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);


// ---- Production: serve built React app ----
if (process.env.NODE_ENV === 'production') {
  // assume client build is at ../client/dist
  const clientDist = path.join(__dirname, '..', 'client', 'dist');
  app.use(express.static(clientDist));
  // catch-all, return index.html for client-side routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
