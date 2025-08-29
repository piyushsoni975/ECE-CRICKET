import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import requireAuth from "../middleware/requireAuth.js";

const router = Router();

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: "MISSING_FIELDS" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: "USER_EXISTS" });

    const passwordHash = await bcrypt.hash(password, 10);
    const role = email === process.env.ADMIN_EMAIL ? "admin" : "user"; // 👈 NEW
    const user = await User.create({ name: name || email.split("@")[0], email, passwordHash, role });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },  // 👈 include role (optional but handy)
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } }); // 👈 role out
  } catch (e) {
    res.status(500).json({ error: "SERVER_ERROR" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: "MISSING_FIELDS" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "USER_NOT_FOUND" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "INVALID_CREDENTIALS" });

    // Optional: auto-promote if email matches ADMIN_EMAIL (handy in dev)
    if (email === process.env.ADMIN_EMAIL && user.role !== "admin") {
      user.role = "admin";
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role }, // 👈 include role
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } }); // 👈 role out
  } catch (e) {
    res.status(500).json({ error: "SERVER_ERROR" });
  }
});

// GET /api/auth/me
router.get("/me", requireAuth, async (req, res) => {
  const user = await User.findById(req.user.id).select("_id name email role"); // 👈 include role
  res.json({ user });
});

export default router;
