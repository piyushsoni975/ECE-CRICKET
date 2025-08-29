import app, { connectDB } from "./app.js";

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server on http://localhost:${PORT}`);
      console.log("NODE_ENV:", process.env.NODE_ENV, "FRONTEND_URL:", process.env.FRONTEND_URL || "(none)");
    });
  } catch (e) {
    console.error("Failed to start:", e);
    process.exit(1);
  }
};
start();
