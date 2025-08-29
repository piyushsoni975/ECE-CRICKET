import { Router } from "express";
const router = Router();

let clients = [];        // active SSE connections
let viewers = 0;         // current viewers

function broadcast() {
  const data = `data: ${JSON.stringify({ viewers })}\n\n`;
  clients.forEach((res) => res.write(data));
}

// SSE stream: connect = +1, disconnect = -1
router.get("/stream", (req, res) => {
  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  // CORS (same origin as your client dev)
  res.setHeader("Access-Control-Allow-Origin",process.env.FRONTEND_URL);

  res.flushHeaders?.();
  viewers++;
  clients.push(res);

  // send initial count
  res.write(`data: ${JSON.stringify({ viewers })}\n\n`);
  broadcast();

  req.on("close", () => {
    viewers = Math.max(0, viewers - 1);
    clients = clients.filter((c) => c !== res);
    broadcast();
  });
});

// (optional) plain count endpoint
router.get("/count", (req, res) => res.json({ viewers }));

export default router;
