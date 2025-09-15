import { NextResponse } from "next/server";
import Users from "@/app/models/Users";
import connectDB from "@/app/utils/database";

export async function GET() {
  try {
    await connectDB();

    // Users ko points ke hisaab se sort karke top 10 lao
    const topUsers = await Users.find({}, "name email totalPoints")
      .sort({ totalPoints: -1 })
      .limit(10);

    return NextResponse.json({
      success: true,
      leaderboard: topUsers,
    });
  } catch (error) {
    console.error("Leaderboard fetch error:", error);
    return NextResponse.json({ success: false, message: "Server error" });
  }
}
