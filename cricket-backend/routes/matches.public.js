import { Router } from "express";
import Match from "../models/Match.js";
const router = Router();

// GET /api/matches?status=scheduled|live|completed
router.get("/matches", async (req, res) => {
  const { status } = req.query;
  const filter = status ? { status } : {};
  const matches = await Match.find(filter).sort({ time: 1 }).lean();
  res.json({ matches });
});

export default router;
