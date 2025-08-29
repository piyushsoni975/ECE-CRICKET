import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import matchRoutes from "./routes/matches.js";

dotenv.config();

const app = express();
app.set("trust proxy", 1);

// ---------- CORS ----------
const FRONTEND_URL = (process.env.FRONTEND_URL || "").replace(/\/$/, ""); // trim trailing /
const isProd = process.env.NODE_ENV === "production";

const corsOptions = {
  origin(origin, cb) {
    // allow server-to-server/no-origin requests
    if (!origin) return cb(null, true);

    if (!isProd) {
      // DEV: allow localhost origins. If you want to allow all in dev, just: return cb(null, true);
      return /^http:\/\/(localhost|127\.0\.0\.1):\d{4,5}$/.test(origin)
        ? cb(null, true)
        : cb(new Error("CORS_BLOCKED"), false);
    }

    // PROD: allow configured FE and vercel preview domains
    const ok = (FRONTEND_URL && origin === FRONTEND_URL) || /\.vercel\.app$/.test(origin);
    return ok ? cb(null, true) : cb(new Error("CORS_BLOCKED"), false);
  },
  credentials: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
  maxAge: 86400,
};

app.use(cors(corsOptions));
// IMPORTANT (Express v5): handle preflight for ALL paths using RegExp (no "*")
app.options(/.*/, cors(corsOptions));

// ---------- Parsers ----------
app.use(express.json({ limit: "1mb" }));

// ---------- Health ----------
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// ---------- Routes ----------
app.get("/", (_req, res) => res.send("API OK"));
app.use("/api/auth", authRoutes);
app.use("/api/matches", matchRoutes);

// ---------- 404 ----------
app.use((_req, res) => res.status(404).json({ error: "NOT_FOUND" }));

// ---------- Error handler ----------
app.use((err, req, res, _next) => {
  if (err?.message === "CORS_BLOCKED") {
    return res.status(403).json({ error: "CORS_BLOCKED", origin: req.headers.origin || null });
  }
  console.error(err);
  res.status(500).json({ error: "SERVER_ERROR" });
});

// --- DB connect usable for local + serverless ---
let connPromise = null;
export async function connectDB() {
  if (connPromise) return connPromise;
  const MONGO = process.env.MONGO_URI;
  if (!MONGO) throw new Error("MONGO_URI missing");
  connPromise = mongoose.connect(MONGO);
  return connPromise;
}

export default app;
