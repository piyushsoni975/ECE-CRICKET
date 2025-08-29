import app, { connectDB } from "../app.js";

let ready = false;

export default async function handler(req, res) {
  if (!ready) {
    await connectDB();
    ready = true;
  }
  // Express app is a (req,res) handler
  return app(req, res);
}
