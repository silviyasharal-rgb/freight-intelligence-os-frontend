import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";

// GET - அனைத்து customers
export async function GET() {
  try {
    console.log("POST /api/customers called")
    const snapshot = await getDocs(collection(db, "customers"));

    const customers = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(customers);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}

// POST - புதிய customer
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body)
    const docRef = await addDoc(collection(db, "customers"), {
      name: body.name,
      company: body.company,
      phone: body.phone,
    });

    return NextResponse.json({
      id: docRef.id,
      message: "Customer Added",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add customer" },
      { status: 500 }
    );
  }
}