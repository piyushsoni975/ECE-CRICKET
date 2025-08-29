import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import matchRoutes from "./routes/matches.js";

dotenv.config();
const app = express();

const ALLOWED = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,        // e.g. https://your-frontend.vercel.app
];

app.use(cors({
  origin(origin, cb) {
    // allow non-browser clients or same-origin
    if (!origin) return cb(null, true);
    const ok = ALLOWED.some((o) => o && origin === o) || /\.vercel\.app$/.test(origin);
    cb(ok ? null : new Error("CORS_BLOCKED"), ok);
  },
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

app.get("/", (req, res) => res.send("API OK"));
app.use("/api/auth", authRoutes);
app.use("/api/matches", matchRoutes);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(process.env.PORT, () =>
      console.log("Server running on http://localhost:" + process.env.PORT)
    );
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};
start();
