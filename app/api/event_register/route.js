import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import Registration from "@/app/models/event_register";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const newReg = new Registration(body);
    await newReg.save();

    return NextResponse.json({ success: true, message: "Registration successful!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Error in registration" }, { status: 500 });
  }
}
