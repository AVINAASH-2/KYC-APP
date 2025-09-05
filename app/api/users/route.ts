import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User, { IUser } from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    // Optional: validate documentType manually
    const allowedTypes = ["aadhaar", "pan", "dl", "voterid"];
    if (!allowedTypes.includes(body.documentType)) {
      return NextResponse.json(
        { error: "Invalid documentType" },
        { status: 400 }
      );
    }

    const user: IUser = await User.create(body);

    return NextResponse.json(user, { status: 201 });
  } catch (err: any) {
    console.error("❌ Error in POST /api/users:", err.message);
    return NextResponse.json({ error: "Failed to save user" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const users: IUser[] = await User.find({});
    return NextResponse.json(users);
  } catch (err: any) {
    console.error("❌ Error in GET /api/users:", err.message);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
