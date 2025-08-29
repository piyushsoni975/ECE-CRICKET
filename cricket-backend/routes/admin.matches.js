import { Router } from "express";
import requireAuth from "../middleware/requireAuth.js";
import requireAdmin from "../middleware/requireAdmin.js";
import Match from "../models/Match.js";

const router = Router();
router.use(requireAuth, requireAdmin);

// POST /api/admin/matches  -> draft match
router.post("/matches", async (req, res) => {
  const { teamAName, teamBName, overs } = req.body || {};
  if (!teamAName || !teamBName || !overs) return res.status(400).json({ error: "MISSING_FIELDS" });
  const match = await Match.create({
    teamA: { name: teamAName, players: [] },
    teamB: { name: teamBName, players: [] },
    overs,
    status: "draft",
    createdBy: req.user.id,
  });
  res.json({ match });
});

// POST /api/admin/matches/:id/players -> add player to A or B
router.post("/matches/:id/players", async (req, res) => {
  const { team, name } = req.body || {};
  if (!["A", "B"].includes(team) || !name) return res.status(400).json({ error: "BAD_INPUT" });

  const match = await Match.findById(req.params.id);
  if (!match) return res.status(404).json({ error: "NOT_FOUND" });
  if (match.status !== "draft") return res.status(400).json({ error: "NOT_DRAFT" });

  const bucket = team === "A" ? match.teamA.players : match.teamB.players;
  if (bucket.length >= 11) return res.status(400).json({ error: "TEAM_FULL" });

  bucket.push({ name: name.trim() });
  await match.save();
  res.json({ match });
});

// DELETE /api/admin/matches/:id/players -> remove player by index
router.delete("/matches/:id/players", async (req, res) => {
  const { team, index } = req.body || {};
  if (!["A", "B"].includes(team) || typeof index !== "number") return res.status(400).json({ error: "BAD_INPUT" });

  const match = await Match.findById(req.params.id);
  if (!match) return res.status(404).json({ error: "NOT_FOUND" });
  if (match.status !== "draft") return res.status(400).json({ error: "NOT_DRAFT" });

  const bucket = team === "A" ? match.teamA.players : match.teamB.players;
  if (index < 0 || index >= bucket.length) return res.status(400).json({ error: "BAD_INDEX" });

  bucket.splice(index, 1);
  await match.save();
  res.json({ match });
});

// POST /api/admin/matches/:id/finalize -> require 11-11 players
router.post("/matches/:id/finalize", async (req, res) => {
  const { time, venue } = req.body || {};
  const match = await Match.findById(req.params.id);
  if (!match) return res.status(404).json({ error: "NOT_FOUND" });
  if (match.status !== "draft") return res.status(400).json({ error: "NOT_DRAFT" });

  if (match.teamA.players.length !== 11 || match.teamB.players.length !== 11)
    return res.status(400).json({ error: "NEED_11_EACH" });

  match.time = time ? new Date(time) : null;
  match.venue = venue || "";
  match.status = "scheduled"; // upcoming
  await match.save();
  res.json({ match });
});

export default router;
