import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";

// GET - அனைத்து drivers-ஐ fetch செய்ய
export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "drivers"));

    const drivers = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(drivers);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch drivers" },
      { status: 500 }
    );
  }
}

// POST - புதிய driver add செய்ய
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const docRef = await addDoc(collection(db, "drivers"), {
  name: body.name,
  phone: body.phone,
  licenseNo: body.licenseNo,
  status: body.status,
});

    return NextResponse.json({
      id: docRef.id,
      message: "Driver Added",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add driver" },
      { status: 500 }
    );
  }
}