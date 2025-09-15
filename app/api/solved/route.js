import { NextResponse } from "next/server";
import Users from "@/app/models/Users";
import connectDB from "@/app/utils/database";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) return NextResponse.json({ success: false, message: "Email required" });

    const user = await Users.findOne({ email });
    if (!user) return NextResponse.json({ success: false, message: "User not found" });

    return NextResponse.json({
      success: true,
      solvedChallenges: user.solvedChallenges || [],
      totalPoints: user.totalPoints || 0, // ✅ use totalPoints
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server error" });
  }
}
