// middleware/requireAdmin.js
export default function requireAdmin(req, res, next) {
  if (!req.user) return res.status(401).json({ error: "UNAUTHENTICATED" });
  if (req.user.role !== "admin") return res.status(403).json({ error: "FORBIDDEN" });
  next();
}
