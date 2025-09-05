import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User, { IUser } from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // Validate documentType
    if (body.documentType !== "digilocker") {
      return NextResponse.json({ error: "Invalid documentType" }, { status: 400 });
    }

    const user: IUser = await User.create({
      ...body,
      documentType: "digilocker",
      idNumber: body.idNumber || "N/A",
    });

    return NextResponse.json(user, { status: 201 });
  } catch (err: any) {
    console.error("❌ Error in POST /api/digilocker:", err.message);
    return NextResponse.json({ error: "Failed to save digilocker data" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const digilockers: IUser[] = await User.find({ documentType: "digilocker" });
    return NextResponse.json(digilockers);
  } catch (err: any) {
    console.error("❌ Error in GET /api/digilocker:", err.message);
    return NextResponse.json({ error: "Failed to fetch digilocker data" }, { status: 500 });
  }
}
