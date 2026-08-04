import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "vehicles"));

    const vehicles = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(vehicles);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const docRef = await addDoc(collection(db, "vehicles"), {
      regNo: body.regNo,
      driver: body.driver,
      status: body.status,
    });

    return NextResponse.json({
      id: docRef.id,
      message: "Vehicle Added Successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add vehicle" },
      { status: 500 }
    );
  }
}