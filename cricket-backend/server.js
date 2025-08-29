import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import matchRoutes from "./routes/matches.js";

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
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
