import mongoose from "mongoose";

const solvedSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  points: { type: Number, required: true },
  solvedAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    solvedChallenges: [solvedSchema], // ✅ solved challenges
    totalPoints: { type: Number, default: 0 }, // ✅ total points
  },
  { timestamps: true }
);

const Users = mongoose.models.Users || mongoose.model("Users", userSchema);

export default Users;
