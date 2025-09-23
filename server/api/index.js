import serverless from "serverless-http";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

import connectDB from "../config/db.js";
import userRouter from "../routes/user.routes.js";
import postRouter from "../routes/post.routes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// __dirname (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve (ephemeral) uploads if you still want to during runtime
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// CORS
const allowedOrigins = [
  process.env.CLIENT_URL, // e.g. https://momenta.vercel.app
  "http://localhost:5173", // Vite dev server
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (like server-to-server or some mobile clients)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("CORS policy: This origin is not allowed."));
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Preflight

// Routes
app.get("/", (req, res) => res.send("home page"));
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

if (process.env.NODE_ENV === "production") {
  const clientDist = path.join(__dirname, "..", "client", "dist");
  app.use(express.static(clientDist));
  app.get("*", (req, res) => res.sendFile(path.join(clientDist, "index.html")));
}

// Connect to DB 
let dbConnected = false;
async function ensureDb() {
  if (dbConnected) return;
  await connectDB(); 
  dbConnected = true;
}
await ensureDb();

// Export serverless handler
export default serverless(app);