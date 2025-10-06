import { NextResponse } from "next/server";
import Users from "@/app/models/Users";
import connectDB from "@/app/utils/database";

export async function POST(req) {
  try {
    await connectDB();
    const { email, challengeId, submittedFlag } = await req.json();

    if (!email || !challengeId || !submittedFlag) {
      return NextResponse.json({ success: false, message: "Missing fields" });
    }

    // Dummy challenges (future: MongoDB Challenge model)
    const challenges = {
      1: { id: 1, flag: "EEGAA{I_AM_B@S364_3NCRYPTI0N}", points: 50 },
      2: { id: 2, flag: "EEGAA{w0w_url_3nc0ding_d3crypt}", points: 70 },
      3: { id: 3, flag: "EEGAA{_IAM_TR1CKY_you_CANT_GE7}", points: 100 },
      4: { id: 4, flag: "EEGAA{HEY_TH3_S3CRAT3_K3Y_1717} ", points: 50 },
      5: { id: 5, flag: "EEGAA{h3r3_1s_s0m37ing_intr35ting}", points: 100 },
    };

    const challenge = challenges[challengeId];
    if (!challenge) {
      return NextResponse.json({ success: false, message: "Challenge not found" });
    }

    // User find
    const user = await Users.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    // Already solved?
    const alreadySolved = user.solvedChallenges?.some(
      (c) => c.id === challengeId.toString()
    );
    if (alreadySolved) {
      return NextResponse.json({ success: false, message: "Already solved" });
    }

    // Flag check
    if (submittedFlag === challenge.flag) {
      // Save solved challenge
      user.solvedChallenges.push({
        id: challengeId.toString(),
        points: challenge.points,
        solvedAt: new Date(),
      });

      // ✅ Update totalPoints
      user.totalPoints = (user.totalPoints || 0) + challenge.points;

      await user.save();

      return NextResponse.json({
        success: true,
        message: `Correct! You earned ${challenge.points} points.`,
        totalPoints: user.totalPoints,
      });
    } else {
      return NextResponse.json({ success: false, message: "Wrong flag!" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server error" });
  }
}
