import { Router } from "express";
import requireAuth from "../middleware/requireAuth.js";
import requireAdmin from "../middleware/requireAdmin.js";
import Match from "../models/Match.js";

const router = Router();

// PUBLIC: list
router.get("/", async (req, res) => {
  const items = await Match.find().sort({ updatedAt: -1 });
  res.json({ items });
});

// PUBLIC: detail
router.get("/:id", async (req, res) => {
  const m = await Match.findById(req.params.id);
  if (!m) return res.status(404).json({ error: "NOT_FOUND" });
  res.json({ item: m });
});

// ADMIN: create (just 2 team names)
router.post("/", requireAuth, requireAdmin, async (req, res) => {
  const { teamA, teamB } = req.body || {};
  if (!teamA || !teamB) return res.status(400).json({ error: "MISSING_TEAMS" });

  const item = await Match.create({ teamA, teamB });
  res.status(201).json({ item });
});

// ADMIN: NEXT INNINGS (when Team A all out)
router.post("/:id/next-innings", requireAuth, requireAdmin, async (req, res) => {
  const m = await Match.findById(req.params.id);
  if (!m) return res.status(404).json({ error: "NOT_FOUND" });
  if (m.finished) return res.status(400).json({ error: "ALREADY_FINISHED" });
  if (m.innings !== 1) return res.status(400).json({ error: "ALREADY_INNINGS_2" });
  m.innings = 2;
  await m.save();
  res.json({ item: m });
});

// ADMIN: update score (minimal)
// body: { addRuns?: number, addWicket?: boolean }
// applies to current batting team (innings)
router.patch("/:id/score", requireAuth, requireAdmin, async (req, res) => {
  const { addRuns = 0, addWicket = false } = req.body || {};
  const m = await Match.findById(req.params.id);
  if (!m) return res.status(404).json({ error: "NOT_FOUND" });
  if (m.finished) return res.status(400).json({ error: "ALREADY_FINISHED" });

  // which side is batting?
  if (m.innings === 1) {
    // update Team A
    m.runsA += Number(addRuns) || 0;
    if (addWicket) m.wicketsA = Math.min(10, m.wicketsA + 1);

    // all out? move to innings 2
    if (m.wicketsA >= 10) {
      m.innings = 2;
    }
  } else {
    // update Team B
    m.runsB += Number(addRuns) || 0;
    if (addWicket) m.wicketsB = Math.min(10, m.wicketsB + 1);

    // win condition: B overtakes A
    if (m.runsB > m.runsA) {
      m.finished = true;
      m.winner = m.teamB;
      const wkLeft = 10 - m.wicketsB;
      m.result = `${m.teamB} won by ${wkLeft} wicket${wkLeft===1?"":"s"}`;
    }

    // if all out and not already won, decide by runs
    if (!m.finished && m.wicketsB >= 10) {
      m.finished = true;
      if (m.runsB > m.runsA) {
        m.winner = m.teamB;
        const wkLeft = 10 - m.wicketsB;
        m.result = `${m.teamB} won by ${wkLeft} wicket${wkLeft===1?"":"s"}`;
      } else if (m.runsB < m.runsA) {
        m.winner = m.teamA;
        const margin = m.runsA - m.runsB;
        m.result = `${m.teamA} won by ${margin} run${margin===1?"":"s"}`;
      } else {
        m.winner = "";
        m.result = "Match tied";
      }
    }
  }

  await m.save();
  res.json({ item: m });
});

// ADMIN: manually finish (optional)
router.post("/:id/finish", requireAuth, requireAdmin, async (req, res) => {
  const { result } = req.body || {};
  const m = await Match.findById(req.params.id);
  if (!m) return res.status(404).json({ error: "NOT_FOUND" });
  m.finished = true;
  m.result = result || m.result || "Match finished";
  if (!m.winner) {
    // if not set, infer quick:
    if (m.runsA > m.runsB) m.winner = m.teamA;
    else if (m.runsB > m.runsA) m.winner = m.teamB;
  }
  await m.save();
  res.json({ item: m });
});

// ADMIN: delete
router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  const ok = await Match.findByIdAndDelete(req.params.id);
  if (!ok) return res.status(404).json({ error: "NOT_FOUND" });
  res.json({ ok: true });
});

export default router;
