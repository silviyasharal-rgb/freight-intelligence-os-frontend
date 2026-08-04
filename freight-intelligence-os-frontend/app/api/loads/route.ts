import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";

// GET - அனைத்து loads-ஐ fetch செய்ய
export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "loads"));

    const loads = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(loads);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch loads" },
      { status: 500 }
    );
  }
}

// POST - புதிய load add செய்ய
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const docRef = await addDoc(collection(db, "loads"), {
      from: body.from,
      to: body.to,
      rate: body.rate,
      status: body.status,
    });

    return NextResponse.json({
      id: docRef.id,
      message: "Load Added",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add load" },
      { status: 500 }
    );
  }
}