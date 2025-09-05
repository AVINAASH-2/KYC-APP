import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User, { IUser } from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // Validate documentType
    if (body.documentType !== "face") {
      return NextResponse.json({ error: "Invalid documentType" }, { status: 400 });
    }

    const user: IUser = await User.create({
      ...body,
      documentType: "face",
      idNumber: body.idNumber || "N/A",
    });

    return NextResponse.json(user, { status: 201 });
  } catch (err: any) {
    console.error("❌ Error in POST /api/face:", err.message);
    return NextResponse.json({ error: "Failed to save face data" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const faces: IUser[] = await User.find({ documentType: "face" });
    return NextResponse.json(faces);
  } catch (err: any) {
    console.error("❌ Error in GET /api/face:", err.message);
    return NextResponse.json({ error: "Failed to fetch face data" }, { status: 500 });
  }
}
