// models/Challenge.js
import mongoose from "mongoose";

const challengeSchema = new mongoose.Schema({
  title: String,
  description: String,
  points: Number,
  flag: String, // ✅ store correct flag
});

const Challenge =
  mongoose.models.Challenge || mongoose.model("Challenge", challengeSchema);

export default Challenge;
