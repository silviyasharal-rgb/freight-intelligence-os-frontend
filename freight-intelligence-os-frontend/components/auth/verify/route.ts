import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import app from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json(
        { success: false, message: "ID token is required" },
        { status: 400 }
      );
    }

    const decodedToken = await getAuth(app).verifyIdToken(idToken);

    return NextResponse.json({
      success: true,
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name || "",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }
}