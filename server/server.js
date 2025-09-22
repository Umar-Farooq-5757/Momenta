// server.js
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

// Create __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Build an array of allowed origins from env var (comma separated) or fallback to localhost
const rawOrigins = process.env.CLIENT_ORIGIN || "http://localhost:5173";
const allowedOrigins = rawOrigins.split(",").map(s => s.trim()).filter(Boolean);

// CORS options with dynamic origin check
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin like mobile apps or curl
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("CORS: origin not allowed by server"), false);
    }
  },
  credentials: true, // if you use cookies / credentials
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"]
};

// apply to all routes and preflight requests
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.get("/", (req, res) => res.send("home page"));
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

// serve client in production only if you're intentionally serving frontend from same project
if (process.env.NODE_ENV === "production") {
  const clientDist = path.join(__dirname, "..", "client", "dist");
  app.use(express.static(clientDist));
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

// Connect DB at cold-start
await connectDB();

// Only listen when running locally (not on Vercel)
if (!process.env.VERCEL) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`server started on port ${port}`));
}

export default app;
