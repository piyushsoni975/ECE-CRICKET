import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  teamA: { type: String, required: true },
  teamB: { type: String, required: true },

  // simple score state
  runsA:   { type: Number, default: 0 },
  wicketsA:{ type: Number, default: 0 },
  runsB:   { type: Number, default: 0 },
  wicketsB:{ type: Number, default: 0 },

  innings:  { type: Number, enum: [1,2], default: 1 }, // 1 => Team A batting, 2 => Team B batting
  finished: { type: Boolean, default: false },
  winner:   { type: String, default: "" }, // team name
  result:   { type: String, default: "" }, // human text like "Team B won by 5 wickets"
}, { timestamps: true });

export default mongoose.model("Match", matchSchema);
