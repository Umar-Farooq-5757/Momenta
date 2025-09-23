// File: momenta/server/api/index.js
import serverless from "serverless-http";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

import connectDB from "../config/db.js"; // keep your existing connect logic
import userRouter from "../routes/user.routes.js";
import postRouter from "../routes/post.routes.js";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// optional: serve ephemeral uploads while instance is hot
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// CORS: allow explicit origins (prevent wildcard echo problems)
const allowedOrigins = [
  process.env.CLIENT_URL, // set this in Vercel (e.g. https://momenta.vercel.app)
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS policy: origin not allowed"));
    },
    credentials: true,
  })
);

// routes
app.get("/", (req, res) => res.send("home page"));
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

// Basic error handler so uncaught route errors are logged
app.use((err, req, res, next) => {
  console.error("Unhandled error in express:", err);
  res.status(500).json({ success: false, message: "Server error" });
});

// cache DB connection to avoid reconnect on every invocation
let dbConnected = false;
async function ensureDb() {
  if (dbConnected) return;
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing from environment variables");
  }
  await connectDB();
  dbConnected = true;
}

// create serverless handler
const handler = serverless(app);

// export a wrapper that ensures DB and catches startup errors
export default async function (req, res) {
  try {
    await ensureDb();
  } catch (err) {
    console.error("DB connection failed:", err);
    // return 500 and also log full error to Vercel logs
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        success: false,
        message: "Database connection failed",
        error: err.message,
      })
    );
    return;
  }

  try {
    // pass control to serverless handler
    return handler(req, res);
  } catch (err) {
    // final fallback; should be rare
    console.error("Serverless handler failed:", err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}
